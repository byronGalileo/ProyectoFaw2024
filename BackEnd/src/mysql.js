const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',    // o el host donde se encuentre tu base de datos
  user: 'root',
  password: '',
  database: 'proyectFAW2024'
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.stack);
    return;
  }
  console.log('Conexión exitosa con id ' + connection.threadId);
});

// Aquí puedes exportar la conexión si necesitas usarla en otros módulos
module.exports = connection;