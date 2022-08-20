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
    fastify.decorate('validateAsync', schema => {
        return async req => {
            await schema.bodyAsync?.validate(req.body, {
                strict: false,
                abortEarly: false,
                stripUnknown: true,
                recursive: true,
            });
        };
    });

    done();
});
