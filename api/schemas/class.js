const yup = require('yup');

module.exports = {
    body: yup.object({
        name: yup.string().required('The name field is required'),
    }),
};
