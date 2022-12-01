const { Router } = require('express')
const { register, login }= require('../controllers/auth')

const router = Router()

// TODO:  COlocarle seguridad
/**
 * Registrar usuarios
 */
router.post('/register', register)

/**
 * Login al sistema
 */
router.post('/login', login)

module.exports = router
