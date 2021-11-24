const express = require('express')
const cors = require('cors')
const socketio = require('socket.io')
const os = require('node-os-utils')

const cpu = os.cpu
const mem = os.mem
const server = express()

server.set('port', process.env.PORT || 3000)
server.use(cors())
const servidor = server.listen(server.get('port'), () => {
    console.log('=====[Conexion exitosa]=====')
});

//enviamos la const servidor a socket io para habilitar el canal websocket
const io = socketio(servidor)
//establecemos la apertura del canal para emitir posteriormente los datos
io.on('connection', (socket) => {
    setInterval(() => {
        //enviamos datos random
        socket.emit('dato-socket', {
            dato: Math.random(),
            nombre: 'Dario'
        })
    }, 10000)
    setInterval(() => {
        cpu.free()
            .then(info => {
                socket.emit('datos-cpu', {
                    descripcion: '% de CPU Libre',
                    data: info
                })
            });
    }, 10000)
    setInterval(() => {
        mem.free()
            .then(info => {
                socket.emit('datos-mem', {
                    descripcion: 'Memoria Libre',
                    data: info['freeMemMb']
                })
            });
    }, 10000)
    //recibimos datos mediante "respuesta"
    socket.on('respuesta', (valor) => {
        console.log(valor)
    })
});