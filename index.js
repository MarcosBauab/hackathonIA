// Importe a biblioteca dotenv e carregue as variáveis de ambiente
require('dotenv').config();
require('./js/preview-chat')

// Agora você pode acessar as variáveis definidas no arquivo .env usando process.env
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const express = require('express')

const app = express()

app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
    res.sendFile('index.html', {root: __dirname});
})

app.get('/form', function (req, res) {
    res.sendFile('/public/teste.html', {root: __dirname});
})

app.listen('3000', () => {
    console.log(`Now listening on port 3000`);
}); 