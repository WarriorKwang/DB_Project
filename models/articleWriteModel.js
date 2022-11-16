require('dotenv').config();
const maria = require('mysql');
const conn = maria.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    port: process.env.DB_PORT,
    database:'stock'
});


module.exports.writeArticlePost = (datas, callback)=>{
    let sql = 'INSERT INTO BOARD_ARTICLE(stock_code, id, title, content) VALUES (?,?,?,?)'; // idx는 autoinc, date default가 NOW()
    conn.query(sql, datas, (err, rows)=>{
        if(err) console.error('ERROR: ' + err);
        callback();
    });
}
