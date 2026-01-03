const { app } = require('@azure/functions');
const { MongoClient } = require('mongodb')
const { GoogleGenAI } = require('@google/genai')

async function transformQuestionIntoVector(question, genaiClient) {
    try{
        const response = await genaiClient.models.embedContent({
            model: 'text-embedding-004',
            contents: question,
            taskType: 'QUESTION_ANSWERING',
            outputDimensionality: 768
        })

        return response.embeddings[0].values
        
    } catch(error){
        console.error(error)
    }
}

async function getSimilarMeaningCV(questionVector, mongoClient){
    try {
        await mongoClient.connect()
        const database = mongoClient.db("portfolio")
        const collection = database.collection("vectors")

        const pipeline = [
            {
                "$search": {
                    "cosmosSearch": {
                        "vector": questionVector,
                        "path": "vector",
                        "k": 3
                    }
                }
            },
            
            {
                "$project": {
                    "_id": 0,
                    "text": 1,
                    "metadata": 1
                }
            }
        ]

        return await collection.aggregate(pipeline).toArray()

    } catch (error) {
        console.error(error)
    } finally {
        mongoClient.close()
    }
}

async function getResponse(question, queryResult, genaiClient){
    const contextString = JSON.stringify(queryResult);
    const prompt = `
        Actúa como Ivelin Apostolov (el dueño de este CV). Tu tarea es responder preguntas profesionales sobre tu experiencia basándote EXCLUSIVAMENTE en el contexto proporcionado abajo.

        REGLAS:
        1. Usa un tono profesional pero cercano.
        2. Si la respuesta no está en el contexto, di: "Lo siento, esa información no está detallada en mi CV actual, pero puedo decirte que..." y habla de algo relacionado que sí sepas, o simplemente di que no tienes esa información. No inventes datos.
        3. Sé conciso.

        CONTEXTO RECUPERADO DEL CV:
        ${contextString}

        PREGUNTA DEL RECLUTADOR:
        "${question}"
        
        RESPUESTA:
        `;
    try{
        const response = await genaiClient.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        })

        return response.text
    } catch(error) {
        console.error(error)
        if(error.code = 503) return "Lo siento, se está usando una versión gratuita de la api de Gemini. En este momento los servidores están saturados, vuelva a intentarlo más tarde."
    }
}


app.http('obtenerRespuestaChatBot', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        try {
            const GEMINI_API = process.env.GEMINI_API
            const MONGODB_URI = process.env.MONGODB_URI

            if(!GEMINI_API || !MONGODB_URI){
                return {
                    body: JSON.stringify({
                        message: 'Error obteniendo las claves API de Gemini o MongoDB.',
                        hint: 'Verificar las claves API'
                    }),
                    headers: {'Content-Type': 'application/json'}
                }
            }
            const genaiClient = new GoogleGenAI({apiKey: GEMINI_API})
            const mongoClient = new MongoClient(MONGODB_URI)

            const body = await request.json()
            const question = body.question 

            if(!question){
                return { status: 400, body: "Por favor envíe una pregunta" }
            }
  
            const questionVector = await transformQuestionIntoVector(question, genaiClient)
            const queryResult = await getSimilarMeaningCV(questionVector, mongoClient)
            const response = await getResponse(question, queryResult, genaiClient)

            return {
                body: JSON.stringify({reply: response}),
                headers: {'Content-Type': 'application/json'}
            }
        
        } catch (error) {
           console.error(error) 
        }
    }
});