const { Router } = require('express')
const { 
    createUsuario, 
    getUsuarios, 
    getUsuarioByID,
    updateUsuarioByID,
    deleteUsuarioByID
} = require('../controllers/usuario')

const router = Router()

/**
 * Crea un usuario
 */
router.post('/', createUsuario)

/**
 * Consulta todos los usuarios
 */
router.get('/', getUsuarios)

/**
 *  Consulta un usuario por su ID
 */
router.get('/:id', getUsuarioByID)

/**
 * Actualiza un usuario por su ID
 */
router.put('/:id', updateUsuarioByID)

/**
 * Borra un usuario por su ID
 */
router.delete('/:id', deleteUsuarioByID)

module.exports = router

