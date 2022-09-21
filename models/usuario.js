const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre estado requerido']
    },
    email: {
        type: String,
        required: [true, 'Email requerido'],
        unique: true
    },
    estado:{
        type: Boolean,
        default: true,
        required: true
    },
    fechaCreacion:{
        type: Date,
        default: new Date()
    },
    fechaActualizacion:{
        type: Date,
        default: new Date()
    }
})

module.exports = model('Usuario', UsuarioSchema)