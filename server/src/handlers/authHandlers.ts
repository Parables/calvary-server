import { User, UserType } from "../db/model";
import { user } from "../db/controller";
import { signinPage } from '../views/login'
const bcrypt = require('bcrypt');
const shortid = require('shortid');



export const home = async (request, h) => {
    return '<html><head><title>Login page</title></head><body><h3>Welcome ' +
        request.auth.credentials.name +
        '!</h3><br/><form method="get" action="/logout">' +
        '<input type="submit" value="Logout">' +
        '</form></body></html>';
}

export const signin = async (request, h) => {

    if (request.auth.isAuthenticated) {
        console.log("Already authed")
        return h.redirect('/');
    }

    let message = '';
    let account = null;

    if (request.method === 'post') {
        const payload: User = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;
        console.log("Logging creds", payload, payload.username, payload.password,)
        let { error, value } = UserType.validate(payload);
        console.log("JOI", value, error)
        if (error) message = error.message;
        else {
            account = await user(value.username)
            console.log("Account", account)
            if (!account || !(await bcrypt.compare(value.password, account.password))) {
                message = 'Invalid username or password';
            }
        }
    }

    if (request.method === 'get' ||
        message) {
        return signinPage
    }

    const sid = shortid.generate()
    console.log("SID", sid)
    await request.server.app.cache.set(sid, { account }, 0);
    request.cookieAuth.set({ sid });

    return h.redirect(request.query.next);
};

export const logout = async (request, h) => {
    request.server.app.cache.drop(request.state['calvary'].sid);
    request.cookieAuth.clear();
    return h.redirect('/');
}