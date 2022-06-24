# whatsappAPI-full-home-automation
Envio e recebimento de mensagens por BOT no whatsapp usando DialogFlow e ativações de automações via Node Red no Home Assistant.

Finalizei meu projeto dia 24/06/2022, ainda vou disponibilizar tudo aqui, assim que sobrar um tempinho.

Uso o VENOM-BOT, DialogFlow, Node.js, Home assistant, Node-red.

Abrir as duas portas: 3333 e 8000

Rodar ambos nodes em pm2.

Criar credenciais no Google Cloud Console para o DialogFlow e baixar o arquivo .json e mudar no dialog.js o nome do arquivo.
ps: manter esse arquivo na mesma pasta do dialog.js

No DialogFlow, é necessário habilitar o Webhook e no Home Assistant criar um hook para escutar as chamadas do Dialog que enviarão as mensagens.
