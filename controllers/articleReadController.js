const express = require('express');
const readModel = require('../models/articleReadModel');

exports.getArticlePage = (req, res, next)=>{
    let idx = req.params.page;
    readModel.getArticlePage(idx, (result)=>{
        res.send(result);
    });
}