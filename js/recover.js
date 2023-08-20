const sqlite3 = require('sqlite3').verbose();

// Crie uma conexão com o banco de dados
const db = new sqlite3.Database('database.sqlite');

// Execute uma consulta para recuperar todos os registros
const query = 'SELECT * FROM preferencias';

db.all(query, (error, rows) => {
  if (error) {
    console.error('Erro ao recuperar dados:', error);
    return;
  }

  // Processar os resultados
  console.log('Registros recuperados:');
  rows.forEach(row => {
    console.log(row);
  });

  // Feche a conexão com o banco de dados após a recuperação
  db.close();
});