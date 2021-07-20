import express from 'express';
import { isAuthenticated } from '../middleware/authJWT.js';

import { getRoles, createRole, deleteRole } from '../controllers/rolesController.js';

import { validateRole } from '../validations/rolesValidator.js'

const router = express.Router();

router.get('/', isAuthenticated, getRoles);
router.post('/', validateRole, isAuthenticated, createRole);
router.delete('/:id', isAuthenticated, deleteRole);

export default router;