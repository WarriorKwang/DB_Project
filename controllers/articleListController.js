const listModel = require('../models/articleListModel');
const express = require('express');

exports.getArticleList = (req, res, next)=>{
    let idx = req.params.page;
    listModel.getArticleList(idx, (result)=>{
        res.send(result);
    });
}

exports.getArticleFirstPage = (req, res)=>{
    res.redirect('/article/page/1');
}