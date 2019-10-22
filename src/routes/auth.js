const router = require('express').Router()
const AuthController = require('../controllers/AuthController')

router.post('/signin', AuthController.authenticate)

module.exports = router
