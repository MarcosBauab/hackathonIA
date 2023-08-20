const sqlite3 = require('sqlite3').verbose();

// Crie uma conexão com o banco de dados
const db = new sqlite3.Database('db.sqlite');

const processRow = row => {
  return row; // ou faça qualquer processamento necessário
};

const getAllRows = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM preferencias';

    db.all(query, (error, rows) => {
      if (error) {
        console.error('Erro ao recuperar dados:', error);
        return reject(error);
      }

      // Processar os resultados
      const arrRows = rows.map(processRow);

      // Feche a conexão com o banco de dados após a recuperação
      db.close();

      resolve(arrRows);
    });
  });
};

module.exports = getAllRows;
