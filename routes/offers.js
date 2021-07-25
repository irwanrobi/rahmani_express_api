const express = require('express');
const { isAuthenticated } = require('../middleware/authJWT');

const { getOffers, getOffer, createOffer, updateOffer, deleteOffer } = require('../controllers/offersController');

const { validateOffer } = require('../validations/offersValidator')

const router = express.Router();

router.get('/', isAuthenticated, getOffers);
router.post('/', validateOffer, createOffer);
router.get('/:id', isAuthenticated, getOffer);
router.patch('/:id', isAuthenticated, updateOffer);
router.delete('/:id', isAuthenticated, deleteOffer);

module.exports = router;