const maria = require('mysql');
const conn = maria.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database:'test'
});

module.exports.writeArticlePost = (datas, callback)=>{
    let sql = 'INSERT INTO BOARD_ARTICLE(stock_code, id, title, content) VALUES (?,?,?,?)'; // idx는 autoinc, date default가 NOW()
    conn.query(sql, datas, (err, rows)=>{
        if(err) console.error('ERROR: ' + err);
        callback();
    });
}
