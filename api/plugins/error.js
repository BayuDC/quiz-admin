const yup = require('yup');
const fp = require('fastify-plugin');

module.exports = fp(function (fastify, options, done) {
    fastify.setValidatorCompiler(({ schema }) => {
        return data => {
            try {
                const value = schema.validateSync(data, {
                    strict: false,
                    abortEarly: false,
                    stripUnknown: true,
                    recursive: true,
                });
                return { value };
            } catch (error) {
                return { error };
            }
        };
    });

    fastify.setErrorHandler((err, req, reply) => {
        if (err instanceof yup.ValidationError) {
            return reply.status(422).send({
                message: 'Invalid data',
                detail: err.inner.reduce((result, { path, message }) => {
                    result[path] = message;
                    return result;
                }, {}),
            });
        }
        reply.status(err.statusCode || 500);
        reply.send({
            message: err.message || 'Somehting went wrong',
        });
    });

    fastify.setNotFoundHandler((req, reply) => {
        reply.status(404);
        reply.send();
    });

    done();
});
