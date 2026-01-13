const { app } = require('@azure/functions');
const { CosmosClient } = require('@azure/cosmos')

app.http('registrarTraficoGeo', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const header = request.headers.get('x-forwarded-for')
        const ip = header ? header.split(",")[0].split(":")[0] : null
        //const ip = "102.135.163.255"
        console.log(ip)
        if(!ip){
            return {
                status: 400,
                jsonBody:{ message: "Error al obtener la IP: ", ip }
            }
        }
        context.log(`🌍 Procesando ubicación de la IP: ${ip}`)

        const cosmosClient = new CosmosClient({
            endpoint: process.env.COSMOS_DB_ENDPOINT,
            key: process.env.COSMOS_DB_KEY
        })

        const partition_key = "localizacion"
        const itemID = ip
        let container
        try {
            container = cosmosClient.database('PortfolioDB').container("General")
        } catch (error) {
            context.log(error)
            return { status: 500, jsonBody: {message: "Error configuración Base de Datos"} }
        }

        let userLocation = null
        try {
            const geoResponse = await fetch(`https://ipwho.is/${ip}`)
            const geoData = await geoResponse.json()

            // ipwho.is can return success=false or omit some fields; use optional chaining and sensible fallbacks
            if (geoData && geoData.success === false) {
                context.warn?.(`ipwho.is fallo: ${geoData.message ?? 'unknown error'}`)
            }

            userLocation = {
                id: geoData?.ip ?? ip,
                type: partition_key,
                protocol: geoData?.type ?? null,
                location:{
                    country: geoData?.country ?? null,
                    country_code: geoData?.country_code ?? null,
                    city: geoData?.city ?? null,
                    emoji: geoData?.flag?.emoji ?? null
                },
                latitude: geoData?.latitude ?? null,
                longitude: geoData?.longitude ?? null,
                lastUpdated: new Date().toISOString()
            }
            context.log(userLocation)
        } catch (error) {
            context.error(error)
            return{
                status: 500,
                jsonBody: { message: error.message }  
            }
        }

        if(!userLocation){
            return{
                message: "No se ha obtenido la localización del usuario a través de su IP",
                code: 500
            }
        }

        context.log("Comprobando si la IP del dispositivo está registrada")
        const itemRef = container.item(itemID, partition_key)

        let userLocationCosmosDB
        try{
            const { resource } = await itemRef.read()
            userLocationCosmosDB = resource
        }catch(error){
            console.error(error)
            if (error.code !== 404) {
                return { status: 500, body: error.message };
            }
        }

        if(!userLocationCosmosDB){
            context.log("Creando nuevo registro...")
            await container.items.create(userLocation)
            return {jsonBody: userLocation}
        }

        context.log("Actualizando registro...")
        userLocationCosmosDB.lastUpdated = new Date().toISOString()
        const { resource: updatedUserLocation } = await itemRef.replace(userLocationCosmosDB)
        return {jsonBody: updatedUserLocation}
    }
});
