require('dotenv').config();
const maria = require('mysql');
const conn = maria.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    port: process.env.DB_PORT,
    database:'stock'
});
module.exports.getArticlePage = (idx, callback)=>{
    let sql = 'SELECT * FROM BOARD_ARTICLE WHERE post_idx = ?';
    conn.query(sql, idx, (err, result, fields)=>{
        if(err) throw err;
        callback(result);
    })
}