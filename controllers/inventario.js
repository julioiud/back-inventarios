const Inventario = require('../models/inventario')
const { request, response } = require('express')
const Usuario = require('../models/usuario')
const Marca = require('../models/marca')
// Para subida de foto
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

/**
 * Consulta todos los inventarios
 */
const getInventarios = async (req, res = response) => {
    try{
        const inventarios = await Inventario.find()
        .populate({
            path: 'usuario',
            match: { estado: true}
        })
        .populate({
            path: 'marca',
            match: { estado: true}
        })
        .populate({
            path: 'estado'
        })
        .populate({
            path: 'tipoEquipo'
        })
        // TODO: Hacer el Join
        res.json(inventarios)
    }catch(e){
        console.log(e)
        return res.status(500).json({
            error: 'Error: ' + e
        })
    }
}

/**
 * Guardar un inventario
 */
const createInventario = async (req = request, 
    res = response) => {
    try{
        const data = req.body;
        const { usuario, marca } = data;
        // validamos si usuario está activo
        const usuarioBD = await Usuario.findOne({
            _id: usuario._id, estado: true
        })
        console.log('usuario retornado', usuarioBD)
        if(!usuarioBD){
            return res.status(400).json({
                msj: 'No existe usuario'
            })
        }
        // validamos si marca está activa
        const marcaBD = await Marca.findOne({
            _id: marca._id, estado: true
        })
        if(!marcaBD){
            return res.status(400).json({
                msj: 'No existe marca'
            })
        }
        const inventario = new Inventario(data)
       // console.log(inventario)
        await inventario.save()
        res.status(201).json(inventario)
    }catch(e){
        console.log(e)
        return res.status(500).json({msj: 'Error'})
    }
}

/**
 * Consulta inventario por ID
 */
 const getInventarioByID = async (req = request, 
    res = response) => {
    try{
        const { id } = req.params;
        const inventarioBD = await Inventario.findById(id)
        .populate({
            path: 'usuario',
            match: {estado: true}
        })
        res.json(inventarioBD)
    }catch(e){
        console.log(e)
        return res.status(500).json({msj: 'Error'})
    }
}
/**
 * Actualiza inventario por ID
 */
const updateInventarioByID = async (req = request, 
    res = response) => {

    try{
        const { id } = req.params
        const data = req.body
        // TODO: Coloca validaciones de usuario y marca como en crear
        const inventario  = await Inventario.findByIdAndUpdate(id, data, {new: true})
        return res.status(201).json(inventario)
    }catch(e){
        console.log(e)
        return res.status(500).json({msj: 'Error'}) 
    }

}

/**
 * Borra inventario por ID
 */
const deleteInventarioByID = async (req = request, 
    res = response) => {
    try{
        const { id } = req.params
        await Inventario.findByIdAndDelete(id, {new: true})
        return res.status(204).json({})
    }catch(e){
        console.log(e)
        return res.status(500).json({msj: 'Error'}) 
    }
}
/**
 * Subir foto por ID
 */

 const uploadImageByID = async (req = request, res = response) => {
    const { id } = req.params;
    const invBD = await Inventario.findOne({ _id: id});
    if(!invBD){
        return res.status(400).json({
             msg: 'No existe inventario'
        });
    }
    if(!req.files || Object.keys(req.files) == 0 || !req.files.foto){
       return res.status(400).json({msj: 'Sin fotos para subir'});
    }
    const foto = req.files.foto;

    const extFileArray = foto.name.split('.');
    const extFile = extFileArray[extFileArray.length - 1];

    const extensiones = ['jpg', 'png', 'jpeg'];

    if(!extensiones.includes(extFile)){
        return res.status(400).json({msj: 'Archivo no válido'});
    }

    const nombreFileTemp = uuidv4() + "." + extFile;

    const uploadPath = path.join(__dirname, '../uploads/', nombreFileTemp);
    foto.mv(uploadPath, e => {
        if(e){
            return res.status(500).json({e});
        }
    });
    const data = {};
    data.foto = nombreFileTemp;
    // TODO: borrar la foto VIEJA
    const inv = await Inventario.findByIdAndUpdate(id, data, {new : true});
    if(!inv){
        return res.status(500).send(e);
    }
    res.json({msj: 'Subido a ' + uploadPath});
}


/**
 * Consultar foto
 */
 const getImageByID = async (req = request, res = response) => {
    const { id } = req.params;
    const inventarioBD = await Inventario.findOne({ _id: id});
    // TODO: VALIDAR QUE NO EXISTE
    const nombreFoto = inventarioBD.foto;
    const pathImg =  path.join(__dirname, '../uploads/', nombreFoto);
    if(fs.existsSync(pathImg))
        res.sendFile(pathImg);
}

module.exports = {
    getInventarios,
    createInventario,
    getInventarioByID,
    updateInventarioByID,
    deleteInventarioByID,
    uploadImageByID,
    getImageByID
}