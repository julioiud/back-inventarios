const Marca = require('../models/marca')
const { request, response } = require('express')
/**
 * Crea un marca de equipo
 */
const createMarca = async (req = request, 
    res = response) => {
    const nombre = (req.body.nombre) 
    ? req.body.nombre.toUpperCase()
    : '';
    const marcaBD = await Marca.findOne({ nombre })
    if(marcaBD){
        return res.status(400).json({msg: 'Ya existe nombre'})
    }
    const datos = {
        nombre
    }
    const marca = new Estado(datos)
    console.log(marca)
    await marca.save()
    res.status(201).json(marca)
}

/**
 * Consulta todos las marcas de equipo
 */
const getMarcas = () => {

}

/**
 *  Consulta una marca por su ID
 */
const getMarcaByID = () => {

}

/**
 * Actualiza una marca por su ID
 */
const updateMarcaByID = () => {

}

/**
 * Borra una marca por su ID
 */
const deleteMarcaByID = () => {

}

module.exports = { 
    createMarca, 
    getMarcas, 
    getMarcaByID,
    updateMarcaByID,
    deleteMarcaByID
}
