module.exports = {
    body: {
        type: 'object',
        required: ['name'],
        properties: {
            name: {
                type: 'string',
            },
        },
    },
};
