const express = require('express');
const conn = maria.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    adatabse: 'test'
});

module.exports.modifyArticlePost = (datas, callback)=>{
    let sql = 'UPDATE BOARD_ARTICLE SET stock_code = ?, title = ?, content = ? WHERE post_idx = ?';
    conn.query(sql, datas, (err, result)=>{
        if(err) console.error('ERROR : ' + err);
        callback();
    });
}