const express = require('express');
const app = express();
const router = express.Router();
const articleController = require('../controllers/articleController');

router.post('/list', articleController.getList);
router.delete('/:article_idx', articleController.deleteArticle);
router.get('/:article_idx', articleController.getArticle);
router.put('/', articleController.updateArticle);
router.post('/', articleController.writeArticle);


module.exports = router;