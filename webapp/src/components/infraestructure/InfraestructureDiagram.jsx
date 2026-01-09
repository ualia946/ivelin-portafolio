import React, { useEffect, useState } from 'react'
import { ReactFlow, Controls, Background } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import dagre from 'dagre';
import {  BounceLoader } from 'react-spinners'


const RESOURCE_IMAGES = {
    "Resource Group": "icons/azure-icons/Resource-Groups.svg",
    "App Service / Function": "/icons/azure-icons/10029-icon-service-Function-Apps.svg",
    "Static Web App": "/icons/azure-icons/01007-icon-service-Static-Apps.svg",
    "App Service Plan": "/icons/azure-icons/00046-icon-service-App-Service-Plans.svg",
    "Virtual Machine": "/icons/azure-icons/10021-icon-service-Virtual-Machine.svg",
    "Azure Cosmos DB": "/icons/azure-icons/10121-icon-service-Azure-Cosmos-DB.svg",
    "Cosmos DB for MongoDB (vCore)": "/icons/azure-icons/documentdb.svg",
    "Storage Account": "/icons/azure-icons/10087-icon-service-Storage-Accounts-(Classic).svg",
    "Application Insights": "/icons/azure-icons/00012-icon-service-Application-Insights.svg",
    "Action Groups": "/icons/azure-icons/00002-icon-service-Alerts.svg",
    "Smart Detector Alert Rules": "/icons/azure-icons/00002-icon-service-Alerts.svg",
    "Metric Alerts": "/icons/azure-icons/00020-icon-service-Metrics.svg",
    "Key Vault": "/icons/azure-icons/10245-icon-service-Key-Vaults.svg",
    "Virtual Network": "/icons/azure-icons/10061-icon-service-Virtual-Networks.svg",
    "Network Interface": "/icons/azure-icons/10080-icon-service-Network-Interfaces.svg",
    "Public IP Address": "/icons/azure-icons/10069-icon-service-Public-IP-Addresses.svg",
    "Network Security Group": "/icons/azure-icons/10067-icon-service-Network-Security-Groups.svg",
    "User Assigned Identities": "/icons/azure-icons/10227-icon-service-Managed-Identities.svg"
}

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 250;
const nodeHeight = 130;

const getLayoutedElements = (nodes, edges, status ,direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });
 
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const statusKey = node.data.type.includes('Azure Cosmos') ? 'statusCosmos' : node.data.type.includes('Mongo') ? 'statusMongo' : 'otherResources'
    const isUp = status[statusKey] === 'connected' ? true : false
    console.log(`${statusKey}: ${isUp}`)
    return {
      ...node,
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
      data:{
        ...node.data,
        label: (
            <div className="flex flex-col items-center justify-center">
                <img src={RESOURCE_IMAGES[node.data.type]} alt="Imagen" className=' w-8'/>
                <span className="font-bold text-gray-900 text-sm mb-1">
                     {node.data.name}
                </span>
                <span className="text-gray-800 text-[10px] uppercase tracking-wide">
                    {node.data.type}
                </span>
                <span className="mt-1 relative flex h-3 w-3">
                  <span
                    className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      isUp ? 'bg-emerald-400 animate-ping' : 'bg-red-400 animate-ping'
                    }`}
                  ></span>
                  <span
                    className={`relative inline-flex rounded-full h-3 w-3 ${
                      isUp ? 'bg-emerald-500' : 'bg-red-500'
                    }`}
                  ></span>
                </span>
            </div>
        )
      }
    };
  });

  return { nodes: layoutedNodes, edges };
};



export default function InfraestructureDiagram(){

    const [nodes, setNodes] = useState([])
    const [edges, setEdges] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function getGraphElements(){
            try{
                const response = await fetch(import.meta.env.PUBLIC_API_INFRAESTRUCTURE_URL)
                const data = await response.json()
                const nodes = data.nodes
                const edges = data.edges

                const responseStatus = await fetch(import.meta.env.PUBLIC_API_SYSTEM_STATUS_URL)
                const status = await responseStatus.json()

                const {nodes: layoutedNodes, edges: layoutedEdges} = getLayoutedElements(nodes,edges, status)
                setNodes(layoutedNodes)
                setEdges(layoutedEdges)
            }catch (error){
                console.error(error)
            }finally {
                setIsLoading(false)
            }
        }

        getGraphElements()
    }, [])

    return(
        <div className='w-full h-[800px] flex justify-center items-center'>
            {isLoading ? (<BounceLoader color='#57fff9' size={200} speedMultiplier={2} />) : (<ReactFlow
                nodes={nodes}
                edges={edges}
                fitView
                className=' text-black'
            >
                <Background color="#4a5568" gap={16}/>
                <Controls className=' border-2 border-[#e2e8f0] border-pu'/>
            </ReactFlow>)}
               
        </div>
    )
}