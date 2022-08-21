const schema = require('../schemas/question');
const handler = require('../handlers/question');

/**
 * @param {import('fastify').FastifyInstance} fastify
 * @param {import('fastify').FastifyPluginOptions} options
 * @param {import('fastify').FastifyPluginCallback} done
 */
module.exports = function (fastify, options, done) {
    fastify.get('/questions', {
        handler: handler.index,
    });
    fastify.get('/questions/:questionId', {
        preHandler: handler.load,
        handler: handler.show,
    });
    fastify.post('/questions', {
        preHandler: [fastify.validateAsync(schema)],
        handler: handler.store,
        schema,
    });
    fastify.put('/questions/:questionId', {
        preHandler: [fastify.validateAsync(schema), handler.load],
        handler: handler.update,
        schema,
    });
    fastify.delete('/questions/:questionId', {
        preHandler: handler.load,
        handler: handler.destroy,
    });
    done();
};
