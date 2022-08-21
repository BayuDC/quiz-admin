const handler = require('../handlers/task');
const schema = require('../schemas/task');

/**
 * @param {import('fastify').FastifyInstance} fastify
 * @param {import('fastify').FastifyPluginOptions} options
 * @param {import('fastify').FastifyPluginCallback} done
 */
module.exports = function (fastify, options, done) {
    fastify.get('/tasks', {
        handler: handler.index,
    });
    fastify.get('/tasks/:taskId', {
        preHandler: handler.load,
        handler: handler.show,
    });
    fastify.post('/tasks', {
        handler: handler.store,
        schema,
    });
    fastify.put('/tasks/:taskId', {
        preHandler: handler.load,
        handler: handler.update,
        schema,
    });
    fastify.delete('/tasks/:taskId', {
        preHandler: handler.load,
        handler: handler.destroy,
    });
    done();
};
