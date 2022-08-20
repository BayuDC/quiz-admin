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
    fastify.get('/students/:studentId', {
        preHandler: handler.load,
        handler: handler.show,
    });
    fastify.post('/students', {
        preHandler: [fastify.validateAsync(schema)],
        handler: handler.store,
        schema,
    });
    fastify.put('/students/:studentId', {
        preHandler: [fastify.validateAsync(schema), handler.load],
        handler: handler.update,
        schema,
    });
    fastify.delete('/students/:studentId', {
        preHandler: handler.load,
        handler: handler.destroy,
    });

    done();
};
