require('dotenv').config();
const maria = require('mysql');
const dbConfig = require('../config/database');
const conn = maria.createConnection(dbConfig);

module.exports.beginTransaction = () => {
  return new Promise ((resolve, reject) => {
      resolve(conn.beginTransaction())
  });
}
module.exports.commit = () => {
  return new Promise ((resolve, reject) => {
    resolve(conn.commit())
  });
}
module.exports.rollback = () => {
  return new Promise ((resolve, reject) => {
    resolve(conn.rollback())
  });
}

module.exports.getStockList = (idx) => {
  return new Promise((resolve, reject) => {
    let startIdx = 10 * (idx - 1);
    if (idx != 0) {
      let sql =
        'SELECT stock_code AS code, cop_name AS name, market, close_price AS price, \
          ROUND((close_price / y_close_price-1) * 100,2) AS diff, volume \
        FROM \
          (SELECT I.stock_code, I.cop_name, I.market, P.close_price, P.volume \
          FROM STOCK_INFO AS I INNER JOIN STOCK_PRICE AS P ON I.stock_code=P.stock_code \
          WHERE price_date IN \
            ( SELECT*FROM\
              (SELECT price_date \
                FROM STOCK_PRICE \
                ORDER BY price_date DESC \
                LIMIT 1) as tmp)) \
            t1 NATURAL JOIN \
            (SELECT I.stock_code, P.close_price AS y_close_price \
              FROM STOCK_INFO AS I INNER JOIN STOCK_PRICE AS P ON I.stock_code=P.stock_code \
              WHERE price_date IN \
                ( SELECT*FROM\
                  (SELECT DISTINCT(price_date) \
                  FROM STOCK_PRICE ORDER BY price_date DESC \
                  LIMIT 1,1) as tmp) ) \
            t2 \
        ORDER BY volume DESC LIMIT ?,10;';
      conn.query(sql, startIdx, (err, rows, fields) => {
        if (err) reject(err);
        else resolve(rows);
      });
    } else {
      let sql =
        'SELECT stock_code AS code, cop_name AS name, market, close_price AS price, ROUND((close_price / y_close_price-1) * 100,2) AS diff, volume \
                      FROM ( \
                          SELECT I.stock_code, I.cop_name, I.market, P.close_price, P.volume \
                          FROM STOCK_INFO AS I INNER JOIN STOCK_PRICE AS P ON I.stock_code=P.stock_code \
                          WHERE price_date =ANY ( \
                              SELECT * \
                              FROM ( \
                                  SELECT price_date \
                                  FROM STOCK_PRICE \
                                  ORDER BY price_date DESC \
                                  LIMIT 1 \
                                  ) as tmp) \
                              ) t1 NATURAL JOIN ( \
                                  SELECT I.stock_code, P.close_price AS y_close_price \
                                  FROM STOCK_INFO AS I INNER JOIN STOCK_PRICE AS P ON I.stock_code=P.stock_code \
                                  WHERE price_date =ANY ( \
                                      SELECT * \
                                      FROM ( \
                                          SELECT DISTINCT(price_date) \
                                          FROM STOCK_PRICE \
                                          ORDER BY price_date DESC \
                                          LIMIT 1, 1 \
                                          ) as tmp) \
                                      ) t2 \
                                      ORDER BY name DESC;';
      conn.query(sql, (err, rows, fields) => {
        if (err) reject(err);
        else resolve(rows);
      });
    }
  });
};

exports.getStockCount = () => {
  return new Promise((resolve, reject) => {
    let sql =
      'SELECT COUNT(*) as list \
                  FROM STOCK_INFO';
    conn.query(sql, (err, rows, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows[0].list);
      }
    });
  });
};


exports.getPagination = (stockCount, curPage) => {
  return new Promise((resolve, erject) => {
    let maxPage = parseInt((stockCount - 1) / 10) + 1;
    let beginPage = curPage < 3 ? 1 : curPage - 2;
    let endPage = beginPage + 4 > maxPage ? maxPage : beginPage + 4;

    let data = new Object();

    data.bottom = beginPage;
    data.top = endPage;
    data.cur = parseInt(curPage);

    resolve(data);
  });
};

module.exports.getPrice = (stock_code) => {
  return new Promise ((resolve, reject) => {
      let sql = 
      'SELECT price_date, open_price, max_price, min_price, close_price, volume\
      FROM STOCK_PRICE WHERE stock_code = ? \
      ORDER BY price_date';
      conn.query(sql, stock_code, (err, rows, fields)=>{
          if(err) {
              reject(err);
          } else {
              resolve(rows);
          }
      })
  })
}

module.exports.getStock = (stock_code) => {
  return new Promise ((resolve, reject) => {
      let sql = 
      'SELECT I.cop_name, I.stock_amount, I.cop_info, I.market, H.stockholder_name, \
        H.stock_amount AS stock_holding_amount, H.stock_holding_ratio \
      FROM STOCK_INFO AS I INNER JOIN STOCKHOLDER AS H ON I.stock_code = H.stock_code\
      WHERE I.stock_code = ?';
      conn.query(sql, stock_code, (err, rows, fields)=>{
          if(err) {
              reject(err);
          } else {
              resolve(rows);
          }
      })
  })
}

module.exports.buyOrder = (OrderData) => {
  return new Promise ((resolve, reject) => {
      let sql = 
      'INSERT INTO TRADE_BUY_ORDER(user_id,stock_code,order_amount,order_price,unconfirmed_amount)\
      VALUES (?, ?, ?, ?, ?)';
      conn.query(sql, OrderData, (err, rows, fields)=>{
          if(err) {
              
              reject(err);
          } else {
              resolve(rows);
          }
      })
  })
}

module.exports.sellOrder = (OrderData) => {
  return new Promise ((resolve, reject) => {
      let sql = 
      'INSERT INTO TRADE_SELL_ORDER(user_id,stock_code,order_amount,order_price,unconfirmed_amount)\
      VALUES (?, ?, ?, ?, ?)';
      conn.query(sql, OrderData, (err, rows, fields)=>{
          if(err) {
              
              reject(err);
          } else {
              resolve(rows);
          }
      })
  })
}


module.exports.matchTrade = () => {
  return new Promise ((resolve, reject) => {
      let sql = 
      'SELECT B.stock_code, B.order_price, B.user_id AS buy_user_id, \
        S.user_id AS sell_user_id, B.unconfirmed_amount AS buy_amount, \
        S.unconfirmed_amount AS sell_amount, B.order_idx AS order_buy_idx, S.order_idx AS order_sell_idx \
      FROM TRADE_BUY_ORDER AS B INNER JOIN TRADE_SELL_ORDER AS S ON B.stock_code = S.stock_code \
        AND B.order_price = S.order_price \
      WHERE B.unconfirmed_amount > 0 AND S.unconfirmed_amount > 0 \
      ORDER BY B.order_time ASC, S.order_time ASC \
      LIMIT 1';
      conn.query(sql, (err, rows, fields)=>{
          if(err) {
              
              reject(err);
          } else {
              resolve(rows);
          }
      })
  })
}

module.exports.updateBuy = (updateBuyData) => {
  return new Promise ((resolve, reject) => {
      let sql = 'UPDATE TRADE_BUY_ORDER SET unconfirmed_amount = ? WHERE order_idx = ?';
      conn.query(sql, updateBuyData, (err, rows, fields)=>{
          if(err) {
              
              reject(err);
          } else {
              resolve(rows);
          }
      })
  })
}

module.exports.updateSell = (updateSellData) => {
  return new Promise ((resolve, reject) => {
      let sql = 'UPDATE TRADE_SELL_ORDER SET unconfirmed_amount = ? WHERE order_idx = ?';
      conn.query(sql, updateSellData, (err, rows, fields)=>{
          if(err) {
              
              reject(err);
          } else {
              resolve(rows);
          }
      })
  })
}

module.exports.updateBuyUserMoney = (total_price, buy_user_id) => {
  return new Promise ((resolve, reject) => {
      let sql = 'UPDATE USER_INFO SET money = money - ? WHERE id = ?';
      conn.query(sql, [total_price,buy_user_id], (err, rows, fields)=>{
          if(err) {
              reject(err);
          } else {
              resolve(rows);
          }
      })
  })
}

module.exports.updateSellUserMoney = (total_price, sell_user_id) => {
  return new Promise ((resolve, reject) => {
      let sql = 'UPDATE USER_INFO SET money = money + ? WHERE id = ?';
      conn.query(sql, [total_price, sell_user_id], (err, rows, fields)=>{
          if(err) {
              reject(err);
          } else {
              resolve(rows);
          }
      })
  })
}

module.exports.getBuyUserStock = (buy_user_id, trade_stock_code) => {
  return new Promise ((resolve, reject) => {
      let sql = 'SELECT * FROM USER_OWN_STOCK WHERE id = ? and stock_code = ?';
      conn.query(sql, [buy_user_id, trade_stock_code], (err, rows, fields)=>{
          if(err) {
              reject(err);
          } else {
              resolve(rows);
          }
      })
  })
}

module.exports.updateBuyUserStock = (buyUserData) => {
  return new Promise ((resolve, reject) => {
      let sql = 
      'UPDATE USER_OWN_STOCK \
      SET hold_amount = hold_amount + ?, all_price_bought = all_price_bought + ? \
      WHERE id = ? and stock_code = ?';
      conn.query(sql, buyUserData, (err, rows, fields)=>{
          if(err) {
              
              reject(err);
          } else {
              resolve(rows);
          }
      })
  })
}

module.exports.insertBuyUserStock = (buy_user_id, trade_stock_code, buy_amount, total_price) => {
  return new Promise ((resolve, reject) => {
      let sql = 'INSERT INTO USER_OWN_STOCK VALUES(?, ?, ?, ?)';
      conn.query(sql, [buy_user_id, trade_stock_code, buy_amount, total_price], (err, rows, fields)=>{
          if(err) {
              
              reject(err);
          } else {
              resolve(rows);
          }
      })
  })
}

module.exports.getSellUserStock = (sell_user_id, trade_stock_code) => {
  return new Promise ((resolve, reject) => {
      let sql = 'SELECT hold_amount, all_price_bought FROM USER_OWN_STOCK WHERE id = ? and stock_code = ?';
      conn.query(sql, [sell_user_id, trade_stock_code], (err, rows, fields)=>{
          if(err) {
              
              reject(err);
          } else {
              resolve(rows);
          }
      })
  })
}

module.exports.deleteSellUserStock = (sell_user_id, trade_stock_code) => {
  return new Promise ((resolve, reject) => {
      let sql = 'DELETE FROM USER_OWN_STOCK WHERE id = ? and stock_code = ?';
      conn.query(sql, [sell_user_id, trade_stock_code], (err, rows, fields)=>{
          if(err) {
              
              reject(err);
          } else {
              resolve(rows);
          }
      })
  })
}

module.exports.updateSellUserStock = (confirmed_amount, all_price_bought, hold_amount, sell_user_id, trade_stock_code) => {
  return new Promise ((resolve, reject) => {
      let sql = 'UPDATE USER_OWN_STOCK\
      SET hold_amount = hold_amount - ?, all_price_bought = all_price_bought - ?/?*? \
      WHERE id = ? and stock_code = ?';
      conn.query(sql, [confirmed_amount, all_price_bought, hold_amount,confirmed_amount, 
          sell_user_id, trade_stock_code], (err, rows, fields)=>{
          if(err) {
              reject(err);
          } else {
              resolve(rows);
          }
      })
  })
}

module.exports.tradeConfirmed = (tradeData) => {
  return new Promise ((resolve, reject) => {
      let sql = 'INSERT INTO TRADE_CONFIRMED(order_buy_idx, order_sell_idx, trade_amount) VALUES (?, ?, ?)';
      conn.query(sql, tradeData, (err, rows, fields)=>{
          if(err) {
              reject(err);
          } else {
              resolve(rows);
          }
      })
  })
}



module.exports.getUserStock = (user_id, stock_code) => {
  return new Promise ((resolve, reject) => { 
      let sql = 'SELECT hold_amount FROM USER_OWN_STOCK WHERE id = ? and stock_code = ?';
      conn.query(sql, [user_id, stock_code], (err, rows, fields)=>{
          if(err) {
              reject(err);
          } else {
              resolve(rows);
          }
      })
  })
}

module.exports.getUserMoney = (user_id) => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT money FROM USER_INFO WHERE id = ?';
    conn.query(sql, user_id, (err, rows, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};



module.exports.getHotStock = (callback) => {
  conn.query(
    'SELECT B.stock_code AS stockCode, I.cop_name AS name \
    FROM STOCK_INFO AS I INNER JOIN BOARD_ARTICLE AS B ON I.stock_code = B.stock_code \
    GROUP BY B.stock_code \
    HAVING COUNT(B.stock_code) >= 1\
    ORDER BY COUNT(B.stock_code) DESC \
    LIMIT 5',
    function (err, rows) {
      if (err) {
        callback(400, '에러');
      } else {
        callback(200, rows);
      }
    }
  );
};

module.exports.getInfo = function(stock_code, callback){
  let sql = 'SELECT I.stock_code, I.cop_name, I.stock_amount, I.cop_info, I.market, H.stockholder_name,\
              H.stock_amount AS stock_holding_amount, H.stock_holding_ratio \
            FROM STOCK_INFO AS I INNER JOIN STOCKHOLDER AS H ON I.stock_code = H.stock_code \
            WHERE I.stock_code = ? \
            ORDER BY H.stock_holding_ratio DESC \
            LIMIT 1';
  conn.query(sql, stock_code, function(err, rows){
    if(err) 
      return callback(400, '에러');
    callback(rows[0]);
  })
}

module.exports.getPrice = (stock_code, callback) => {
  let sql = 'SELECT price_date, open_price, max_price, min_price, close_price, volume FROM STOCK_PRICE WHERE stock_code = ? ORDER BY price_date';
  conn.query(sql, stock_code, function(err, rows){
      callback(rows);
  });
  
}

module.exports.getUpStock = () => {
  return new Promise ((resolve, reject) => {
      let sql = 
      'SELECT stock_code AS code, cop_name AS name, market, close_price AS price,\
       ROUND((close_price / y_close_price -1) * 100,2) AS diff, volume \
      FROM ( \
          SELECT I.stock_code, I.cop_name, I.market, P.close_price, P.volume \
          FROM STOCK_INFO AS I INNER JOIN STOCK_PRICE AS P ON I.stock_code=P.stock_code \
          WHERE price_date IN ( \
              SELECT * \
              FROM ( \
                  SELECT price_date \
                  FROM STOCK_PRICE \
                  ORDER BY price_date DESC \
                  LIMIT 1 \
                  ) as tmp) \
              ) t1 NATURAL JOIN ( \
                  SELECT I.stock_code, P.close_price AS y_close_price \
                  FROM STOCK_INFO AS I INNER JOIN STOCK_PRICE AS P ON I.stock_code=P.stock_code \
                  WHERE price_date IN ( \
                      SELECT * \
                      FROM ( \
                          SELECT DISTINCT(price_date) \
                          FROM STOCK_PRICE \
                          ORDER BY price_date DESC \
                          LIMIT 1, 1 \
                      ) as tmp) \
                  ) t2\
      WHERE ROUND((1-close_price / y_close_price) * 100,2) >= 1\
      ORDER BY diff DESC\
      LIMIT 10'
      conn.query(sql, (err, rows, fields)=>{
          if(err) {
              reject(err);
          } else {
              resolve(rows);
          }
      })
  })
}

module.exports.getDownStock = () => {
  return new Promise ((resolve, reject) => {
      let sql = 
      'SELECT stock_code AS code, cop_name AS name, market, close_price AS price,\
       ROUND((close_price / y_close_price-1) * 100,2) AS diff, volume \
      FROM ( \
          SELECT I.stock_code, I.cop_name, I.market, P.close_price, P.volume \
          FROM STOCK_INFO AS I INNER JOIN STOCK_PRICE AS P ON I.stock_code=P.stock_code \
          WHERE price_date IN ( \
              SELECT * \
              FROM ( \
                  SELECT price_date \
                  FROM STOCK_PRICE \
                  ORDER BY price_date DESC \
                  LIMIT 1 \
                  ) as tmp) \
              ) t1 NATURAL JOIN ( \
                  SELECT I.stock_code, P.close_price AS y_close_price \
                  FROM STOCK_INFO AS I INNER JOIN STOCK_PRICE AS P ON I.stock_code=P.stock_code \
                  WHERE price_date IN ( \
                      SELECT * \
                      FROM ( \
                          SELECT DISTINCT(price_date) \
                          FROM STOCK_PRICE \
                          ORDER BY price_date DESC \
                          LIMIT 1, 1 \
                      ) as tmp) \
                  ) t2\
      WHERE ROUND((1-close_price / y_close_price) * 100,2) <= -1\
      ORDER BY diff ASC\
      LIMIT 10'
      conn.query(sql, (err, rows, fields)=>{
          if(err) {
              reject(err);
          } else {
              resolve(rows);
          }
      })
  })
}

module.exports.updateStock = (stock_name, stock_amount, cop_info, market, stock_code) => {
  return new Promise ((resolve, reject) => {
      let sql = 'UPDATE STOCK_INFO \
        SET cop_name = ?, stock_amount = ?, cop_info = ?, market = ? \
        WHERE stock_code = ?';
      conn.query(sql, [stock_name, stock_amount, cop_info, market, stock_code], (err, rows, fields)=>{
          if(err) {
              reject(err);
          } else {
              resolve('성공');
          }
      })
  })
}

module.exports.insertStock = (stock_code, stock_name, stock_amount, cop_info, market) => {
  return new Promise ((resolve, reject) => {
      let sql = 'INSERT INTO STOCK_INFO\
      VALUES(?,?,?,?,?)';
      console.log(stock_code, stock_name, stock_amount, cop_info, market);
      conn.query(sql, [stock_code, stock_name, stock_amount, cop_info, market], (err, rows, fields)=>{
          if(err) {
              reject(err);
          } else {
              resolve('성공');
          }
      })
  })
}

module.exports.insertStockHolder = (stock_code, stockholder_name, stock_amount, stock_holding_ratio) => {
  return new Promise ((resolve, reject) => {
      let sql = 'INSERT INTO STOCKHOLDER\
      VALUES(?,?,?,?)';
      conn.query(sql, [stock_code, stockholder_name, stock_amount, stock_holding_ratio], (err, rows, fields)=>{
          if(err) {
              reject(err);
          } else {
              resolve('주주 추가 성공');
          }
      })
  })
}

module.exports.getSearchStockList = (keyword, idx) => {
  return new Promise((resolve, reject) => {
    let startIdx = 10 * (idx - 1);
    if (idx != 0) {
      let sql =
      'SELECT stock_code AS code, cop_name AS name, market, close_price AS price, \
        ROUND((close_price / y_close_price-1) * 100,2) AS diff, volume \
      FROM \
        (SELECT I.stock_code, I.cop_name, I.market, P.close_price, P.volume \
        FROM STOCK_INFO AS I INNER JOIN STOCK_PRICE AS P ON I.stock_code=P.stock_code \
        WHERE price_date IN \
          ( SELECT*FROM\
            (SELECT price_date \
              FROM STOCK_PRICE \
              ORDER BY price_date DESC \
              LIMIT 1) as tmp)) \
            t1 NATURAL JOIN \
              (SELECT I.stock_code, P.close_price AS y_close_price \
              FROM STOCK_INFO AS I INNER JOIN STOCK_PRICE AS P ON I.stock_code=P.stock_code \
              WHERE price_date IN \
                ( SELECT*FROM\
                  (SELECT DISTINCT(price_date) \
                  FROM STOCK_PRICE \
                  ORDER BY price_date DESC \
                  LIMIT 1,1) as tmp) ) \
            t2\
      WHERE cop_name LIKE ? \
      ORDER BY volume ASC;'
      
      conn.query(sql, [keyword, startIdx], (err, rows, fields) => {
        if (err) reject(err);
        else resolve(rows);
      });
    } else {
      let sql =
        'SELECT stock_code AS code, cop_name AS name, market, close_price AS price, ROUND((close_price / y_close_price-1) * 100,2) AS diff, volume \
                      FROM ( \
                          SELECT I.stock_code, I.cop_name, I.market, P.close_price, P.volume \
                          FROM STOCK_INFO AS I INNER JOIN STOCK_PRICE AS P ON I.stock_code=P.stock_code \
                          WHERE price_date IN ( \
                              SELECT * \
                              FROM ( \
                                  SELECT price_date \
                                  FROM STOCK_PRICE \
                                  ORDER BY price_date DESC \
                                  LIMIT 1 \
                                  ) as tmp) \
                              ) t1 NATURAL JOIN ( \
                                  SELECT I.stock_code, P.close_price AS y_close_price \
                                  FROM STOCK_INFO AS I INNER JOIN STOCK_PRICE AS P ON I.stock_code=P.stock_code \
                                  WHERE price_date IN ( \
                                      SELECT * \
                                      FROM ( \
                                          SELECT DISTINCT(price_date) \
                                          FROM STOCK_PRICE \
                                          ORDER BY price_date DESC \
                                          LIMIT 1, 1 \
                                          ) as tmp) \
                                      ) t2 \
                                      WHERE cop_name LIKE ?\
                                      ORDER BY volume ASC;';
      conn.query(sql, keyword, (err, rows, fields) => {
        if (err) reject(err);
        else resolve(rows);
      });
    }
  });
};

exports.getSearchStockCount = (keyword) => {
  return new Promise((resolve, reject) => {
    let sql =
      'SELECT COUNT(*) as list \
                  FROM STOCK_INFO\
                  WHERE cop_name LIKE ?';
    conn.query(sql, keyword, (err, rows, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows[0].list);
      }
    });
  });
};
