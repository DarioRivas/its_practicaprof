 //OBTENEMOS LAS LIBRERIAS
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const server = express()

//ESPECIFICAMOS EL TIPO DE DATOS:
server.use(express.json())

//CORS PERMITE LA COM CLIENTE/SERVIDOR
server.use(cors())

//PETICIONES HTTP
server.use(morgan('dev'))

//ASIGNO UN PUERTO PREDETERMINADO
server.set('port', process.env.PORT || 3000)

//ASIGNO LAS RUTAS
server.use(require('./routes/producto.route'))

//INICIAMOS NUESTRO SERVIDOR
server.listen(server.get('port'))
console.log(`Servidor corriendo en el puerto: ${server.get('port')}`)