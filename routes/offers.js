import express from 'express';
import { isAuthenticated } from '../middleware/authJWT.js';

import { getOffers, getOffer, createOffer, updateOffer, deleteOffer } from '../controllers/offersController.js';

import { validateOffer } from '../validations/offersValidator.js'

const router = express.Router();

router.get('/', isAuthenticated, getOffers);
router.post('/', validateOffer, createOffer);
router.get('/:id', isAuthenticated, getOffer);
router.patch('/:id', isAuthenticated, updateOffer);
router.delete('/:id', isAuthenticated, deleteOffer);

export default router;