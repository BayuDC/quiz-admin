const prisma = require('../db');

module.exports = {
    /**
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply} reply
     */
    async load(req, reply) {
        const { taskId } = req.params;
        try {
            const task = await prisma.task.findUnique({
                where: { id: parseInt(taskId) || 0 },
            });
            req.state.task = task;
        } catch (err) {
            reply.badRequest(err.message);
        }
    },
    /**
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply} reply
     */
    async index(req, reply) {
        try {
            const tasks = await prisma.task.findMany();
            reply.send({ tasks });
        } catch (err) {
            reply.badRequest(err.message);
        }
    },
    /**
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply} reply
     */
    async show(req, reply) {
        reply.send({
            task: req.state.task,
        });
    },
    /**
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply} reply
     */
    async store(req, reply) {
        const { name } = req.body;
        try {
            const task = await prisma.task.create({
                data: { name },
            });
            reply.status(201).send({ task });
        } catch (err) {
            reply.badRequest(err.message);
        }
    },
    /**
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply} reply
     */
    async update(req, reply) {
        const { task: taskOld } = req.state;
        const { name } = req.body;
        try {
            const taskNew = await prisma.task.update({
                where: { id: taskOld.id },
                data: { name },
            });
            reply.send({
                task: taskNew,
            });
        } catch (err) {
            reply.badRequest(err.message);
        }
    },
    /**
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply} reply
     */
    async destroy(req, reply) {
        const { task } = req.state;
        try {
            await prisma.task.delete({
                where: { id: task.id },
            });
        } catch (err) {
            reply.badRequest(err.message);
        }
    },
};
