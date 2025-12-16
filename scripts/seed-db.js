import fs from 'node:fs'
import { GoogleGenAI } from "@google/genai";
import { MongoClient } from 'mongodb'

const GEMINI_API = process.env.GEMINI_API
const MONGODB_URI = process.env.MONGODB_URI

if(!GEMINI_API || !MONGODB_URI) throw new Error("Faltan variables de entorno (GEMINI_API o MONGODB_API)")

const CV_PATH = "../cv.md"
const genaiClient = new GoogleGenAI({apiKey: GEMINI_API})
const mongoClient = new MongoClient(MONGODB_URI)

async function readAndProcessCV() {
    try{
        const rawDocument = await fs.promises.readFile(CV_PATH, 'utf-8') 
        const documentSections = rawDocument.split(/^## /m)

        const processedDocument = documentSections.map((section, index) => {
            section.trim()
            
            let finalText = section
            if (index != 0){
                finalText = '## ' + finalText
            }

            let headerLine = section.split(/\n/)[0]
            if (index == 0){
                headerLine = headerLine.split("#")[1].trim()
            }
            
            return {
                text: finalText,
                metadata: {
                    source: "cv.md",
                    sectionHeader: headerLine
                }
            }
        })
        
        return processedDocument
    }catch(error){
        console.error(error)
    }
}

async function transformTextToEmbeddings(document){

    const texts = document.map(section => {
        return section.text
    })

    try{
        const response = await genaiClient.models.embedContent({
            model: 'text-embedding-004',
            contents: texts,
            taskType: 'RETRIEVAL_DOCUMENT',
            outputDimensionality: 768
        })
        
        response.embeddings.map((embedding, index)=> {
            document[index].vector = embedding.values
        })

        return document
    }catch(error){
        console.error(error)
    }
}

async function loadCVToDatabase(vectorizedData){
    try {
        await mongoClient.connect()
        const database = mongoClient.db("portfolio")
        const collection = database.collection("vectors")

        await database.command({
            createIndexes: "vectors", //Nombre de la colección donde se va a crear el índice
            indexes: [
                {
                    name: "vectorSearchIndex",
                    key: {
                        "vector": "cosmosSearch" //Campo vector en nuestro json y la opción de búsqueda
                    },
                    cosmosSearchOptions:{
                        kind: "vector-ivf",
                        m: 16,
                        numLists: 1,
                        similarity: "COS",
                        dimensions: 768
                    }
                }
            ]
        })
        console.log("Limpiando la colección")
        await collection.deleteMany({})
        console.log(`Insertando ${vectorizedData.length} documentos`)
        await collection.insertMany(vectorizedData)
        console.log("Carga completada")
    } catch (error) {
        console.error(error)
    }finally{
        await mongoClient.close()
    }
}

async function main(){
    const extractedData = await readAndProcessCV()
    console.log("CV Procesado. Se han detectado: ", extractedData.length, "secciones.")
    const vectorizedData = await transformTextToEmbeddings(extractedData)
    console.log("Vectores añadidos a los documentos")
    await loadCVToDatabase(vectorizedData)
}


main()




