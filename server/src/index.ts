const Hapi = require('@hapi/hapi');
//var corsHeaders = require('hapi-cors-headers')
import connectDB, { } from './db/controller'
import { signin, home, logout } from './handlers/authHandlers'
import { findProfile, mutateProfile } from './handlers/profileHandlers';
import { mutateUser } from './handlers/userHandlers';
const init = async () => {

    var server = Hapi.server({
        port: process.env.PORT || 3000,
        host: process.env.HOST || '0.0.0.0' || 'localhost',
        routes: {
            "cors": true
        }
    });

    await server.register(require('@hapi/cookie'));

    const cache = server.cache({ segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000 });
    server.app.cache = cache;

    server.auth.strategy('session', 'cookie', {
        cookie: {
            name: 'calvary',
            password: '!wsYhFA*C2U6nz=Bu^%A@^F#SF3&kSR6',
            isSecure: false,
            ttl: 24 * 60 * 60 * 1000
        },
        redirectTo: '/signin',
        appendNext: true,
        validateFunc: async (request, session) => {
            const cached = await cache.get(session.sid);
            const out = {
                valid: !!cached,
                credentials: {}
            };
            if (out.valid) {
                out.credentials = cached.account;
            }
            return out;
        }
    });

    server.auth.default('session');

    server.route([
        { method: 'GET', path: '/', config: { handler: home } },
        { method: ['GET', 'POST'], path: '/signin', config: { handler: signin, auth: { mode: 'try' }, plugins: { 'hapi-auth-cookie': { redirectTo: false } } } },
        { method: 'GET', path: '/logout', config: { handler: logout } },
        { method: 'GET', path: '/profiles', config: { handler: findProfile } },
        { method: ['POST', 'PATCH', 'DELETE',], path: '/profile', config: { handler: mutateProfile } },
        { method: ['POST', 'PATCH'], path: '/signup', config: { handler: mutateUser } }
    ]);

    await server.start();
    console.log('🌎 Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

connectDB().then(() => init())
