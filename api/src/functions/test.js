const { app } = require('@azure/functions');

app.http('test', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        return { body: "Si ves esto, la configuración de Azure es correcta" };
    }
});