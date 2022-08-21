const Fastify = require('fastify');

const port = process.env.APP_PORT || 8080;
const host = process.env.APP_HOST || '127.0.0.1';

const fastify = Fastify();

fastify.register(require('@fastify/cors'));
fastify.register(require('@fastify/sensible'));
fastify.register(require('./plugins/state'));
fastify.register(require('./plugins/error'));
fastify.register(require('./plugins/valid'));

fastify.register(require('./routes/class'));
fastify.register(require('./routes/student'));
fastify.register(require('./routes/task'));
fastify.register(require('./routes/question'));
fastify.get('/', () => ({
    message: 'Hello World',
}));

fastify.listen({ port, host }, (err, addr) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at', addr);
});
