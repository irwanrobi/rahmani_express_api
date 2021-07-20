import express from 'express';
import { isAuthenticated } from '../middleware/authJWT.js'

import { register, login } from '../controllers/authController.js';

import { validateUserRegister, validateUserLogin } from '../validations/userValidator.js'

const router = express.Router();

router.post('/login', validateUserLogin, login);
router.post('/register', validateUserRegister, isAuthenticated, register);

export default router;