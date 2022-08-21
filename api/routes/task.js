const handler = require('../handlers/task');
const schema = require('../schemas/task');
const handlerQuestion = require('../handlers/question');
const schemaQuestion = require('../schemas/question');

/**
 * @param {import('fastify').FastifyInstance} fastify
 * @param {import('fastify').FastifyPluginOptions} options
 * @param {import('fastify').FastifyPluginCallback} done
 */
module.exports = function (fastify, options, done) {
    fastify.get('/tasks', {
        handler: handler.index,
    });
    fastify.get('/tasks/:taskId', {
        preHandler: handler.load,
        handler: handler.show,
    });
    fastify.get('/tasks/:taskId/questions', {
        preHandler: [
            handler.load,
            (req, _, done) => {
                req.state.filter = {
                    taskId: req.state.task.id,
                };
                done();
            },
        ],
        handler: handlerQuestion.index,
    });
    fastify.post('/tasks', {
        handler: handler.store,
        schema,
    });
    fastify.post('/tasks/:taskId/questions', {
        preValidation: [
            handler.load,
            (req, _, done) => {
                req.body.taskId = req.state.task.id;
                done();
            },
        ],
        handler: handlerQuestion.store,
        schema: schemaQuestion,
    });
    fastify.put('/tasks/:taskId', {
        preHandler: handler.load,
        handler: handler.update,
        schema,
    });
    fastify.delete('/tasks/:taskId', {
        preHandler: handler.load,
        handler: handler.destroy,
    });
    done();
};
