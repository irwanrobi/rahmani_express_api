import express from 'express';
import uploadHelper from '../helpers/uploadHelper.js';
import { isAuthenticated } from '../middleware/authJWT.js';

import { getArticles, getArticle, createArticle, updateArticle, deleteArticle } from '../controllers/articlesController.js';

import { validateArticle } from '../validations/articlesValidator.js'

const router = express.Router();

router.get('/', getArticles);
router.post('/', uploadHelper, validateArticle, isAuthenticated, createArticle);
router.get('/:id', getArticle);
router.patch('/:id', uploadHelper, validateArticle, isAuthenticated, updateArticle);
router.delete('/:id', isAuthenticated, deleteArticle);

export default router;
