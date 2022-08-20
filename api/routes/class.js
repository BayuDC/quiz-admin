const handler = require('../handlers/class');
const schema = require('../schemas/class');
const handlerStudent = require('../handlers/student');
const schemaStudent = require('../schemas/student');
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
    fastify.get('/classes/:classId/students', {
        preHandler: [
            handler.load,
            (req, _, done) => {
                req.state.filter = {
                    classId: req.state.class.id,
                };
                done();
            },
        ],
        handler: handlerStudent.index,
    });
    fastify.post('/classes', {
        handler: handler.store,
        schema,
    });
    fastify.post('/classes/:classId/students', {
        preValidation: [
            handler.load,
            (req, _, done) => {
                req.body.classId = req.state.class.id;
                done();
            },
        ],
        handler: handlerStudent.store,
        schema: schemaStudent,
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
