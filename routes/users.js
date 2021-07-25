const express = require('express');
const { isAuthenticated } = require('../middleware/authJWT');

const { getUsers, updateUser, deleteUser } = require('../controllers/usersController');

const router = express.Router();

router.get('/', isAuthenticated, getUsers);
router.patch('/:id', isAuthenticated, updateUser);
router.delete('/:id', isAuthenticated, deleteUser);

export default router;