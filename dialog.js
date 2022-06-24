const venom = require('venom-bot');

const express = require('express');
const http = require('http');
const {WebhookClient} = require('dialogflow-fulfillment'); 
const dialogflow = require('@google-cloud/dialogflow');
const app = express();
const port = process.env.PORT || 8000; //DEFINIR PORTAS
const server = http.createServer(app);

venom 
    .create({
        headless: true,
        session: 'dialogsession'})
        .then((client) => start(client))
        .catch((erro) => {
                console.log(erro);
        });

//webhook dialogflow
app.post('/webhook', function(request,response){
    const agent = new WebhookClient ({ request, response});
        let intentMap = new Map();
        intentMap.set('nomedaintencao', nomedafuncao)
        agent.handleRequest(intentMap);
        });
    function nomedafuncao (agent) {
    }

const sessionClient = new dialogflow.SessionsClient({keyFilename: "//SEU-KEY-FILENAME"});

async function detectIntent(
    projectId,
    sessionId,
    query,
    contexts,
    languageCode
) {
    const sessionPath = sessionClient.projectAgentSessionPath(
        projectId,
        sessionId
    );

    // The next query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: query,
                languageCode: languageCode,
            },
        },
    };

    if (contexts && contexts.length > 0) {
        request.queryParams = {
            contexts: contexts,
        };
    }

    const responses = await sessionClient.detectIntent(request);
    return responses[0];
}

async function executeQueries(projectId, sessionId, queries, languageCode) {
    let context;
    let intentResponse;
    for (const query of queries) {
        try {
            console.log(`Pergunta: ${query}`);
            intentResponse = await detectIntent(
                projectId,
                sessionId,
                query,
                context,
                languageCode
            );
            console.log('Enviando Resposta');
            console.log(intentResponse.queryResult.fulfillmentText);
            return `${intentResponse.queryResult.fulfillmentText}`
        } catch (error) {
            console.log(error);
        }
    }
}

function start(client) {
    client.onMessage(async (msg) => {

        if (msg.type === "chat"){
            //integração de texto dialogflow
                let textoResposta = await executeQueries("//SEU-PROJECT-NAME", msg.from, [msg.body], 'pt-BR')
                client.sendText(msg.from, "Ok\n\n" + textoResposta.replace(/\\n/g, '\n'));
        }
    });
}

server.listen(port, function() {
    console.log('App running on *: ' + port);
});
