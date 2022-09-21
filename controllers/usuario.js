const Usuario = require('../models/usuario')
const { request, response } = require('express')
/**
 * Crea un usuario
 */
const createUsuario = async (req = request, 
    res = response) => {
    const usuarioBD = await Usuario.findOne({ email })
    if(usuarioBD){
        return res.status(400).json({msg: 'Ya existe usuario'})
    }
    const usuario = new Usuario(req.body)
    console.log(usuario)
    await usuario.save()
    res.status(201).json(usuario)
}

/**
 * Consulta todos los usuarios
 */
const getUsuarios = () => {

}

/**
 *  Consulta un usuario por su ID
 */
const getUsuarioByID = () => {

}

/**
 * Actualiza un usuario por su ID
 */
const updateUsuarioByID = () => {

}

/**
 * Borra un usuario por su ID
 */
const deleteUsuarioByID = () => {

}

module.exports = { 
    createUsuario, 
    getUsuarios, 
    getUsuarioByID,
    updateUsuarioByID,
    deleteUsuarioByID
}
