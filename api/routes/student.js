const handler = require('../handlers/student');
const schema = require('../schemas/student');

/**
 * @param {import('fastify').FastifyInstance} fastify
 * @param {import('fastify').FastifyPluginOptions} options
 * @param {import('fastify').FastifyPluginCallback} done
 */
module.exports = function (fastify, options, done) {
    fastify.get('/students', {
        handler: handler.index,
    });
    fastify.get('/students/:id', {
        preHandler: handler.load,
        handler: handler.show,
    });
    fastify.post('/students', {
        handler: handler.store,
        schema,
    });
    fastify.put('/students/:id', {
        preHandler: handler.load,
        handler: handler.update,
        schema,
    });
    fastify.delete('/students/:id', {
        preHandler: handler.load,
        handler: handler.destroy,
    });

    done();
};
