const { app } = require('@azure/functions');
const { CosmosClient } = require('@azure/cosmos')

const client = new CosmosClient({
    endpoint: process.env.COSMOS_DB_ENDPOINT,
    key: process.env.COSMOS_DB_KEY
})

const container = client.database("PortfolioDB").container("General")
const partition_key = "metricas_web"
const itemID  = "contador_visitas"

app.http('actualizarVisitas', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {

        context.log("Obtener el objeto de nuestro contenedor")
        const itemRef = container.item(itemID, partition_key)

        let contadorJson

        try {
            const { resource } = await itemRef.read()
            contadorJson = resource
        } catch (error) {
            if(error.code === 404){
                contadorJson = null
            }else{
                throw error
            }
        }

        if(!contadorJson){
             context.log("Creando nuevo objeto contador")
            const { resource: contadorNuevo } = await container.items.create({
                id: "contador_visitas",
                type: "metricas_web",
                count: 1,
                lastUpdated: new Date().toISOString()
            })

            return {
                jsonBody: contadorNuevo
            }
        }

        context.log("Actualizando objeto contador")
        const visitasAntiguas = contadorJson.count
        const { resource: contadorActualizado } = await itemRef.replace({
            id: "contador_visitas",
            type: "metricas_web",
            count: visitasAntiguas + 1,
            lastUpdated: new Date().toISOString()
        })
        context.log("Objeto a devolver:", contadorActualizado);

        return{
            jsonBody: contadorActualizado
        }

    }
});
