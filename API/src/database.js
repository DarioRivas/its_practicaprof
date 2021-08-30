const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:''
});

//aca se pone en marcha la conexion
db.connect()

module.exports = db;
