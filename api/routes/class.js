const handler = require('../handlers/class');
const schema = require('../schemas/class');
/**
 * @param {import('fastify').FastifyInstance} fastify
 * @param {import('fastify').FastifyPluginOptions} options
 * @param {import('fastify').FastifyPluginCallback} done
 */
module.exports = function (fastify, options, done) {
    fastify.get('/classes', {
        handler: handler.index,
    });
    fastify.get('/classes/:classId', {
        preHandler: handler.load,
        handler: handler.show,
    });
    fastify.post('/classes', {
        handler: handler.store,
        schema,
    });
    fastify.put('/classes/:classId', {
        preHandler: handler.load,
        handler: handler.update,
        schema,
    });
    fastify.delete('/classes/:classId', {
        preHandler: handler.load,
        handler: handler.destroy,
    });

    done();
};
