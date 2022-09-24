const Usuario = require('../models/usuario')
const { request, response } = require('express')
/**
 * Crea un usuario
 */
const createUsuario = async (req = request, 
    res = response) => {
    try{
        const data = req.body
        const email = data.email
        console.log(data)
        const usuarioBD = await Usuario.findOne({ email })
        if(usuarioBD){
            return res.status(400).json({msg: 'Ya existe usuario'})
        }
        const usuario = new Usuario(data)
        console.log(usuario)
        await usuario.save()
        return res.status(201).json(usuario)
    }catch(e){
        console.log(e)
        return res.status(500).json({e})
    }
}

/**
 * Consulta todos los usuarios
 */
const getUsuarios = async (req = request, 
    res = response) => {
    try{
        console.log(req.query)
        const estado = req.query.estado
        const query = { estado: estado }
        const usuarios = await Usuario.find(query)
        return res.json(usuarios)
    }catch(e){
        return res.status(500).json({msj: e})
    }
}

/**
 *  Consulta un usuario por su ID
 */
const getUsuarioByID = async (req = request, 
    res = response) => {
    try{
        const id = req.params.id
        const filter = { _id: id}
        const usuarioDB = await Usuario.findOne(filter)
        return res.json(usuarioDB)
    }catch(e){
        return res.status(500).json({msj: e})
    }
}

/**
 * Actualiza un usuario por su ID
 */
const updateUsuarioByID = async (req = request, 
    res = response) => {
    try{
        const id = req.params.id
        const data = req.body
        console.log(data)
        console.log(id)
        data.fechaActualizacion = new Date()
        console.log(data)
        const usuario = await Usuario.findByIdAndUpdate(id, data, {new: true})
        return res.status(201).json(usuario)
    }catch(e){
        return res.status(500).json({msj: e})
    }  
}

/**
 * Borra un usuario por su ID
 */
const deleteUsuarioByID = async (req = request, 
    res = response) => {
    try{
        const id = req.params.id
        const usuarioBD = await Usuario.findById(id)
        if(!usuarioBD){
            return res.status(404).json({msj: 'No existe usuario'})
        }
        await Usuario.findByIdAndDelete(id)
        return res.status(204).json({msj: 'Borrado '})
    }catch(e){
        return res.status(500).json({msj: e})
    }
}

module.exports = { 
    createUsuario, 
    getUsuarios, 
    getUsuarioByID,
    updateUsuarioByID,
    deleteUsuarioByID
}
