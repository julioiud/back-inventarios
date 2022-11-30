const { response, request } = require("express")
const jwt = require('jsonwebtoken')

const validarJwt = async (req = request, 
    res = response, next) => {
    const token = req.header('access-token')
    console.log(token)
    if(!token){
        return res.status(401).json({
            msg: 'No hay token'
        })
    }
    try{
        const payload = jwt.verify(token, process.env.SECRET_KEY)
        req.user = payload
        next()
    }catch(e){
        return res.status(401).json({
            msg: 'Token invalido'
        })  
    }
}

module.exports = validarJwt