const schema = require('../schemas/question');

/**
 * @param {import('fastify').FastifyInstance} fastify
 * @param {import('fastify').FastifyPluginOptions} options
 * @param {import('fastify').FastifyPluginCallback} done
 */
module.exports = function (fastify, options, done) {
    fastify.post('/questions', {
        preHandler: [fastify.validateAsync(schema)],
        handler: () => {
            return { ok: 1 };
        },
        schema,
    });

    done();
};
