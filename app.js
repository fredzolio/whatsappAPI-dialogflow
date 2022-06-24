const venom = require('venom-bot');

const express = require('express');
const http = require('http');
const app = express();
const port = process.env.PORT || 3333;
const server = http.createServer(app);
const { body, validationResult } = require('express-validator');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

venom 
    .create({
        headless: true,
        session: 'undefined'})
        .then((client) => start(client))
        .catch((erro) => {
                console.log(erro);
        });

function start(client) {

        app.post('/send-message', [
                            body('number').notEmpty(),
                            body('message').notEmpty(),
                ], async (req, res) => {
            const errors = validationResult(req).formatWith(({
                msg
            }) => {
                return msg;
            });

            if (!errors.isEmpty()) {
                return res.status(422).json({
                    status : false,
                    message: errors.mapped()
                });
            }
            const chatsAllNew = getAllChatsNewMsg();
            const number = req.body.number;
            const message = req.body.message;

            //client.sendText(number, message);
            client.sendText(number, message).then(response => {
                res.status(200).json({
                    status: true,
                    message: 'Mensagem enviada',
                    response: response
                });
            }).catch(err => {
                res.status(500).json({
                    status: false,
                    message: 'Mensagem nao enviada',
                    response: err.text
                });
            });
            //rer.send('Mensagem enviada');
            })
            
            //Receber mensagens por GET method
            app.get('/receive-message', [
                            body('sessionName')
                ], async (req, res) => {
            const errors = validationResult(req).formatWith(({
                msg
            }) => {
                return msg;
            });

            if (!errors.isEmpty()) {
                return res.status(422).json({
                    status : false,
                    message: errors.mapped()
                });
            }
            const chatsAllNew = getAllChatsNewMsg();
            const number = req.body.number;
            const message = req.body.message;
            const received = res.body.message;

            //client.receiveText(number, message);
            client.onAnyMessage(message).then(response => {
                res.status(200).json({
                    status: true,
                    message: received,
                    response: response
                });
            });
            })
}    

server.listen(port, function() {
    console.log('App running on *: ' + port);
});
