const express = require('express');
const app = express();
const router = express.Router();
const loginController = require('../controllers/loginController');

router.post('/', loginController.login);

// router.post('/', authJWT, loginController.login);   //click login button in login page
// router.post('/id', loginController.findId); //아이디 찾기 탭에 들어가서 이름과 전화번호를 입력후 아이디찾기 버튼 누를때
// router.post('/pw', loginController.findPw); //비밀번호 찾기 탭에서 아이디와 전화번호를 입력 후 비밀번호 찾기 버튼 누를때
// router.get('/id/verified', loginController.getId)//아이디 찾기에 성공시 출력되는 정보
// router.get('/pw/verified', loginController.getPw)//비밀번호 찾기에 성공시 출력되는 정보

router.post('/temp-validation', loginController.tempReq);
router.post('/reset-pw', loginController.setPw);

module.exports = router;