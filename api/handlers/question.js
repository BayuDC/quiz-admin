const prisma = require('../db');
module.exports = {
    /**
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply} reply
     */
    async load(req, reply) {
        const { questionId } = req.params;
        try {
            const question = await prisma.question.findUnique({
                where: { id: parseInt(questionId) || 0 },
                include: { choices: true },
            });
            if (!question) return reply.notFound('Question not found');
            req.state.question = question;
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
            const questions = await prisma.question.findMany();
            reply.send({ questions });
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
            question: req.state.question,
        });
    },
    /**
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply} reply
     */
    async store(req, reply) {
        const { body, regularChoices, correctChoices, taskId } = req.body;
        try {
            const question = await prisma.question.create({
                data: {
                    body,
                    taskId,
                    choices: {
                        createMany: {
                            data: [
                                ...correctChoices.map(v => ({ body: v, correct: true })),
                                ...regularChoices.map(v => ({ body: v, correct: false })),
                            ],
                        },
                    },
                },
                include: {
                    choices: true,
                },
            });
            reply.status(201).send({ question });
        } catch (err) {
            reply.badRequest(err.message);
        }
    },
    /**
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply} reply
     */
    async update(req, reply) {
        const { question: questionOld } = req.state;
        const { body, regularChoices, correctChoices, taskId } = req.body;
        try {
            await prisma.choice.deleteMany({
                where: { questionId: questionOld.id },
            });
            const questionNew = await prisma.question.update({
                where: { id: questionOld.id },
                data: {
                    body,
                    taskId,
                    choices: {
                        createMany: {
                            data: [
                                ...correctChoices.map(v => ({ body: v, correct: true })),
                                ...regularChoices.map(v => ({ body: v, correct: false })),
                            ],
                        },
                    },
                },
                include: {
                    choices: true,
                },
            });
            reply.send({ question: questionNew });
        } catch (err) {
            reply.badRequest(err.message);
        }
    },
    /**
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply} reply
     */
    async destroy(req, reply) {
        const { question } = req.state;
        try {
            await prisma.choice.deleteMany({ where: { questionId: question.id } });
            await prisma.question.delete({ where: { id: question.id } });
            reply.status(204).send();
        } catch (err) {
            reply.badRequest(err.message);
        }
    },
};
