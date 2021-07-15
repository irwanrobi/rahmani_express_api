import express from 'express';
import uploadHelper from '../helpers/uploadHelper.js'

import { getArticles, getArticle, createArticle, updateArticle, deleteArticle } from '../controllers/articles.js';

import { validateArticle } from '../validators/articlesValidator.js'

const router = express.Router();

router.get('/', getArticles);
router.post('/', uploadHelper, validateArticle, createArticle);
router.get('/:id', getArticle);
router.patch('/:id', updateArticle);
router.delete('/:id', deleteArticle);

export default router;
