const express = require('express');
const stockModel = require('../models/stockModel');

class Mutex {
    constructor() {this.lock = false;}
    async acquire() {
        while (true) {
            if (this.lock === false) break;
            await sleep(100);
        }
        this.lock = true;
    }
    release() {this.lock = false;}
}

exports.getStockList = async (req, res, next)=>{
    let idx = req.body.page;

    let stockCount = await stockModel.getStockCount();

    let stock_list = await stockModel.getStockList(idx)
    let pagination = await stockModel.getPagination(stockCount, parseInt(idx));

    let result = {
        'stockList': stock_list,
        'pageLookup': pagination
    }

    res.json(result);
}

exports.getStockInfo = (req, res, next)=>{
    let stock_code = req.body.stock_code;
    
    stockModel.getInfo(stock_code, function(rows){
        res.send(rows);
    })
}

exports.getStockPrice = function(req, res, next){
    let stock_code = req.body.stock_code;
    stockModel.getPrice(stock_code, function(rows){
        res.send(rows);
    })
}

exports.tradeStock = async (req, res, next)=>{
    try{
        if(req.session.user_id === undefined || req.body.trade === undefined || req.body.stock_code === undefined ||
            req.body.order_amount === undefined || req.body.order_price === undefined)
                return res.status(400).send('Bad Request');
        let trade = req.body.trade;
        let user_id = req.session.user_id;
        let stock_code = req.body.stock_code;
        let order_amount = req.body.order_amount;
        let order_price = req.body.order_price;
        let OrderData = [user_id, stock_code, order_amount, order_price, order_amount]
        if(trade == 'sell')   //sell
        {
            let existedSellUserstock = await stockModel.getSellUserStock(user_id, stock_code); //주식 보유 수 가져옴 
            if(existedSellUserstock.hold_amount < order_amount) //가지고있는 주식보다 주문량이 더 많음
                return res.status(400).send('Bad Request');
            else
            { 
            await stockModel.sellOrder(OrderData);  //판매 요청
            if(existedSellUserstock[0].hold_amount == order_amount) 
                await stockModel.deleteSellUserStock(user_id, stock_code); //보유 수와 판매 수가 같으면 삭제
            else
                await stockModel.updateSellUserStock(order_amount, existedSellUserstock[0].all_price_bought,
                         existedSellUserstock[0].hold_amount, user_id, stock_code ); //다르면 변경
            }
        }
        else if(trade == 'buy')       //buy
        {
            let user_money = await stockModel.getUserMoney(user_id);
            if(user_money < order_price* order_amount)  //가지고 있는 돈보다 구매하는 금액이 더 큼
                return res.status(400).send('Bad Request');
            else{
                await stockModel.updateBuyUserMoney(order_amount*order_price, user_id);  //유저가 구매시 보유 자산 감소
                await stockModel.buyOrder(OrderData); //구매 요청
            }
        }
        await stockModel.beginTransaction();
        for(var i=0; i<req.body.order_amount; i++) //요청한 주문이 매칭되면 처리
        {
            let matchTrade = await stockModel.matchTrade(); //matching되는 주문 가져오기

            if(matchTrade.length)   //matching 되는 주문 있을시
            {
                let confirmed_amount = 0;
                if(matchTrade[0].buy_amount >= matchTrade[0].sell_amount)   //구매 수량 >= 판매 수량
                    confirmed_amount = matchTrade[0].sell_amount; //체결 수량 = 판매 수량
                else    //구매 수량 < 판매 수량
                    confirmed_amount = matchTrade[0].buy_amount; //체결 수량 = 거래 수량
                let unconfirmed_buy_amount = matchTrade[0].buy_amount - confirmed_amount;  //미체결 구매 수량 = 구매 수량 - 체결 수량 
                let unconfirmed_sell_amount = matchTrade[0].sell_amount - confirmed_amount; //미체결 판매 수량 = 판매 수량 - 체결 수량
                await stockModel.updateBuy([unconfirmed_buy_amount, matchTrade[0].order_buy_idx]);  //구매 주문 체결량 update
                let existedBuyUserstock = await stockModel.getBuyUserStock(matchTrade[0].buy_user_id, matchTrade[0].stock_code); //유저가 주식을 이미 보유하고 있는지 확인
                if(existedBuyUserstock.length) 
                    await stockModel.updateBuyUserStock([confirmed_amount,confirmed_amount*matchTrade[0].order_price, matchTrade[0].buy_user_id, matchTrade[0].stock_code]); //이미 존재시 변경
                else
                    await stockModel.insertBuyUserStock(matchTrade[0].buy_user_id, matchTrade[0].stock_code, matchTrade[0].buy_amount, confirmed_amount*matchTrade[0].order_price); //없을 시 추가

                
                await stockModel.updateSell([unconfirmed_sell_amount, matchTrade[0].order_sell_idx]); //판매 주문 체결량 update
                await stockModel.updateSellUserMoney(confirmed_amount*matchTrade[0].order_price, matchTrade[0].sell_user_id);  //유저가 판매시 보유 자산 증가              
                
                await stockModel.tradeConfirmed([matchTrade[0].order_buy_idx, matchTrade[0].order_sell_idx, confirmed_amount]); //체결된 주문 insert
            }   
            else
                break; //체결할 거래가 없으면 break
        }
        await stockModel.commit();
        res.send('주문이 완료되었습니다.');
        } catch {   
            await stockModel.rollback();
            return res.status(500).send('Internal Server Error');
    }
}


exports.getHotStock = (req, res, next)=>{
    try {
        stockModel.getHotStock(function(stat, result){
            res.status(stat).send(result)
        });

    } catch {
        res.status(400).send('Bad Request');
    }
}

exports.getChangingStock = async (req, res, next) => {
    try {
        let upstock = await stockModel.getUpStock();
        let downstock = await stockModel.getDownStock();
        let result = {
            'upstock' : upstock,
            'downstock' : downstock
        }
        return res.json(result);
    } catch {
      res.status(500).send('Internal Server Error');
    }
};

exports.stockUpdate = async (req, res, next) => {
    try {
        if (req.body.submit_type === undefined || req.body.stock_code === undefined || req.body.stock_name === undefined 
            || req.body.cop_info === undefined || req.body.market === undefined || req.body.stock_amount === undefined) 
            return res.status(400).send('Bad Request');
        console.log(req.body)
        let result;
        if(req.body.submit_type === "edit")
            result = await stockModel.updateStock(req.body.stock_name, req.body.stock_amount, req.body.cop_info, req.body.market, req.body.stock_code);
        else if(req.body.submit_type === "submit")
        {
            stock = await stockModel.insertStock(req.body.stock_code, req.body.stock_name, req.body.stock_amount, req.body.cop_info, req.body.market);
            stockHolder = await stockModel.insertStockHolder(req.body.stock_code, '없음', '0', '0');
            result = {"stock" : stock, "stockHolder" : stockHolder};
        }
        return res.status(200).json(result);
    } catch {
      res.status(500).send('Internal Server Error');
    }
};

exports.searchStockName = async (req, res, next)=>{
    try {
        if (req.body.keyword === undefined || req.body.page === undefined)
            return res.status(400).send('Bad Request');
        let keyword = "%" + req.body.keyword + "%";
        let stockCount = await stockModel.getSearchStockCount(keyword);
        let stock_list = await stockModel.getSearchStockList(keyword, req.body.page);
        let pagination = await stockModel.getPagination(stockCount, parseInt(req.body.page));
        let result = {
            'stockList': stock_list,
            'pageLookup': pagination
        }
        res.json(result);
    }catch{
        res.status(500).send('Internal Server Error');
    }
}