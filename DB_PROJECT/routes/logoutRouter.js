const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
  delete req.session.user_id;
  delete req.session.permission;
  res.sendStatus(200);
})

module.exports = router;

