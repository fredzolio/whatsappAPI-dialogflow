# whatsappAPI-full-home-automation
Envio e recebimento de mensagens por BOT no whatsapp usando DialogFlow.

Projeto ainda em desenvolvimento, podendo sofrer alterações ou adições.

Uso o VENOM-BOT, DialogFlow, Node.js, Home assistant, Node-red.

Abrir as duas portas: 3333 e 8000

Rodar ambos nodes em pm2.

Criar credenciais no Google Cloud Console para o DialogFlow e baixar o arquivo .json e mudar no dialog.js o nome do arquivo.
ps: manter esse arquivo na mesma pasta do dialog.js

No DialogFlow, é necessário habilitar o Webhook e no Home Assistant criar um hook para escutar as chamadas do Dialog que enviarão as mensagens.

É necessário a instalação das dependências usadas, por enquanto peço que olhem diretamente nos arquivo .js as dependências e as instale.
