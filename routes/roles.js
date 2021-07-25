const express = require('express');
const { isAuthenticated } = require('../middleware/authJWT');

const { getRoles, createRole, deleteRole } = require('../controllers/rolesController');

const { validateRole } = require('../validations/rolesValidator');

const router = express.Router();

router.get('/', isAuthenticated, getRoles);
router.post('/', validateRole, isAuthenticated, createRole);
router.delete('/:id', isAuthenticated, deleteRole);

module.exports = router;