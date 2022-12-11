const bcrypt = require('bcryptjs');

const express = require('express');
const userModel = require('../models/userModel');

exports.getUserInfo = async (req, res, next) => {
  try {
    if (req.session.user_id === undefined)
      //세션 수정
      return res.status(400).send('Bad Request');
    let result = await userModel.getUserInfo(req.session.user_id);
    return res.json(result);
  } catch {
    res.status(500).send('Internal Server Error');
  }
};

exports.getUserList = async (req, res, next) => {
  try {
    let result = await userModel.getUserList();
    return res.json(result);
  } catch {
    res.status(500).send('Internal Server Error');
  }
}

exports.UpdateUserInfo = async (req, res, next) => {
  try {
    if (
      req.session.user_id === undefined ||
      req.body.user_name === undefined ||
      req.body.phone_number === undefined ||
      req.body.mail_addr === undefined ||
      req.body.birthday === undefined
    )
      return res.status(400).send('Bad Request');
    let result = await userModel.updateUserInfo(
      req.session.user_id,
      req.body.phone_number,
      req.body.mail_addr,
      req.body.user_name,
      req.body.birthday
    );
    return res.json(result);
  } catch {
    res.status(500).send('Internal Server Error');
  }
};

exports.getUserOwnStock = async (req, res, next) => {
  try {
    if (req.session.user_id === undefined)
      return res.status(400).send('Bad Request');

    let own_stock_list = await userModel.getUserStock(req.session.user_id);
    let own_money = await userModel.getUserMoney(req.session.user_id);

    let result = {
      own_stock_list: own_stock_list,
      own_money: own_money,
    };

    return res.json(result);
  } catch {
    res.status(500).send('Internal Server Error');
  }
};

exports.getUserGroupStock = async (req, res, next) => {
  try {
    if (req.session.user_id === undefined)
      return res.status(400).send('Bad Request');

    let userGroupStock = await userModel.getUserGroupStock(req.session.user_id);

    return res.json(userGroupStock);
  } catch {
    res.status(500).send('Internal Server Error');
  }
};

exports.setUserGroupStock = async (req, res, next) => {
  try {
    if (req.body.code === undefined || req.session.user_id === undefined)
      return res.status(400).send('Bad Request');
    let result = await userModel.setUserGroupStock(
      req.body.code,
      req.session.user_id
    );
    return res.json(result);
  } catch {
    res.status(500).send('Internal Server Error');
  }
};

exports.deleteUserGroupStock = async (req, res, next) => {
  try {
    if (req.params.code === undefined || req.session.user_id === undefined)
      return res.status(400).send('Bad Request');
    let result = await userModel.deleteUserGroupStock(
      req.params.code,
      req.session.user_id
    );
    return res.json(result);
  } catch {
    res.status(500).send('Internal Server Error');
  }
};

exports.signUp = async (req, res, next) => {
  try {
    if (
      req.body.id == undefined ||
      req.body.pw == undefined ||
      req.body.user_name == undefined ||
      req.body.phone_number == undefined ||
      req.body.mail_addr == undefined
    )
      return res.status(400).send('Bad Request');

    var datas = [
      req.body.id,
      bcrypt.hashSync(req.body.pw,10),
      req.body.user_name,
      req.body.birthday,
      req.body.phone_number,
      req.body.mail_addr,
    ];
    let checkId = await userModel.checkId(datas[0]);
    if (checkId.exist_id != 0) return res.status(400).send('아이디 중복');

    let result = await userModel.signUp(datas);
    res.status(200).send(result);
  } catch {
    res.status(500).send('Internal Server Error');
  }
};

exports.getUserMoney = async (req, res, next) => {
  try {
    if (req.session.user_id === undefined)
      return res.status(400).send('Bad Request');
    let result = await userModel.getUserMoney(req.session.user_id);
    return res.json(result);
  } catch {
    res.status(500).send('Internal Server Error');
  }
};

// specific stock
exports.getUserStock = async (req, res, next) => {
  try {
    if (req.session.user_id === undefined)
      return res.status(400).send('Bad Request');

    let result = await userModel.getUserStock(req.session.user_id);

    let target_stock;
    result.map((stock) => {
      if (stock.stock_code === req.params.stock_code) target_stock = stock;
    });

    if (target_stock === undefined) return res.status(400).send('Bad Request');
    else return res.json(target_stock);
  } catch {
    res.status(500).send('Internal Server Error');
  }
};

exports.approveUser = function (req, res) {
  if (req.session.permission == 2) {
    let user_name = req.body.user_name;
    let id = req.body.id;
    let datas = [user_name, id];
    userModel.approveUser(datas, function (result) {
      res.status(result);
    });
  } else {
    res.status(400);
  }
};

exports.declineUser = function (req, res) {
  if (req.session.permission === 2) {
    let user_name = req.body.user_name;
    let id = req.body.id;
    let datas = [user_name, id];
    userModel.declineUser(datas, function (result) {
      res.status(result);
    });
  } else {
    res.status(400);
  }
};

exports.getChangingStock = async (req, res, next) => {
  try {
    if (req.session.user_id === undefined)
      return res.status(400).send('Bad Request');
    let upstock = await userModel.getUpUserStock(req.session.user_id);
    let downstock = await userModel.getDownUserStock(req.session.user_id);
    return res.json({ upstock: upstock, downstock: downstock });
  } catch {
    res.status(500).send('Internal Server Error');
  }
};

exports.pending = async (req, res, next) => {
  try {
    let result = await userModel.pending();
    return res.json(result);
  } catch {
    res.status(500).send('Internal Server Error');
  }
};

exports.notCheckedOrder = async (req, res, next) => {
  try {
    if (req.session.user_id === undefined)
      return res.status(400).send('Bad Request');
    let buylist = await userModel.notCheckedBuyOrder(req.session.user_id);
    let selllist = await userModel.notCheckedSellOrder(req.session.user_id);
    let result = {
      buylist: buylist,
      selllist: selllist,
    };
    res.json(result);
  } catch {
    res.status(500).send('Internal Server Error');
  }
};

exports.checkOrder = async (req, res, next) => {
  try {
    if (req.body.order_idx === undefined || req.body.order_type === undefined)
      return res.status(400).send('Bad Request');
    if (req.body.order_type === 'buy')
      result = await userModel.checkBuyOrder(req.body.order_idx);
    else if (req.body.order_type === 'sell')
      result = await userModel.checkSellOrder(req.body.order_idx);
    else return res.status(400).send('Bad Request');
    return res.json(result);
  } catch {
    res.status(500).send('Internal Server Error');
  }
};

exports.deposit = async (req, res, next)=>{
  try {
      if (req.body.user_id === undefined || req.body.money === undefined )
          return res.status(400).send('Bad Request');
      let result = await userModel.deposit(req.body.money, req.body.user_id);
      return res.json(result);
  }catch{
      res.status(500).send('Internal Server Error');
  }
}