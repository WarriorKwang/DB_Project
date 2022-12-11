const express = require('express');
const app = express();
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/info', userController.getUserInfo);
router.put('/info', userController.UpdateUserInfo);
router.get('/info/pending', userController.pending);
router.get('/list', userController.getUserList);

router.get('/stock/confirmed', userController.notCheckedOrder);
router.post('/stock/confirmed/check', userController.checkOrder);
router.get('/stock/own', userController.getUserOwnStock);
router.post('/stock/group',userController.setUserGroupStock);
router.get('/stock/group/list', userController.getUserGroupStock);
router.delete('/stock/group/:code',userController.deleteUserGroupStock);
router.get('/stock/:stock_code', userController.getUserStock);

router.post('/deposit', userController.deposit);
router.post('/signup', userController.signUp);
router.get('/money', userController.getUserMoney)
router.post('/approve', userController.approveUser);
router.post('/decline', userController.declineUser);
router.get('/hober', userController.getChangingStock);


router.get('/info/pending', userController.pending);


module.exports = router;