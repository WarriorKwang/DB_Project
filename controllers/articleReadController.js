const express = require('express');
const readModel = require('../models/articleReadModel');

exports.getArticlePage = (req, res, next)=>{
    let idx = req.params.article_idx;
    readModel.getArticlePage(idx, (result)=>{
        res.send(result);
    });
}