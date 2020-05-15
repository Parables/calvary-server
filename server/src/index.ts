const Hapi = require('@hapi/hapi');
//var corsHeaders = require('hapi-cors-headers')
import { ProfileType, Profile } from './model';
import connectDB, { allProfiles, createProfile, updateProfile, deleteProfile, profile, search } from './controller'

const init = async () => {

    var server = Hapi.server({
        port: process.env.PORT || 3000,
        host: process.env.HOST || '0.0.0.0' || 'localhost',
        routes: {
            "cors": true
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Connected to server';
        }
    });

    server.route({
        method: 'GET',
        path: '/profile',
        handler: async (request, h) => {
            const results = await profile(request.query.id)
            return results;
        }
    });

    server.route({
        method: 'GET',
        path: '/search',
        handler: async (request, h) => {
            const results = await search(request.query.name)
            return results;
        }
    });
    server.route({
        method: 'GET',
        path: '/profiles',
        handler: async (request, h) => {
            const results = await allProfiles()
            return results;
        }
    });

    server.route({
        method: ['POST', 'PATCH'],
        path: '/profile',
        handler: async (request, h) => {
            const payload: Profile = JSON.parse(request.payload)
            const { error, value } = ProfileType.validate(payload);
            console.log("Logging JOI results: ", value, error)
            if (error) return error
            const result = request.method === 'post' ? await createProfile(value) : await updateProfile(value, value.id)
            return result ? result.toObject() : "No data returned: Error 039";
        }
    });

    server.route({
        method: 'DELETE',
        path: '/profile',
        handler: async (request, h) => {
            const payload: Profile = JSON.parse(request.payload)
            const { error, value } = ProfileType.validate(payload);
            if (error) return error
            const result = await deleteProfile(value.id)
            return result ? result.toObject() : "No data returned: Error 051";
        }
    });

    await server.start();
    console.log('🌎 Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});


connectDB().then(() => init())