const yup = require('yup');
module.exports = {
    body: yup.object({
        no: yup.number('This filed must be a number').required('This field is required'),
        fullname: yup.string().required('The fullname field is required '),
        username: yup.string().required('The username field is required '),
        password: yup.string().required('The password field is required '),
        classId: yup.number().required('The class field is required'),
    }),
};
