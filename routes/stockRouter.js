const express = require('express');
const app = express();
const router = express.Router();
const stockController = require('../controllers/stockController');

router.post('/list', stockController.getStockList);
router.get('/hot-stocks', stockController.getHotStock);
router.post('/trade', stockController.tradeStock)
router.post('/info', stockController.getStockInfo);
router.post('/price', stockController.getStockPrice);
router.post('/order', stockController.tradeStock)
router.get('/jump', stockController.getChangingStock);
router.post('/approve', stockController.stockUpdate);
router.post('/submit', stockController.stockUpdate);
router.post('/search', stockController.searchStockName);


module.exports = router;