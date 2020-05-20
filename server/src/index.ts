const Hapi = require('@hapi/hapi');
const bcrypt = require('bcrypt');
import { signinPage } from './login'
//var corsHeaders = require('hapi-cors-headers')
import { ProfileType, Profile, User, UserType } from './model';
import connectDB, { allProfiles, createProfile, updateProfile, deleteProfile, profile, search, user, createUser, updateUser } from './controller'

const init = async () => {

    var server = Hapi.server({
        port: process.env.PORT || 3000,
        host: process.env.HOST || '0.0.0.0' || 'localhost',
        routes: {
            "cors": true
        }
    });

    await server.register(require('@hapi/cookie'));

    server.auth.strategy('session', 'cookie', {
        cookie: {
            name: 'calvary',
            password: '!wsYhFA*C2U6nz=Bu^%A@^F#SF3&kSR6',
            isSecure: false,
            ttl: 24 * 60 * 60 * 1000
        },
        redirectTo: '/signin',
        validateFunc: async (request, session) => {
            console.log("Seession", session)
            const account = await user(session.username)
            console.log(account)
            if (!account) {
                return { valid: false };
            }
            return { valid: true, credentials: account };
        }
    });

    server.auth.default('session');



    server.route([
        {
            method: 'GET',
            path: '/',
            handler: (request, h) => {
                return 'Connected to server';
            }
        }, {
            method: 'GET',
            path: '/profile',
            handler: async (request, h) => {
                const results = await profile(JSON.stringify(request.query.id))
                return results;
            }
        }, {
            method: 'GET',
            path: '/search',
            handler: async (request, h) => {
                const results = await search(JSON.stringify(request.query.name))
                return results;
            }
        }, {
            method: 'GET',
            path: '/profiles',
            handler: async (request, h) => {
                const results = await allProfiles()
                return results;
            }
        }, {
            method: ['POST', 'PATCH'],
            path: '/profile',
            handler: async (request, h) => {
                const payload: Profile = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload
                console.log("PAYLOAD", payload, typeof payload)
                const { error, value } = ProfileType.validate(payload);
                console.log("Logging JOI results: ", value, error)
                if (error) return error
                const result = request.method === 'post' ? await createProfile(value) : await updateProfile(value, value.id)
                return result ? result.toObject() : "No data returned: Error 039";
            }
        },
        {
            method: 'DELETE',
            path: '/profile',
            handler: async (request, h) => {
                const payload: Profile = JSON.parse(JSON.stringify(request.payload))
                const { error, value } = ProfileType.validate(payload);
                if (error) return error
                const result = await deleteProfile(value.id)
                return result ? result.toObject() : "No data returned: Error 051";
            }
        }, {
            method: ['POST', 'PATCH'],
            path: '/signup',
            handler: (request, h) => {
                const payload: User = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload
                console.log("PAYLOAD", payload, typeof payload)
                let { error, value } = UserType.validate(payload);
                console.log("Logging JOI results: ", value, error)
                if (error) return error
                bcrypt.hash(value.password, 10).then(async function (hash) {
                    value.password = hash
                    console.log("Hashing", value.password, hash)
                    const result = request.method === 'post' ? await createUser(value) : await updateUser(value, value.id)
                    return result ? result.toObject() : "No data returned: Error 039";
                });

            }
        },

        {
            method: 'GET',
            path: '/signin',
            handler: function (request, h) {
                if (request.auth.isAuthenticated) {
                    const session = request.auth.credentials
                    console.log("Bro, you’re already authenticated : Session", session);
                    return true
                }
                return signinPage
            },
            options: {
                auth: false
            }
        },
        {
            method: 'POST',
            path: '/signin',
            handler: async (request, h) => {
                console.log(JSON.stringify(request.payload))
                const u: User = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;
                console.log("Logging creds", typeof request.payload, u, u.username, u.password,)

                const account = await user(u.username)
                console.log("Account", account)
                if (!account || !(await bcrypt.compare(u.password, account.password))) {
                    console.log("Login failed.... try again")
                    return h.view('/signin');
                }

                request.cookieAuth.set({ username: account.username });
                return true
            },
            options: {
                auth: {
                    mode: 'try'
                }
            }
        }
    ]);

    await server.start();
    console.log('🌎 Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

connectDB().then(() => init())
/* bcrypt.hash("secret", 10).then(function (hash) {
    console.log("secret", hash)
    connectDB().then(() => createUser({ username: "John Doe", password: hash, email: "johndoe@example.com" }).then(res => {
        console.log(res.toObject())
        init()
    }))
}) */