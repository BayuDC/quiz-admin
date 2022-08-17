const prisma = require('../db');

module.exports = {
    /**
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply} reply
     */
    async load(req, reply) {
        const { id } = req.params;
        try {
            const kurasu = await prisma.class.findUnique({ where: { id: parseInt(id) || 0 } });

            if (!kurasu) {
                return reply.notFound('Class not found');
            }

            req.state.class = kurasu;
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
        reply.send({ class: req.state.class });
    },
    /**
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply} reply
     */
    async store(req, reply) {
        const { name } = req.body;
        try {
            const kurasu = await prisma.class.create({
                data: { name },
            });
            reply.status(201).send({ class: kurasu });
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
        const { class: classOld } = req.state;
        try {
            const classNew = await prisma.class.update({
                where: { id: parseInt(classOld.id) },
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
        const { class: kurasu } = req.state;
        try {
            await prisma.class.delete({
                where: { id: parseInt(kurasu.id) },
            });
            reply.status(204).send();
        } catch (err) {
            reply.badRequest(err);
        }
    },
};
