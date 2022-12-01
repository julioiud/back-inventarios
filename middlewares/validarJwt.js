const { response, request } = require("express");
const jwt = require('jsonwebtoken')

const validarJwt = (req = request, 
    res = response, next) => {
    //next: callback -> continuar con el sig middleware o método
    const token = req.header('access-token')
    console.log(token)
    if(!token){
        return res.status(401).json({
            msg: 'No tiene token'
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