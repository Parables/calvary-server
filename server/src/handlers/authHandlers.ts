import { User, UserType } from "../db/model";
import { user } from "../db/controller";
const bcrypt = require('bcrypt');



export const home = async (request, h) => {
    return "Connected to Server";
}

export const signin = async (request, h) => {

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
        return false
    }

    console.log(request.query.next)
    return true;
};

export const logout = async (request, h) => {
    return false;
}