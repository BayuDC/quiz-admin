const yup = require('yup');
const fp = require('fastify-plugin');

module.exports = fp(function (fastify, options, done) {
    const yupOptions = {
        strict: false,
        abortEarly: false,
        stripUnknown: true,
        recursive: true,
    };

    fastify.setValidatorCompiler(({ schema }) => {
        return data => {
            try {
                if (!data || !yup.object().isValidSync(data)) {
                    throw new Error('Please send a valid JSON body');
                }
                const value = schema.validateSync(data, yupOptions);
                return { value };
            } catch (error) {
                return { error };
            }
        };
    });
    fastify.decorate('validateAsync', schema => {
        return async req => {
            await schema.bodyAsync?.validate(req.body, yupOptions);
        };
    });

    done();
});
