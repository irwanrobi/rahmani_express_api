import express from 'express';
import { isAuthenticated } from '../middleware/authJWT.js'

import { getUsers, updateUser, deleteUser } from '../controllers/usersController.js'

const router = express.Router();

router.get('/', isAuthenticated, getUsers);
router.patch('/:id', isAuthenticated, updateUser);
router.delete('/:id', isAuthenticated, deleteUser);

export default router;