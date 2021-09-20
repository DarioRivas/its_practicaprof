const mysql = require('mysql')

//CONEXION
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'its'
});

//LEVANTA LOS DATOS DE LA CONST DB Y COMPRUEBA LA CONEXION
db.connect(function(err){
    if(err){
        console.log('Error de conexión!')
        return; //PONGO UN RETURN PARA QUE FINALIZE EN CASO DE ERROR 
    }else{
        console.log('La conexión fue exitosa!')
    }
})

//EXPORTO EL ARCHIVO PARA PODER ACCEDERLO DESDE EL RESTO DEL PROGRAMA
module.exports = db;
