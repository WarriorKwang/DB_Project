require('dotenv').config();
const maria = require('mysql');
const dbConfig = require('../config/database')
const conn = maria.createConnection(dbConfig);


module.exports.getRecentBuyOrder = (stock_code) => {
    return new Promise((resolve, reject) => {
        let sql =   'SELECT MAX(order_time) AS buy_order_time, order_amount AS buy_order_amount,\
                    unconfirmed_amount AS buy_unconfirmed_amount, order_price AS buy_order_price\
                    FROM TRADE_BUY_ORDER\
                    WHERE stock_code = ?';
        conn.query(sql, stock_code, (err, rows, fields)=>{
            if(err) reject(err);
            resolve(rows);
        });
    })
}

module.exports.getRecentSellOrder = (stock_code) => {
    return new Promise((resolve, reject) => {
        let sql =   'SELECT order_time AS sell_order_time, order_amount AS sell_order_amount ,\
                    unconfirmed_amount AS sell_unconfirmed_amount, order_price AS sell_order_price\
                    FROM TRADE_SELL_ORDER\
                    WHERE stock_code = ?';
        conn.query(sql, stock_code, (err, rows, fields)=>{
            if(err) reject(err);
            resolve(rows);
        });
    })
}