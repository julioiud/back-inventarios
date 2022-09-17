const { Router } = require('express')
const { 
    createTipoEquipo, 
    getTiposEquipo, 
    getTipoEquipoByID,
    updateTipoEquipoByID,
    deleteTipoEquipoByID
} = require('../controllers/tipoEquipo')

const router = Router()

/**
 * Crea un tipo de equipo
 */
router.post('/', createTipoEquipo)

/**
 * Consulta todos los tipos de equipo
 */
router.get('/', getTiposEquipo)

/**
 *  Consulta un tipo de equipo por su ID
 */
router.get('/:id', getTipoEquipoByID)

/**
 * Actualiza un tipo de equipo por su ID
 */
router.put('/:id', updateTipoEquipoByID)

/**
 * Borra un tipo de equipo por su ID
 */
router.delete('/:id', deleteTipoEquipoByID)

module.exports = router

