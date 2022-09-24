const { Router } = require('express')

const { 
    getInventarios,
    createInventario 
} = require('../controllers/inventario')

const router = Router()

router.get('/', getInventarios);

router.post('/', createInventario)

module.exports = router