const ArticleWriteController = require('../models/articleWriteModel');
const express = require('express');
const ArticleWriteModel = require("../models/articleWriteModel");

exports.writeArticlePost = (req, res)=>{
    let stock_code = req.body.stock_code;
    let id = req.body.id;
    let title = req.body.title;
    let content = req.body.content;
    let datas = [stock_code, id, title, content];
    ArticleWriteModel.writeArticlePost(datas, ()=>{
        // data를 쓴 다음?
        // article List로 가느냐? 작성한 글로 가느냐?
    });
}