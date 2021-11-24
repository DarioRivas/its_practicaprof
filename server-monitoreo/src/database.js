const mysql = require('mysql')
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'monitoreo_db'
});

db.connect(function(err){
    if(err){
        console.log('=====[ ERROR EN CONEXION A LA BASE DE DATOS ]=====')
        return
        ;
    }else{
        console.log('======[ CONEXION EXITOSA A LA BASE DE DATOS ]======')
    }
})
module.exports = db;