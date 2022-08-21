const yup = require('yup');
const prisma = require('../db');

module.exports = {
    body: yup.object({
        body: yup.string().required('The body field is required'),
        regularChoices: yup.array().of(yup.string()).required('Please provide some choices'),
        correctChoices: yup
            .array()
            .of(yup.string())
            .min(1, 'Please provide at least 1 correct choice')
            .required('Please provide some choices'),
        taskId: yup.number().required('The task field is required'),
    }),
    bodyAsync: yup.object({
        taskId: yup.mixed().test('exists', 'This task does not exists', async value => {
            return await prisma.task.count({
                where: { id: value },
            });
        }),
    }),
};
