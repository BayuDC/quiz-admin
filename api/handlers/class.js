const prisma = require('../db');

module.exports = {
    /**
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply} reply
     */
    async load(req, reply) {
        const { id } = req.params;
        try {
            const class$ = await prisma.class.findUnique({ where: { id: parseInt(id) || 0 } });

            if (!class$) {
                return reply.notFound('Class not found');
            }

            req.state.class$ = class$;
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
            const classes = await prisma.class.findMany();
            reply.send({ classes });
        } catch (err) {
            reply.badRequest(err.message);
        }
    },
    /**
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply} reply
     */
    async show(req, reply) {
        const { class$ } = req.state;
        reply.send({
            class: class$,
        });
    },
    /**
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply} reply
     */
    async store(req, reply) {
        const { name } = req.body;
        try {
            const class$ = await prisma.class.create({
                data: { name },
            });
            reply.status(201).send({ class: class$ });
        } catch (err) {
            reply.badRequest(err.message);
        }
    },
    /**
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply} reply
     */
    async update(req, reply) {
        const { name } = req.body;
        const { class$ } = req.state;
        try {
            const classNew = await prisma.class.update({
                where: { id: parseInt(class$.id) },
                data: { name },
            });
            reply.send({ class: classNew });
        } catch (err) {
            reply.badRequest(err.message);
        }
    },
    /**
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply} reply
     */
    async destroy(req, reply) {
        const { class$ } = req.state;
        try {
            await prisma.class.delete({
                where: { id: parseInt(class$.id) },
            });
            reply.status(204).send();
        } catch (err) {
            reply.badRequest(err);
        }
    },
};
