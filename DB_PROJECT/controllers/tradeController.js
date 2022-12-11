const express = require('express');
const tradeModel = require('../models/tradeModel');


exports.getTradeInfo = async (req, res, next)=>{
    try {
        if(req.body.stock_code === undefined)
            return res.status(400).send('Bad Request');
        let BuyOrder = await tradeModel.getRecentBuyOrder(req.body.stock_code);
        let SellOrder = await tradeModel.getRecentSellOrder(req.body.stock_code);

        return res.json({BuyOrder, SellOrder})
    } catch {
        res.status(500).send('Internal Server Error');
    }
}