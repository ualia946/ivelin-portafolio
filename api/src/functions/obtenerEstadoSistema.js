const { app } = require('@azure/functions');
const { MongoClient } = require('mongodb')
const { CosmosClient } = require('@azure/cosmos')


app.http('obtenerEstadoSistema', {
    methods: ['GET'],
    authLevel: 'anonymous',

    handler: async (request, context) => {
        let statusMongo = 'disconnected'
        let statusCosmos = 'disconnected'

        const clientMongo = new MongoClient(process.env.MONGODB_URI, {serverSelectionTimeoutMS: 2000})
        const clientCosmos = new CosmosClient({
            endpoint: process.env.COSMOS_DB_ENDPOINT,
            key: process.env.COSMOS_DB_KEY
        })

        try {
            await clientMongo.connect()
            const mongoPing = await clientMongo.db("portfolio").command({ ping: 1 })
            statusMongo = mongoPing.ok === 1 ? "connected" : "disconnected"
        } catch (error) {
            context.log("Health Check MongoDB Error: ", error)
            statusMongo = 'disconnected'
        } finally {
            clientMongo.close()
        }

        try {
            const { statusCode } = await clientCosmos.database("PortfolioDB").read()
            statusCosmos = statusCode === 200 ? "connected" : "disconnected"
        } catch (error) {
            context.log("Health Check CosmosDB Error: ", error)
            statusCosmos = 'disconnected'
        }

        return {
            jsonBody: {
                statusCosmos: statusCosmos,
                statusMongo: statusMongo,
                otherResources: "connected"
            }
        }

    }
});
