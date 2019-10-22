const router = require('express').Router()
const UserController = require('../controllers/UserController')
const isAuthorized = require('../middlewares/isAuthorized')

router.post('/', UserController.create)
router.get('/', UserController.getAll)
router.delete('/:id', UserController.delete)
router.put('/current', isAuthorized, UserController.updateCurrent)
router.put('/:id', UserController.update)
router.get('/:id', UserController.get)

module.exports = router
