const router = require('express').Router()
const userController = require('../controllers/userController')

router.get('/', userController.index)
router.post('/',userController.store)

module.exports = router