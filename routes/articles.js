const express = require('express');
const uploadHelper = require('../helpers/uploadHelper');
const { isAuthenticated } = require('../middleware/authJWT');
const { getArticles, getArticle, createArticle, updateArticle, deleteArticle } = require('../controllers/articlesController');
const { validateArticle } = require('../validations/articlesValidator');
const router = express.Router();

router.get('/', getArticles);
router.post('/', uploadHelper, validateArticle, isAuthenticated, createArticle);
router.get('/:id', getArticle);
router.patch('/:id', uploadHelper, validateArticle, isAuthenticated, updateArticle);
router.delete('/:id', isAuthenticated, deleteArticle);

module.exports = router;
