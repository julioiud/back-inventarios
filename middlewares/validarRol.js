const { response, request } = require("express");

const esAdmin = (req = request, 
    res = response, next) => {
    //next: callback -> continuar con el sig middleware o método
    if(!req.user){
        return res.status(500).json({
            msg: 'Debe validar el token'
        })
    }
    const { rol } = req.user
    if(rol !== 'ADMIN'){
        return res.status(403).json({
            msg: 'No permitido'
        })
    }
    next()
}

module.exports = {
    esAdmin
}