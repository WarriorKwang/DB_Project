const express = require('express');
const modifyModel = require('../models/articleModifyModel');

exports.modifyArticlePost = (req, res)=>{
    let idx = req.params.page;
    let stock_code = req.body.stock_code;
    let title = req.body.title;
    let datas = [stock_code, title, content, id];
    modifyModel.modifyArticlePost(datas, ()=>{
        res.redirect('/article/'+idx);  // 수정한 글로 이동
    });
}