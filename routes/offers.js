import express from 'express';

import { getOffers, getOffer, createOffer, updateOffer, deleteOffer } from '../controllers/offers.js';

import { validateOffer } from '../validators/offersValidator.js'

const router = express.Router();

router.get('/', getOffers);
router.post('/', validateOffer, createOffer);
router.get('/:id', getOffer);
router.patch('/:id', updateOffer);
router.delete('/:id', deleteOffer);

export default router;