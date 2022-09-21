const { Router } = require('express')
const { 
    createMarca, 
    getMarcas, 
    getMarcaByID,
    updateMarcaByID,
    deleteMarcaByID
}= require('../controllers/marca')

const router = Router()

/**
 * Crea una marca
 */
router.post('/', createMarca)

/**
 * Consulta todas las marcas
 */
router.get('/', getMarcas)

/**
 *  Consulta una marca por su ID
 */
router.get('/:id', getMarcaByID)

/**
 * Actualiza una marca por su ID
 */
router.put('/:id', updateMarcaByID)

/**
 * Borra una marca por su ID
 */
router.delete('/:id', deleteMarcaByID)

module.exports = router

