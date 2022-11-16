const express = require('express');
const app = express();
const router = express.Router();
const articleListController = require('../controllers/articleListController');
const articleReadController = require('../controllers/articleReadController');
const articleWriteController = require('../controllers/articleWriteController');

router.get('/list', articleListController.getArticleFirstPage);
router.get('/list/:page', articleListController.getArticleList);
router.get('/:article_idx', articleReadController.getArticlePage);

// router.get('/page', articleListController.getArticleFirstPage);
// router.get('/page/:page', articleListController.getArticleList);
// router.get('/:page',articleReadController.getArticlePage);
// router.get('/write', articleWriteController.writeArticlePost); // 동작 확인 해봐야함
// router.get('/modify/:page');
module.exports = router;