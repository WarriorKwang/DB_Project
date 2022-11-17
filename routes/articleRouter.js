const express = require('express');
const app = express();
const router = express.Router();
const articleController = require('../controllers/articleController');

router.get('/pages/:page', articleController.getPage);ogouter.get('/list/:page', articleController.getList);
router.get('/:article_idx', articleController.getList);

module.exports = router;