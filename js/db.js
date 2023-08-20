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