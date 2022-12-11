const express = require('express');
const app = express();
const router = express.Router();
const tradeController = require('../controllers/tradeController');

router.post('/confirm', tradeController.getTradeInfo);

module.exports = router;