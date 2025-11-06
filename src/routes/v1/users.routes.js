const { Router } = require('express');
const usersController = require('../../controllers/users.controller');
const { validateCreateUser, validateLogin } = require('../../validators/users.validator');

const router = Router();

router.get('/', usersController.listUsers);
router.post('/', validateCreateUser, usersController.createUser);
router.post('/login', validateLogin, usersController.login);

module.exports = router;
