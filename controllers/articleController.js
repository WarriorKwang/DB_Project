const express = require('express');
const articleModel = require('../models/articleModel');

// exports.getList = (req, res, next)=>{
//     let idx = req.params.page;
//     articleModel.getArticleList(idx, (result)=>{
//         res.send(result);
//     });
// }

exports.getList = (req, res, next)=>{
    let stockIdx = req.body.stockIdx;
    let pageIdx = req.body.pageIdx;
    
    if(stockIdx == 0){
        articleModel.getAllList(pageIdx, (result)=>{

        })
    }

}

exports.update = (req, res)=>{
    let idx = req.params.page;
    let stock_code = req.body.stock_code;
    let title = req.body.title;
    let datas = [stock_code, title, content, id];
    // 추가 해야함
}

exports.write = (req, res)=>{
    let stock_code = req.body.stock_code;
    let id = req.body.id;
    let title = req.body.title;
    let content = req.body.content;
    let datas = [stock_code, id, title, content];
    // 추가 해야함
}

exports.getPage = (req, res)=>{
    let currentPage = req.body.page;
    let articleCount;
    let articlePerPage = 10;
    articleModel.getPage((result)=>{
        articleCount = result;
        let maxPage = ((articleCount - 1)/articlePerPage) + 1;
        let beginPage = (articleCount < 3) ? 1 : currentPage - 2;
        let endPage = (beginPage + 4 > maxPage) ? maxPage : beginPage + 4;
        let pagingResult = new Object();
        pagingResult.bottom = beginPage;
        pagingResult.top = endPage;
    });
}