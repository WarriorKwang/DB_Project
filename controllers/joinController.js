const express = require('express');
const joinModel = require('../models/joinModel');

function joinFormValidation(req, res){
    if(id == undefined || pw == undefined || name == undefined || phone_number == undefined 
        || email == undefined){
            return false;
        }
    return true;
}

exports.join = (req, res)=>{
    try {
        if(joinFormValidation(req, res)){
            var datas = [req.body.id, req.body.pw, req.body.user_name, req.body.birthday, 
                req.body.phone_number, req.body.mail_addr];
            joinModel.join(datas, function(stat, result){
                res.status(stat).send(result)
            });
        } else
            res.status(400).send('Bad Request');
    } catch {
        res.status(500).send('Internal Server Error');
    }
}