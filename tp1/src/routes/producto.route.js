//OBTENGO EXPRESS
const express = require('express');
//OBTENGO ROUTER
const enrutador = express.Router();
//OBTENGO LA DB
const db = require('../database')


//OBTENER TODOS
enrutador.get('/producto', (req, res) => {
    //CONSULTAMOS LA DB
    db.query('SELECT * FROM producto', (err, rows) => {
        if (err) {
            console.log('Algo sucedio al realizar la consulta...')
        } else {
            //OBTENEMOS EL RESULTADO COMO JSON
            res.json(rows);
        }
    });
})

//OBTENER UNO SOLO
enrutador.get('/producto/:codigo', async (req, res) => {
    //CONSULTAMOS LA DB
    const id = req.params.codigo
    await db.query('SELECT * FROM producto WHERE id_producto = ?', [id], (err, rows) => {
        if (err) {
            return console.log('Algo sucedio al realizar la consulta...')
        } else {
            //OBTENEMOS EL RESULTADO COMO JSON
            res.json(rows[0]);
        }
    });
})

//ELIMINAR
enrutador.delete('/producto/:codigo', async (req, res) => {
    const id = req.params.codigo
    await db.query('DELETE FROM producto WHERE id_producto = ?', [id], (err, res) => {
        if (err) {
            return console.log('ALGO HA OCURRIDO')
        } else {
            res.json('OPERACION EXITOSA!!!')
        }
    });
})

//CARGAR
enrutador.post('/producto/', async (req, res) => {
    const unProducto = req.body;
    await db.query('INSERT INTO producto SET ?', [unProducto], (err, res) => {
        if (err) {
            return console.log('ALGO OCURRIO CON LA CARGA')
        } else {
            res.json("CARGA EXITOSA!!!")
        }
    });
})


enrutador.put('/producto/:codigo', async (req, res) => {
    const id = req.params.codigo;
    const prodModificado = req.body;
    await db.query('UPDATE its.producto SET ? WHERE id_producto = ?', [prodModificado, id], (err, res) => {
        if (err) {
            return console.log('HA OCURRIDO UN PROBLEMA')
        } else {
            //console.log('OPERACION EXITOSA!!!')
            res.json('OPERACION EXITOSA!!!');
        }
    });
});

module.exports = enrutador;