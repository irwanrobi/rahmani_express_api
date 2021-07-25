const express = require('express');
const { isAuthenticated } = require('../middleware/authJWT');

const { register, login } = require('../controllers/authController');

const { validateUserRegister, validateUserLogin } = require('../validations/userValidator');

const router = express.Router();

router.post('/login', validateUserLogin, login);
router.post('/register', validateUserRegister, isAuthenticated, register);

export default router;