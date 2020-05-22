const Hapi = require('@hapi/hapi');
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

    server.route([
        { method: 'GET', path: '/', handler: home },
        { method: ['GET', 'POST'], path: '/signin', handler: signin },
        { method: 'GET', path: '/logout', handler: logout },
        { method: 'GET', path: '/profiles', handler: findProfile },
        { method: ['POST', 'PATCH', 'DELETE',], path: '/profile', handler: mutateProfile },
        { method: ['POST', 'PATCH'], path: '/signup', handler: mutateUser }
    ]);

    await server.start();
    console.log('🌎 Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

connectDB().then(() => init())
