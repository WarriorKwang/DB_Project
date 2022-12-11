require('dotenv').config();
const maria = require('mysql');
const dbConfig = require('../config/database');
const conn = maria.createConnection(dbConfig);

module.exports.getUserStockPrice = (user_id, callback) => {
  return new Promise((resolve, reject) => {
    let sql =
      'SELECT I.cop_name,  t1.hold_amount, t1.all_price, t1.all_price_bought, t1.all_price-t1.all_price_bought AS change_price, ROUND((t1.all_price/t1.all_price_bought - 1)100, 1) AS change_rate FROM STOCK_INFO AS I INNER JOIN (SELECT U.stock_code, P.close_price U.hold_amount AS all_price, U.hold_amount, U.all_price_bought FROM USER_OWN_STOCK AS U INNER JOIN STOCK_PRICE AS P ON U.stock_code = P.stock_code WHERE id = ? and P.price_date IN ( SELECTFROM(SELECT DISTINCT(price_date) FROM STOCK_PRICE ORDER BY price_date DESC LIMIT 1) as tmp))as t1 ON I.stock_code = t1.stock_code';
    conn.query(sql, user_id, (err, rows, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports.getUserList = () => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM USER_INFO \
    WHERE permission != 0 AND permission != 2';

    conn.query(sql, (err, rows, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports.getUserStockTotalPrice = (user_id, callback) => {
  return new Promise((resolve, reject) => {
    let sql =
      'SELECT SUM(t1.all_price) AS total_price, SUM(t1.all_price_bought) AS total_change_price, ROUND((SUM(t1.all_price)/SUM(t1.all_price_bought) - 1)100, 1) AS total_change_rate FROM STOCK_INFO AS I INNER JOIN (SELECT U.stock_code, P.close_price * U.hold_amount AS all_price, U.hold_amount, U.all_price_bought FROM USER_OWN_STOCK AS U INNER JOIN STOCK_PRICE AS P ON U.stock_code = P.stock_code WHERE id =? and P.price_date IN ( SELECT*FROM(SELECT DISTINCT(price_date) FROM STOCK_PRICE ORDER BY price_date DESC LIMIT 1) as tmp))as t1 ON I.stock_code = t1.stock_code';
    conn.query(sql, user_id, (err, rows, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports.getUserStock = (user_id) => {
  return new Promise((resolve, reject) => {
      let sql = 'SELECT I.stock_code, I.cop_name AS stock_name, t1.hold_amount AS stock_count, t1.close_price AS price, ROUND((t1.all_price/t1.all_price_bought - 1) * 100, 1) AS diff \
          FROM STOCK_INFO AS I INNER JOIN \
              (SELECT U.stock_code, P.close_price, P.close_price * U.hold_amount AS all_price, U.hold_amount, U.all_price_bought\
              FROM USER_OWN_STOCK AS U INNER JOIN STOCK_PRICE AS P ON U.stock_code = P.stock_code\
              WHERE id = ? and P.price_date IN \
                  ( SELECT * FROM\
                      (SELECT DISTINCT(price_date) \
                      FROM STOCK_PRICE \
                      ORDER BY price_date DESC \
                      LIMIT 1) as tmp))as t1 ON I.stock_code = t1.stock_code';
      conn.query(sql, user_id, (err, rows, fields)=>{
          if(err) reject(err);
          resolve(rows);
      });
  })
}

module.exports.getUserMoney = (user_id) => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT money FROM USER_INFO WHERE id = ?';

    conn.query(sql, user_id, (err, rows, fields) => {
      if (err) reject(err);
      resolve(rows[0].money);
    });
  });
};

module.exports.getUserGroupStock = (user_id) => {
  return new Promise((resolve, reject) => {
    let sql =
      'SELECT G.group_name, G.stock_code, S.cop_name, S.market, S.price, S.diff, S.volume\
                    FROM USER_GROUP_STOCK AS G INNER JOIN \
                        (SELECT stock_code, cop_name, market, close_price AS price, ROUND((1-close_price / y_close_price) * 100,2) AS diff, volume\
                        FROM \
                            (SELECT I.stock_code, I.cop_name, I.market, P.close_price, P.volume \
                            FROM STOCK_INFO AS I INNER JOIN STOCK_PRICE AS P ON I.stock_code=P.stock_code \
                            WHERE price_date \
                                IN ( SELECT * FROM\
                                    (SELECT price_date \
                                    FROM STOCK_PRICE \
                                    ORDER BY price_date DESC \
                                    LIMIT 1) as tmp)) t1\
                                        NATURAL JOIN \
                                    (SELECT I.stock_code, P.close_price AS y_close_price \
                                    FROM STOCK_INFO AS I INNER JOIN STOCK_PRICE AS P ON I.stock_code=P.stock_code \
                                    WHERE price_date IN \
                                    ( SELECT * FROM(SELECT DISTINCT(price_date) \
                                    FROM STOCK_PRICE \
                                    ORDER BY price_date DESC\
                                    LIMIT 1,1) as tmp)) t2) S \
                                    ON G.stock_code = S.stock_code \
                    WHERE G.id = ?';
    conn.query(sql, user_id, (err, rows, fields) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

module.exports.setUserGroupStock = (
  stock_code,
  user_id,
  group_name = 'default'
) => {
  return new Promise((resolve, reject) => {
    let sql = 'INSERT INTO USER_GROUP_STOCK(id, stock_code) VALUES (?, ?)';
    conn.query(sql, [user_id, stock_code], (err, rows, fields) => {
      if (err) reject(err);
      resolve('즐겨찾기 추가 성공');
    });
  });
};

module.exports.deleteUserGroupStock = (stock_code, user_id) => {
  return new Promise((resolve, reject) => {
    let sql = 'DELETE FROM USER_GROUP_STOCK WHERE id = ? and stock_code = ?';
    conn.query(sql, [user_id, stock_code], (err, rows, fields) => {
      if (err) reject(err);
      resolve('즐겨찾기 삭제 성공');
    });
  });
};

module.exports.getUserInfo = (user_id) => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT id AS user_id, user_name, birthday, phone_number, mail_addr, money, permission\
    FROM USER_INFO WHERE id = ?';
    conn.query(sql, user_id, (err, rows, fields) => {
      if (err) reject(err);
      console.log(rows[0])
      resolve(rows[0]);
    });
  });
};


module.exports.updateUserInfo = (user_id, phone_number, mail_addr, user_name, birthday) => {
  return new Promise((resolve, reject) => {
    let sql = ' UPDATE USER_INFO \
    SET phone_number = ?, mail_addr = ?, user_name = ?, birthday = ?\
    WHERE id = ?';
    conn.query(sql, [phone_number, mail_addr, user_name, birthday, user_id], (err, rows, fields) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

module.exports.checkId = (user_id) => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT EXISTS(SELECT * FROM USER_INFO WHERE id = ?) as exist_id';
    conn.query(sql, user_id, (err, rows, fields) => {
      if (err) reject(err);
      resolve(rows[0]);
    });
  });
};

module.exports.signUp = (datas) => {
  return new Promise((resolve, reject) => {
    let sql =
      'INSERT INTO USER_INFO(id, pw, user_name, birthday, phone_number, mail_addr) VALUES (?,?,?,?,?,?)';
    conn.query(sql, datas, (err, rows, fields) => {
      console.log(err)
      if (err) reject(err);
      resolve('회원 가입 성공');
    });
  });
};

module.exports.approveUser = function(datas, callback){
  let sql ='UPDATE USER_INFO SET permission = 1 WHERE user_name = ? AND id = ?';
  conn.query(sql, datas, function(err, result){
      if (err) callback(400);
      else callback(200);
  });
}

module.exports.declineUser = function(datas, callback){
  let sql = 'DELETE FROM USER_INFO WHERE user_name = ? AND id = ?';
  conn.query(sql, datas, function(err, result){
      if (err) callback(400);
      else callback(200);
  });
}

module.exports.getUpUserStock = (user_id) => {
  return new Promise ((resolve, reject) => {
      let sql = 'SELECT U.stock_code AS code, cop_name AS name, market, close_price AS price, ROUND((1-close_price / y_close_price) * 100,2) AS diff, volume \
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
                  ) t2 INNER JOIN USER_OWN_STOCK AS U ON t2.stock_code = U.stock_code\
      WHERE ROUND((1-close_price / y_close_price) * 100,2) >= 0 and U.id = ?\
      ORDER BY diff DESC'
      conn.query(sql, user_id, (err, rows, fields)=>{
          if(err) {
            console.log(err)
              reject(err);
          } else {
              resolve(rows);
          }
      })
  })
}

module.exports.getDownUserStock = (user_id) => {
  return new Promise ((resolve, reject) => {
      let sql = 'SELECT U.stock_code AS code, cop_name AS name, market, close_price AS price, ROUND((1-close_price / y_close_price) * 100,2) AS diff, volume \
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
                  ) t2 INNER JOIN USER_OWN_STOCK AS U ON t2.stock_code = U.stock_code\
      WHERE ROUND((1-close_price / y_close_price) * 100,2) < 0 and U.id = ?\
      ORDER BY diff ASC'
      conn.query(sql, user_id, (err, rows, fields)=>{
          if(err) {
              reject(err);
          } else {
              resolve(rows);
          }
      })
  })
}

module.exports.pending = () => {
  return new Promise((resolve, reject) => {
      let sql = 'SELECT id, user_name\
      FROM USER_INFO\
      where permission = 0';
      conn.query(sql, (err, rows, fields)=>{
          if(err) reject(err);
          resolve(rows);
      });
  })
}

exports.notCheckedBuyOrder = (user_id) => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT O.order_idx, I.cop_name AS stock_name, O.order_amount, O.order_price\
                FROM TRADE_BUY_ORDER AS O INNER JOIN STOCK_INFO AS I ON O.stock_code = I.stock_code\
                WHERE O.checked = 0 and O.unconfirmed_amount = 0 and O.user_id = ?';
    conn.query(sql, user_id, (err, rows, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

exports.notCheckedSellOrder = (user_id) => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT O.order_idx, I.cop_name AS stock_name, O.order_amount, O.order_price\
    FROM TRADE_SELL_ORDER AS O INNER JOIN STOCK_INFO AS I ON O.stock_code = I.stock_code\
    WHERE O.checked = 0 and O.unconfirmed_amount = 0 and O.user_id = ?';
    conn.query(sql, user_id, (err, rows, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

exports.checkBuyOrder = (order_idx) => {
  return new Promise((resolve, reject) => {
    let sql = 'UPDATE TRADE_BUY_ORDER SET checked = 1 WHERE order_idx = ?';
    conn.query(sql, order_idx, (err, rows, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

exports.checkSellOrder = (order_idx) => {
  return new Promise((resolve, reject) => {
    let sql = 'UPDATE TRADE_SELL_ORDER SET checked = 1 WHERE order_idx = ?';
    conn.query(sql, order_idx, (err, rows, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

exports.deposit = (money, user_id) => {
  return new Promise((resolve, reject) => {
    let sql = 'UPDATE USER_INFO SET money = money + ? WHERE id = ?';
    conn.query(sql, [money, user_id], (err, rows, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};