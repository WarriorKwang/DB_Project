const express = require('express');
const app = express();
const router = express.Router();
const articleListController = require('../controllers/articleListController');

// router.get('/page', (req, res)=>{
//     res.send('article page');
// });
router.get('/page', articleListController.getArticleFirstPage);
router.get('/page/:page', articleListController.getArticleList);
router.get('/:page')

module.exports = router;