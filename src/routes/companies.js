const router = require('express').Router()
const CompanyController = require('../controllers/CompanyController')
const isAuthorized = require('../middlewares/isAuthorized')

router.post('/', isAuthorized, CompanyController.create)
router.delete('/:id', isAuthorized, CompanyController.delete)
router.get('/', isAuthorized, CompanyController.getAll)
router.get('/:id', isAuthorized, CompanyController.get)
router.put('/:id', isAuthorized, CompanyController.update)
module.exports = router
