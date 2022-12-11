const express = require('express');
const app = express();
const router = express.Router();
const joinController = require('../controllers/joinController');

router.post('/join', joinController.join);

module.exports = router;