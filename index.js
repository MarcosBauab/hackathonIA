// Importe a biblioteca dotenv e carregue as variáveis de ambiente
require('dotenv').config();
require('./js/preview-chat')
require('./js/db')

// Agora você pode acessar as variáveis definidas no arquivo .env usando process.env
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const express = require('express')
const sqlite3 = require('sqlite3');
const divideTopics = require('./js/preview-chat');

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))

const db = new sqlite3.Database('db.sqlite');

app.get('/', function (req, res) {
    res.sendFile('index.html', {root: __dirname});
})

app.get('/api', async (req, res) => {
    try {
      const json = await divideTopics();
      res.json(json);
    } catch (error) {
      console.error('Erro na requisição:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });

app.post('/form', function (req, res) {
    const { seg, ter, qua, qui, sex, sab, dom, nome, idioma, objetivo, nivel, ['tempo-aprendizado']: tempoAprendizado, unidade, horas, minutos, sobre } = req.body;

    const diasDaSemana = []

    if (seg) diasDaSemana.push('seg');
    if (ter) diasDaSemana.push('ter');
    if (qua) diasDaSemana.push('qua');
    if (qui) diasDaSemana.push('qui');
    if (sex) diasDaSemana.push('sex');
    if (sab) diasDaSemana.push('sab');
    if (dom) diasDaSemana.push('dom');

    const arrayAsString = diasDaSemana.join(', ');

    const sql = 'INSERT INTO preferencias (nome, idioma, objetivo, nivel, dias, tempo, unidade, horas, minutos, sobre) VALUES (?, ?, ?,?,?,?,?,?,?,?)';
    db.run(sql, [nome, idioma, objetivo, nivel, arrayAsString,tempoAprendizado, unidade, horas, minutos, sobre ], (error) => {
        if (error) {
            console.error('Erro ao inserir no banco de dados:', error);
            res.status(500).send('Erro ao salvar os dados.');
        } else {
            console.log(req.body)
            res.sendFile('/public/calendario.html', {root: __dirname});
        }
    });
})

app.listen('3000', () => {
    console.log(`Now listening on port 3000`);
}); 