require('dotenv').config();
const maria = require('mysql');
const conn = maria.createConnection('../');

// module.exports.getArticleList = (idx, callback) =>{
//     let startIdx = 10 * (idx - 1);
//     let sql = 'SELECT * FROM BOARD_ARTICLE ORDER BY post_idx DESC LIMIT ?, 10';
//     conn.query(sql, startIdx, (err, rows, fields)=>{
//        if(err) throw err;
//        callback(rows);
//     });
// }

module.exports.getAllList = (idx, callback) =>{
    let startIdx = 10 * (idx - 1);
    let sql = 'SELECT * FROM BOARD_ARTICLE ORDER BY post_idx DESC LIMIT ?, 10';
    conn.query(sql, startIdx, (err, rows, fields)=>{
       if(err) throw err;
       callback(rows);
    });
}

module.exports.modifyArticlePost = (datas, callback)=>{
    let sql = 'UPDATE BOARD_ARTICLE SET stock_code = ?, title = ?, content = ? WHERE post_idx = ?';
    conn.query(sql, datas, (err, result)=>{
        if(err) console.error('ERROR : ' + err);
        callback();
    });
}


module.exports.writeArticlePost = (datas, callback)=>{
    let sql = 'INSERT INTO BOARD_ARTICLE(stock_code, id, title, content) VALUES (?,?,?,?)'; // idx는 autoinc, date default가 NOW()
    conn.query(sql, datas, (err, rows)=>{
        if(err) console.error('ERROR: ' + err);
        callback();
    });
}

module.exports.getArticlePage = (idx, callback)=>{
    let sql = 'SELECT * FROM BOARD_ARTICLE WHERE post_idx = ?';
    conn.query(sql, idx, (err, result, fields)=>{
        if(err) throw err;
        callback(result);
    });
}

module.exports.getPage = (page, callback)=>{
    let sql = 'COUNT * FROM BOARD_ARTICLE';
    conn.query(sql, (err, result)=>{
        callback(result);
    });
}
