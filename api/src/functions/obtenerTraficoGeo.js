const { app } = require('@azure/functions');
const { CosmosClient } = require('@azure/cosmos')

app.http('obtenerTraficoGeo', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {

        const cosmosClient = new CosmosClient({
            endpoint: process.env.COSMOS_DB_ENDPOINT,
            key: process.env.COSMOS_DB_KEY
        })

        let container
        try {
            container = cosmosClient.database('PortfolioDB').container("General")
        } catch (error) {
            context.log(error)
            return { status: 500, jsonBody: {message: "Error configuración Base de Datos"} }
        }

        const querySpec = {
            query: `SELECT TOP 100 * FROM ${container.id} g WHERE g.type = 'localizacion' ORDER BY g._ts DESC`
        }

        const { resources } = await container.items.query(querySpec).fetchAll()

        return{
            jsonBody: {
                locations: resources
            }
        }
        
    }
});
