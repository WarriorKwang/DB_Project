const express = require('express');
const app = express();
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/', commentController.postComment);
router.get('/:article_idx', commentController.getComments);
router.delete('/:comment_idx', commentController.deleteComment);
router.put('/', commentController.updateComment);


module.exports = router;