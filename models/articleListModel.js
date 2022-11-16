require('dotenv');
const maria = require('mysql');
const conn = maria.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    port: process.env.DB_PORT,
    database:'test'
});

module.exports.getArticleList = (idx, callback) =>{
    let startIdx = 10 * (idx - 1);
    let sql = 'SELECT * FROM BOARD_ARTICLE ORDER BY post_idx DESC LIMIT ?, 10';
    conn.query(sql, startIdx, (err, rows, fields)=>{
       if(err) throw err;
       callback(rows);
    });
}
