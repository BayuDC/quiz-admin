const yup = require('yup');
const prisma = require('../db');

module.exports = {
    body: yup.object({
        no: yup.number('This filed must be a number').required('This field is required'),
        fullname: yup.string().required('The fullname field is required '),
        username: yup.string().required('The username field is required '),
        password: yup.string().required('The password field is required '),
        classId: yup.number().required('The class field is required'),
    }),
    bodyAsync: yup.object({
        username: yup.mixed().test('unique', 'A student with this username already exists', async value => {
            return !(await prisma.student.count({ where: { username: value } }));
        }),
        classId: yup.mixed().test('exists', 'This class does not exist', async value => {
            return await prisma.class.count({ where: { id: value } });
        }),
    }),
};
