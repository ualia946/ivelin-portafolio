const { app } = require('@azure/functions');
const { DefaultAzureCredential } = require('@azure/identity')
const { CostManagementClient } = require("@azure/arm-costmanagement")
const { CosmosClient } = require('@azure/cosmos')

const client = new CosmosClient({
    endpoint: process.env.COSMOS_DB_ENDPOINT,
    key: process.env.COSMOS_DB_KEY
})

const container = client.database("PortfolioDB").container("Costs")

async function extractCosts(today, yesterday){
    const credential = new DefaultAzureCredential()
    const client = new CostManagementClient(credential, process.env.SUBSCRIPTION_ID)

    const from = new Date(yesterday.setUTCHours(0,0,0,0)).toISOString()
    const to = new Date(yesterday.setUTCHours(23,59,59,999)).toISOString()
    const scope = `/subscriptions/${process.env.SUBSCRIPTION_ID}/resourceGroups/${process.env.RESOURCE_GROUP_NAME}`
    console.log(`Fecha de inicio: ${from}
        Fecha de fin: ${to}`)

    const result = await client.query.usage(scope, {
        type: 'ActualCost',
        timeframe: 'Custom',
        timePeriod: {from: from, to: to},
        dataset: {
            granularity: 'Daily',
            aggregation: {
                totalCost: {name: 'Cost', function: 'Sum'}
            },
            grouping: [
                {type: 'Dimension', name: 'Product'},
                {type: 'Dimension', name: 'ResourceLocation'}
            ]
        }
    })
    return result.rows
}

function transfromCosts(dailyCosts, today, yesterday){
    
    const transformedCosts = dailyCosts.map(c => (
        {
            id: c[1] + " - " + c[2],
            type: "daily_cost",
            usageDate: new Date(yesterday.setUTCHours(0,0,0,0)).toISOString(),
            cost: c[0],
            currency: c[4],
            serviceName: c[2],
            resourceLocation: c[3],
            ingestedData: new Date(today.setUTCHours(6,0,0,0)).toISOString()
        }
    ))
    return transformedCosts
}

async function loadToCosmosDB(transformedCosts){


    for(let tc of transformedCosts){
        try {
            await container.items.upsert(tc)
        } catch (error) {
            console.error(`Error al guardar el costo ${tc.id}:`, error.message)
            continue
        }
    }
}

app.http('ETLCostesDiarios', {
    schedule: "0 0 20 11 * *",
    handler: async (myTimer, context) => {

        const today = new Date()
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)

        const dailyCosts = await extractCosts(today, yesterday)
        const transformedCosts = transfromCosts(dailyCosts, today, yesterday)
        await loadToCosmosDB(transformedCosts)

        return{
            jsonBody: transformedCosts
        }

    },
});