const prisma = require('../db');
module.exports = {
    /**
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply} reply
     */
    async load(req, reply) {
        const { studentId } = req.params;
        try {
            const student = await prisma.student.findUnique({
                where: { id: parseInt(studentId) || 0 },
            });

            if (!student) return reply.notFound('Student not found');
            req.state.student = student;
        } catch (err) {
            reply.badRequest(err.message);
        }
    },
    /**
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply} reply
     */
    async index(req, reply) {
        const { filter } = req.state;
        try {
            const students = await prisma.student.findMany({ where: filter });
            reply.send({ students });
        } catch (err) {
            reply.badRequest(err.message);
        }
    },
    /**
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply} reply
     */
    async show(req, reply) {
        const { student } = req.state;
        reply.send({
            student: await prisma.student.findUnique({
                where: { id: student.id },
                include: { class: true },
            }),
        });
    },
    /**
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply} reply
     */
    async store(req, reply) {
        const { no, fullname, username, password, classId } = req.body;
        try {
            const student = await prisma.student.create({
                data: { no, fullname, username, password, classId },
            });
            reply.status(201).send({ student });
        } catch (err) {
            reply.badRequest(err.message);
        }
    },
    /**
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply} reply
     */
    async update(req, reply) {
        const { no, fullname, username, password, classId } = req.body;
        const { student: studentOld } = req.state;
        try {
            const studentNew = await prisma.student.update({
                where: { id: studentOld.id },
                data: { no, fullname, username, password, classId },
            });
            reply.send({ student: studentNew });
        } catch (err) {
            reply.badRequest(err.message);
        }
    },
    /**
     * @param {import('fastify').FastifyRequest} req
     * @param {import('fastify').FastifyReply} reply
     */
    async destroy(req, reply) {
        const { student } = req.state;
        try {
            await prisma.student.delete({
                where: { id: student.id },
            });
            reply.status(204).send();
        } catch (err) {
            reply.badRequest(err.message);
        }
    },
};
