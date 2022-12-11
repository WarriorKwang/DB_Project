const bcrypt = require('bcryptjs');

const express = require('express');
const loginModel = require('../models/loginModel');


exports.login = function(req, res){
    const {id, pw} = req.body;

    try {
        loginModel.login([id, pw], function(result){
            if(result.length === 0)
                res.status(400).send('존재하지 않는 ID');
            else{
                if(id == result[0].id && bcrypt.compareSync(pw, result[0].pw)){
                    req.session.user_id = result[0].id;
                    req.session.permission = result[0].permission;
                    res.json({
                        'user_id': result[0].id,
                        'user_name': result[0].user_name,
                        'permission': result[0].permission,
                    });
                }
                else{
                    res.status(400).send('비밀번호가 틀렸습니다.');
                }
            }
        });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

exports.tempReq = async (req, res, next)=>{
    try {
        if (req.body.id === undefined || req.body.user_name === undefined || req.body.phone_num === undefined )
            return res.status(400).send('Bad Request');
        let checkPw = await loginModel.findPw(req.body.id, req.body.user_name, req.body.phone_num);
        console.log(checkPw)
        if(checkPw.length)
        {
            let target = req.body.id + req.body.user_name + req.body.phone_num;
            console.log(target)
            let key = bcrypt.hashSync(target, 10);
            console.log('df')

            return res.json(key);
        }
        else{
            return res.status(400).json('인증 실패');
        }
    }catch{
        res.status(500).send('Internal Server Error');
    }
  }
  
  exports.setPw = async (req, res, next)=>{
    try {
        if (req.body.id === undefined || req.body.pw === undefined || req.body.key === undefined )
            return res.status(400).send('Bad Request');
        let checkKey = await loginModel.getUserInfo(req.body.id);
        if(checkKey.length)
        {
            let id = checkKey[0].id;
            let user_name = checkKey[0].user_name;
            let phone_num = checkKey[0].phone_number;
            
            let target = id + user_name + phone_num;
            console.log('dflkas')
            if(bcrypt.compareSync(target, req.body.key))
            {
                let result = await loginModel.setPw(bcrypt.hashSync(req.body.pw,10), checkKey[0].id);
                console.log('dhi')
                return res.json(result);
            }
            else{
                console.log("fail")
                return res.status(400).send('Bad Request');
            }
        }
        else
            return res.status(400).send('Bad Request');
    }catch{
        res.status(500).send('Internal Server Error');
    }
  }