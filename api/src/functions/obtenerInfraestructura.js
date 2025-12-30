const { app } = require('@azure/functions');
const { ResourceGraphClient } = require("@azure/arm-resourcegraph");
const { DefaultAzureCredential } = require("@azure/identity");

const RESOURCE_MAP = {
    // Compute & Web
    "microsoft.web/sites": "App Service / Function",
    "microsoft.web/static-sites": "Static Web App",
    "microsoft.web/staticsites": "Static Web App", // Azure a veces usa este alias
    "microsoft.web/serverfarms": "App Service Plan",
    "microsoft.compute/virtualmachines": "Virtual Machine",
    
    // Databases
    "microsoft.documentdb/databaseaccounts": "Azure Cosmos DB",
    "microsoft.documentdb/mongoclusters": "Cosmos DB for MongoDB (vCore)",
    
    // Storage
    "microsoft.storage/storageaccounts": "Storage Account",
    
    // Monitoring & Insights 
    "microsoft.insights/components": "Application Insights",
    "microsoft.insights/actiongroups": "Action Groups",
    "microsoft.alertsmanagement/smartdetectoralertrules": "Smart Detector Alert Rules",
    "microsoft.insights/metricalerts": "Metric Alerts",
    
    // Networking & Security
    "microsoft.keyvault/vaults": "Key Vault",
    "microsoft.network/virtualnetworks": "Virtual Network",
    "microsoft.network/networkinterfaces": "Network Interface",
    "microsoft.network/publicipaddresses": "Public IP Address",
    "microsoft.network/networksecuritygroups": "Network Security Group"
};


function createGraph(nodes, edges, rawResources){
    nodes.push({
        id: "rg-webapp",
        position: {x:0, y:0},
        data: {
            label: "rg-webapp",
            name: "rg-webapp",
            type: "Resource Group",
            location: "Spain Central"
        }
    })

    //const nodeNames = new Set()

    for(const rawResource of rawResources){
        const resource = changeType(rawResource)
        //if (nodeNames.has(resource.name)) continue
        //nodeNames.add(resource.name)
        addNode(nodes, resource)
    }
    addEdges(edges, nodes, rawResources)    
}

function changeType(resource){
    const originalType = resource.type
    let friendlyType = RESOURCE_MAP[originalType]

    if(!friendlyType){
        const parts = originalType.split("/")
        const rawType = parts[parts.length - 1]
        friendlyType = rawType.charAt(0).toUpperCase() + rawType.slice(1)
    }

    return {
        name: resource.name,
        type: friendlyType,
        location: resource.location
    }
}

function addNode(nodes, resource){
    nodes.push({
        id: resource.name,
        position: {x:0, y:0},
        data: {
            name: resource.name,
            type: resource.type,
            location: resource.location
        }
    })
}

function addEdges(edges, nodes, rawResource){
    const resourceGroupId = nodes[0].id
    for(const node of nodes){
        if (node.id == "rg-webapp") continue
        edges.push({
            id: `${resourceGroupId}_to_${node.id}`,
            source: resourceGroupId,
            target: node.id,
            animated: true,
            label: "Contiene",
            style: { stroke: "#69c7c7" }
        })
    }

    const functionAppNode = nodes.find(n => n.data.type.includes("App Service / Function"))
    if(functionAppNode){
        const functionResource = rawResource.find(r => r.name === functionAppNode.id)
        console.log(functionResource.properties.serverFarmId)
        if(functionResource && functionResource.properties.serverFarmId){
            const targetResourceName = functionResource.properties.serverFarmId.split("/").pop()
            const targetResourceNode = nodes.find(n => n.id === targetResourceName)
            if(targetResourceNode){
                edges.push({
                    id: `${functionAppNode.id}_to_${targetResourceNode.id}`,
                    source: functionAppNode.id,
                    target: targetResourceNode.id,
                    animated: true,
                    label: "Actualizar visitas",
                    style: { stroke: "#7836cf" }
                })
            }
        }

        const dbNodes = nodes.filter(n => n.data.type.includes("DB"))
        for(const dbNode of dbNodes){
            edges.push({
                id: `${functionAppNode.id}_to_${dbNode.id}`,
                source: functionAppNode.id,
                target: dbNode.id,
                animated: true,
                label: "Lee/Escribe",
                style: { stroke: "#7836cf" }
            });
        }

        const storageNodes = nodes.filter(n => n.data.type.includes("Storage"))
        for (const storageNode of storageNodes){
            edges.push({
                id: `${functionAppNode.id}_to_${storageNode.id}`,
                source: functionAppNode.id,
                target: storageNode.id,
                animated: true,
                label: "Registros/Código",
                style: { stroke: "#7836cf" }
            });
        }

    }
}


app.http('obtenerInfraestructura', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        try{    
            const credential = new DefaultAzureCredential();
            const client = new ResourceGraphClient(credential)

            const query = `
                resources
                | where resourceGroup contains "rg-webapp"
                | project name, type, location, properties
                | order by name asc 
            `
            const result = await client.resources({
                query: query
            })

            const nodes = []
            const edges = []
            
            createGraph(nodes, edges, result.data)
            console.log(nodes)
            console.log(edges)

            return{
                body: JSON.stringify({nodes: nodes, edges: edges})
            }

        }catch (error){
            console.error(error)
        }
    }
});
