const express = require('express')
const cors = require('cors')
const socketio = require('socket.io')
const os = require('node-os-utils')
const opSis = require('os')
const morgan = require('morgan')
const nodeDiskInfo = require('node-disk-info');

const cpu = os.cpu
const mem = os.mem

const server = express()
server.set('port', process.env.PORT || 3000)
server.use(express.json())
server.use(cors())
server.use(morgan('dev'))
const servidor = server.listen(server.get('port'), () => {
    console.log(`======[ CONEXION EXITOSA EN EL PUERTO ${server.get('port')} ]======`)
});
server.use(require('./routes/cliente.route'))
const io = socketio(servidor)
io.on('connection', (socket) => {
    const count = cpu.count()
    socket.emit('cpu-cores', {
        descripcion: 'Cores',
        data: count
    });
    const model = cpu.model()
    socket.emit('cpu-model', {
        descripcion: 'Modelo',
        data: model
    });

    socket.emit('datosSistema', {
        tipo: opSis.type(),
        arch: opSis.arch(),
        plat: opSis.platform(),
        release: opSis.release(),
        version: opSis.version(),
        host: opSis.hostname()
    });

    nodeDiskInfo.getDiskInfo()
        .then(disks => {
            socket.emit('drive-info', {
                infoDiscos: disks
            })
        });

    setInterval(() => {
        cpu.free()
            .then(info => {
                socket.emit('cpu-free', {
                    descripcion: 'CPU Libre',
                    data: info.toFixed(2) + "%"
                })
            });
        cpu.usage()
            .then(info => {
                socket.emit('cpu-use', {
                    descripcion: 'uso de CPU',
                    data: info
                })
            });

        mem.info()
            .then(info => {
                socket.emit('mem-info',
                    {
                        descTotal: 'Memoria Total',
                        dataTotal: info.totalMemMb + ' Mb',
                        descLibre: 'Memoria Libre',
                        dataLibre: info.freeMemMb + ' Mb',
                        descUtil: 'Memoria Utilizada',
                        dataUtil: info.usedMemMb + ' Mb',
                        descPorc: 'Memoria Libre (%)',
                        dataPorc: info.freeMemPercentage + '%',
                        data: info.usedMemMb
                    })
            });
        mem.info()
            .then(info => {
                socket.emit('mem-graph',
                    {
                        data: info.usedMemMb
                    })
            });
    }, 1000)
    socket.on('respuesta', (valor) => {
        console.log(valor)
    })
});