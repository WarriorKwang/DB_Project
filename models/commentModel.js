require('dotenv').config();
const maria = require('mysql');
const dbConfig = require('../config/database')
const conn = maria.createConnection(dbConfig);

module.exports.getComments = (idx, callback)=>{
    let sql = ' SELECT BC.user_id, BC.comment_idx, UI.user_name, BC.content, BC.created_date \
                FROM BOARD_COMMENT AS BC, USER_INFO AS UI \
                WHERE BC.user_id = UI.id AND BC.post_idx = ?';
    conn.query(sql, idx, (err, result, fileds)=>{
        callback(result);
    })
}

module.exports.writeComment = (datas, callback)=>{
    let sql = 'INSERT INTO BOARD_COMMENT(post_idx, content, user_id) VALUES (?,?,?)'; // idx는 autoinc, date default가 NOW()
    conn.query(sql, datas, (err, result)=>{
        if(err) callback(400);
        else callback(200);
    });
}

module.exports.deleteComment = function(datas, callback){
    let sql = 'DELETE FROM BOARD_COMMENT WHERE id = ? AND comment_idx = ?';
    conn.query(sql, datas, function(err, result){
        if(err) callback(400);
        else callback(200);
    });
}

module.exports.updateComment = function(datas, callback){
    let sql ='UPDATE BOARD_COMMENT SET content = ? WHERE comment_idx = ? AND user_id = ?';
    conn.query(sql, datas, function(err, result){
        if(err) callback(400);
        else callback(200);
    });
}