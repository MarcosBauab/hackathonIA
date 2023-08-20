const sqlite3 = require('sqlite3').verbose();

// Crie uma conexão com o banco de dados (ou abra se já existir)
const db = new sqlite3.Database('db.sqlite');

// Execute o comando SQL para criar a tabela
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS preferencias (
    id INTEGER PRIMARY KEY,
    nome TEXT,
    idioma TEXT,
    nivel TEXT,
    objetivo TEXT,
    dias TEXT,
    tempo TEXT,
    unidade TEXT,
    horas TEXT,
    minutos TEXT,
    sobre TEXT
  )
`;

// db.run(createTableQuery, (error) => {
//   if (error) {
//     console.error('Erro ao criar a tabela:', error);
//   } else {
//     console.log('Tabela criada com sucesso.');
//   }
// });

// // Feche a conexão com o banco de dados após criar a tabela
// db.close();

const query = `
  INSERT INTO preferencias ( nome, idioma, nivel, objetivo, dias, tempo, unidade, horas, minutos, sobre) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

  db.run(query, ["Otávio", "Inglês", "Entrevista de emprego", "Básico", "seg, ter","4", "Semanas", "1", "0", "Me chamo Otávio, tenho 17 anos e ainda estou no ensino médio e estou em busca da minha primeira oportunidade de emprego, gosto muito de séries de comédia e da lingua inglesa, quero aprender ingles para poder conseguir meu primeiro emprego e de preferência na área da saúde pois tenho vontade de cursar medicina futuramente" ], (error) => {
    if (error) {
        console.error('Erro ao inserir no banco de dados:', error);
        res.status(500).send('Erro ao salvar os dados.');
    } else {
    }
});