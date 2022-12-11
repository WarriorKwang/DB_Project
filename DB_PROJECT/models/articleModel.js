require('dotenv').config();
const maria = require('mysql');
const dbConfig = require('../config/database');
const conn = maria.createConnection(dbConfig);

exports.getList = (page, stock_code, title) => {
  return new Promise((resolve, reject) => {
    let begin_idx = 10 * (page - 1);
    
    if (stock_code != 0 && title === "%undefined%") {
      let query =
      'SELECT A.post_idx, S.cop_name, A.id, A.title, A.content, A.created_date, A.views, A.topic \
      FROM BOARD_ARTICLE AS A, STOCK_INFO AS S \
      WHERE A.stock_code = S.stock_code AND A.stock_code = ?\
      ORDER BY post_idx \
      DESC LIMIT ?, 10';
      conn.query(query, [stock_code, begin_idx], (err, rows, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    }else if(stock_code == 0 && title !== "%undefined%"){
      let query = 
      'SELECT A.post_idx, S.cop_name, A.id, A.title, A.content, A.created_date, A.views, A.topic \
      FROM BOARD_ARTICLE AS A, STOCK_INFO AS S \
      WHERE A.stock_code = S.stock_code AND A.title LIKE ?\
      ORDER BY post_idx \
      DESC LIMIT ?, 10';
      conn.query(query, [title, begin_idx], (err, rows, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    } 
    else {
      console.log('123')
      let query =
        'SELECT A.post_idx, S.cop_name, A.id, A.title, A.content, A.created_date, A.views, A.topic \
                        FROM BOARD_ARTICLE AS A, STOCK_INFO AS S \
                        WHERE A.stock_code = S.stock_code\
                        ORDER BY post_idx \
                        DESC LIMIT ?, 10';
      conn.query(query, [begin_idx], (err, rows, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    }

  });
};

exports.getArticleCount = (stock_code, title) => {
  return new Promise((resolve, reject) => {
    if (stock_code != 0 && title === "%undefined%") {
      let sql =
        'SELECT COUNT(*) as list \
                  FROM BOARD_ARTICLE \
                  WHERE stock_code = ?';
      conn.query(sql, stock_code, (err, rows, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows[0].list);
        }
      });
    }
    else if(stock_code == 0 && title !== "%undefined%"){
      let sql =   'SELECT COUNT(*) as list \
                  FROM BOARD_ARTICLE \
                  WHERE title LIKE ?';
      conn.query(sql, title, function(err, rows){
        if(err){
          reject(err);
        }else{
          resolve(rows[0].list);
        }
      })
    }
    else {
      console.log('123')
      let sql =
        'SELECT COUNT(*) as list \
                  FROM BOARD_ARTICLE';
      conn.query(sql, (err, rows, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows[0].list);
        }
      });
    }
  });
};


exports.getPagination = (articleCount, curPage) => {
  return new Promise((resolve, erject) => {
    let maxPage = parseInt((articleCount - 1) / 10) + 1;
    let beginPage = curPage < 3 ? 1 : curPage - 2;
    let endPage = beginPage + 4 > maxPage ? maxPage : beginPage + 4;

    let data = new Object();

    data.bottom = beginPage;
    data.top = endPage;
    data.cur = parseInt(curPage);

    resolve(data);
  });
};

module.exports.getAllList = (idx, callback) => {
  let startIdx = 10 * (idx - 1);
  let sql = 'SELECT * FROM BOARD_ARTICLE ORDER BY post_idx DESC LIMIT ?, 10';
  conn.query(sql, startIdx, (err, rows, fields) => {
    if (err) throw err;
    callback(rows);
  });
};

module.exports.modifyArticlePost = (datas, callback) => {
  let sql =
    'UPDATE BOARD_ARTICLE SET stock_code = ?, title = ?, content = ? WHERE post_idx = ?';
  conn.query(sql, datas, (err, result) => {
    if (err) console.error('ERROR : ' + err);
    callback();
  });
};

module.exports.writeArticlePost = (datas, callback) => {
  let sql =
    'INSERT INTO BOARD_ARTICLE(stock_code, id, title, content, topic) VALUES (?,?,?,?,?)'; // idx는 autoinc, date default가 NOW()
  conn.query(sql, datas, (err, rows) => {
    if (err) callback(400);
    else callback(200);
  });
};

module.exports.getArticlePage = (idx, callback) => {
  let sql = 'SELECT * FROM BOARD_ARTICLE WHERE post_idx = ?';
  conn.query(sql, idx, (err, result, fields) => {
    if (err) throw err;
    callback(result);
  });
};

module.exports.deleteArticlePost = function (datas, callback) {
  let sql = 'DELETE FROM BOARD_ARTICLE WHERE id = ? AND post_idx = ?';
  conn.query(sql, datas, function (err, result) {
    if (err) callback(400);
    else callback(200);
  });
};

module.exports.UpdateArticlePost = (datas, callback) => {
  let sql =
    'UPDATE BOARD_ARTICLE SET stock_code = ?, title = ?, content = ?, topic = ? WHERE post_idx = ? AND id = ?';
  conn.query(sql, datas, (err, result) => {
    if (err) callback(400);
    else callback(200);
  });
};

module.exports.getArticlePost = function (idx, callback) {
  let sql =
    'SELECT title, id, content, views FROM BOARD_ARTICLE WHERE post_idx = ?';
  conn.query(sql, idx, function (err, result) {
    callback(result[0]);
  });
};
