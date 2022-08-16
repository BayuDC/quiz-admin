/**
 * @param {import('fastify').FastifyInstance} fastify
 * @param {import('fastify').FastifyPluginOptions} options
 * @param {import('fastify').FastifyPluginCallback} done
 */
module.exports = function (fastify, options, done) {
    fastify.get('/classes', {
        handler: () => {},
    });
    fastify.get('/classes/:id', {
        handler: () => {},
    });
    fastify.post('/classes/', {
        handler: () => {},
    });
    fastify.put('/classes/:id', {
        handler: () => {},
    });
    fastify.delete('/classes/:id', {
        handler: () => {},
    });

    done();
};
