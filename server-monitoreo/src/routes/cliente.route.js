const express = require('express');
const enrutador = express.Router();
const db = require('../database');

enrutador.get('/cliente', async (req, res) => {
    await db.query('SELECT * FROM cliente', (err, rows) => {
        if (err) {
            console.log('ERROR')
        } else {
            res.json(rows)
        }
    })
})

enrutador.delete('/cliente/:codigo', async (req, res) => {
    const id = req.params.codigo
    await db.query('DELETE FROM cliente WHERE idcliente = ?', [id], (err, result) => {
        if (err) {
            return console.log('ERROR')
        } else {
            res.json('EXITO')
        }
    })
})

enrutador.post('/cliente', async(req, res) => {
    const unCliente = req.body
    await db.query('INSERT INTO cliente SET ?', [unCliente], (err, result) => {
        if (err) {
            return console.log('ERROR')
        } else {
            res.json("EXITO")
        }
    })
})

enrutador.put('/cliente/:codigo', async (req, res) => {
    const id = req.params.codigo;
    const clienteMod = req.body;
    await db.query('UPDATE cliente SET ? WHERE idcliente = ?', [clienteMod, id], (err, result) => {
        if (err) {
            return console.log('HA OCURRIDO UN PROBLEMA')
        } else {
            res.json('OPERACION EXITOSA!!!')
        }
    })
})
module.exports = enrutador;