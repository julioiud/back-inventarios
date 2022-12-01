const UsuarioSys = require('../models/usuario')
const { request, response } = require('express')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
/**
 * Crea un usuarios con sus roles
 */
const register = async (req = request, 
    res = response) => {
        //destructuring
        const { email, password } = req.body;
     try{
        //SELECT * FROM usuariosys WHERE email = ?
        const usuarioSysBD = await UsuarioSys.findOne({email})
        // respuesta personalizada cuando email existe
        if(usuarioSysBD){
            return res.status(400).json({
                msg: 'Ya existe usuario'
            })
        }
        const usuarioSys = new UsuarioSys(req.body)
        // cifrar la contraseña antes de guardarla
        const salt = await bcryptjs.genSalt()
        const passwordEnc = bcryptjs.hashSync(password, salt)
        usuarioSys.password = passwordEnc;
        // guardo
        const usuarioSysSaved = await usuarioSys.save()
        return res.status(201).json(usuarioSysSaved)
    }catch(e){
        console.log(e)
        return res.status(500).json({e})
    }
}

/**
 * Ingresar al sistema
 */
const login = async (req = request, 
    res = response) => {
        const { email, password } = req.body;
    try{
        //SELECT * FROM usuariosys WHERE email = ?
        const usuarioSys = await UsuarioSys.findOne({email})
        // respuesta personalizada cuando email existe
        if(!usuarioSys){
            return res.status(404).json({
                msg: 'No existe usuario'
            })
        }
        if(!usuarioSys.estado){
            return res.status(401).json({
                msg: 'Usuario inactivo'
            })
        }
        const esPassword = bcryptjs.compareSync(password, usuarioSys.password)
        if(!esPassword){
            return res.status(401).json({
                msg: 'Credenciales incorrectas'
            })
        }
        const payload = {
            usuario: usuarioSys.email,
            nombre: usuarioSys.nombre,
            rol: usuarioSys.rol
        }
        const token = jwt.sign(
            payload,
            process.env.SECRET_KEY, {
                expiresIn: '1h'
            }
        );
        return res.json({usuarioSys, token})
    }catch(e){
        return res.status(500).json({msj: e})
    }
}

module.exports = { 
    register,
    login
}
