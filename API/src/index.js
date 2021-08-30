const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
//aca obtengo toda la funcionalidad de express, depositada en la constante server
const server = express()

//especificamos el formato de datos que va  aminuplas nuestros servidor
server.use(express.json())

//nos va a permitir comunicar al cliente con el servidor y viceversa
server.use(cors)

//nos va a notificar en la consola cada ves que se haga una petision http
server.use(morgan('dev'))

//asigno un puerto:
server.set('port', process.env.PORT || 3001)

//le damos arranque a nuestro servidor
server.listen(server.get('port'))

console.log(`Servidor corriendo en el puerto ${server.get('port')}`)