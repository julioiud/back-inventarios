const { Router } = require('express')

const { 
    getInventarios,
    createInventario,
    getInventarioByID,
    updateInventarioByID,
    deleteInventarioByID,
    uploadImageByID,
    getImageByID
} = require('../controllers/inventario')

const router = Router()

router.get('/', getInventarios)

router.post('/', createInventario)

router.get('/:id', getInventarioByID)

router.put('/:id', updateInventarioByID)

router.delete('/:id', deleteInventarioByID)
/**
* Sube foto de inventario
*/
router.post('/:id/images', uploadImageByID);

/**
* get foto de inventario
*/
router.get('/:id/images', getImageByID);

module.exports = router