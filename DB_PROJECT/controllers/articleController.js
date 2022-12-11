const express = require('express');
const articleModel = require('../models/articleModel');

exports.getList = async (req, res, next)=>{
    const stock_code = req.body.stock_code;
    let title = '%' + req.body.title + '%';
    const page = req.body.page;
    let articleCount = await articleModel.getArticleCount(stock_code, title);
    let list = await articleModel.getList(page, stock_code, title);
    let pagination = await articleModel.getPagination(articleCount, parseInt(page));

    let result = {
        'articleList': list,
        'pageLookup': pagination
    }
    
    res.json(result);
}

exports.getFilteredList = (req, res, next) => {
  let key = req.body.key;
  articleModel.getFilteredList(key, function (result) {
    res.send(result);
  });
};

exports.writeArticle = (req, res) => {
  if (req.session.user_id != null) {
    let stock_code = req.body.stock_code;
    let title = req.body.title;
    let content = req.body.content;
    let id = req.session.user_id;
    let topic = req.body.topic;
    let datas = [stock_code, id, title, content, topic];
    articleModel.writeArticlePost(datas, function (result) {
      res.sendStatus(result);
    });
  } else {
    res.sendStatus(400);
  }
};
exports.updateArticle = (req, res) => {
  if (req.session.user_id != null) {
    let id = req.session.user_id;
    let article_id = req.body.article_id;
    let stock_code = req.body.stock_code;
    let title = req.body.title;
    let content = req.body.content;
    let topic = req.body.topic;

    let datas = [stock_code, title, content, topic, article_id, id];
    articleModel.UpdateArticlePost(datas, function (result) {
      res.sendStatus(result);
    });
  } else {
    res.sendStatus(400);
  }
};


exports.deleteArticle = function (req, res) {
  if (req.session.user_id != null) {
    let id = req.session.user_id;
    let post_idx = req.params.article_idx;
    let datas = [id, post_idx];
    articleModel.deleteArticlePost(datas, function (result) {
      res.sendStatus(result);
    });
  } else {
    res.sendStatus(400);
  }
};

exports.getArticle = function (req, res) {
  let idx = req.params.article_idx;
  articleModel.getArticlePost(idx, function (result) {
    res.send(result);
  });
};
