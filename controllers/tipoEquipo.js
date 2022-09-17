const TipoEquipo = require('../models/tipoEquipo')
const { request, response } = require('express')
/**
 * Crea un tipo de equipo
 */
const createTipoEquipo = async (req = request, 
    res = response) => {
    //console.log(req.body)
    const nombre = (req.body.nombre) 
    ? req.body.nombre.toUpperCase()
    : '';
    const tipoEquipoBD = await TipoEquipo.findOne({ nombre })
    if(tipoEquipoBD){
        return res.status(400).json({msg: 'Ya existe nombre'})
    }
    const datos = {
        nombre
    }
    const tipoEquipo = new TipoEquipo(datos)
    console.log(tipoEquipo)
    await tipoEquipo.save()
    res.status(201).json(tipoEquipo)
}

/**
 * Consulta todos los tipos de equipo
 */
const getTiposEquipo = () => {

}

/**
 *  Consulta un tipo de equipo por su ID
 */
const getTipoEquipoByID = () => {

}

/**
 * Actualiza un tipo de equipo por su ID
 */
const updateTipoEquipoByID = () => {

}

/**
 * Borra un tipo de equipo por su ID
 */
const deleteTipoEquipoByID = () => {

}

module.exports = { 
    createTipoEquipo, 
    getTiposEquipo, 
    getTipoEquipoByID,
    updateTipoEquipoByID,
    deleteTipoEquipoByID
}
