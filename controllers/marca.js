const Marca = require('../models/marca')
const { request, response } = require('express')
/**
 * Crea un marca de equipo
 */
const createMarca = async (req = request, 
    res = response) => {
        try{
            //console.log(req.body)
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
            const marca = new Marca(datos)
            console.log(marca)
            await marca.save()
            res.status(201).json(marca)
        }catch(e){
          console.log(e)
          return res.status(500).json({
            msg: e
          })
        }
}

/**
 * Consulta todos las marcas de equipo
 */
const getMarcas = async (req = request, 
    res = response) => {
    try{
        console.log(req.query)
        const estado = req.query.estado
        const query = { estado: estado }
        const marcas = await Marca.find(query)
        return res.json(marcas)
    }catch(e){
        return res.status(500).json({msj: e})
    }
}

/**
 *  Consulta una marca por su ID
 */
const getMarcaByID = async (req = request, 
    res = response) => {
    try{
        const id = req.params.id
        const marcaDB = await Marca.findById(id)
        return res.json(marcaDB)
    }catch(e){
        return res.status(500).json({msj: e})
    }
}

/**
 * Actualiza una marca por su ID
 */
const updateMarcaByID = async (req = request, 
    res = response) => {
    try{
        const id = req.params.id
        const data = req.body
        console.log(data)
        console.log(id)
        data.fechaActualizacion = new Date()
        console.log(data)
        const marca = await Marca.findByIdAndUpdate(id, data, {new: true})
        return res.status(201).json(marca)
    }catch(e){
        return res.status(500).json({msj: e})
    }  
}

/**
 * Borra una marca por su ID
 */
const deleteMarcaByID = async (req = request, 
    res = response) => {
        try{
            const id = req.params.id
            const marcaBD = await Marca.findById(id)
            if(!marcaBD){
                return res.status(404).json({msj: 'No existe marca'})
            }
            await Marca.findByIdAndDelete(id)
            return res.status(204).json({})
        }catch(e){
            return res.status(500).json({msj: e})
        }
}

module.exports = { 
    createMarca, 
    getMarcas, 
    getMarcaByID,
    updateMarcaByID,
    deleteMarcaByID
}
