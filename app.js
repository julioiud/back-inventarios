const express = require('express');

const app = express(); // se crea instancia de express
// TODO: importar y habilitar los cors

/**
 * importación de rutas
 */
const tipoEquipo = require('./routes/tipoEquipo')
const estado = require('./routes/estado')
const marca = require('./routes/marca')
const usuario = require('./routes/usuario')
/**
 * middlewares
 */
// TODO: middleware para urlencoded
app.use(express.json())
// TODO: middleware de subida de foto
// TODO: middleware de cors

/**
 * Utilizar sustantivos en plural para una URI
 */
app.use('/api/tipoequipos', tipoEquipo)
app.use('/api/estados', estado) 
app.use('/api/marcas', marca) 
app.use('/api/usuarios', usuario);

module.exports = app;