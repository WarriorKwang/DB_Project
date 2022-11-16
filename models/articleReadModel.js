const maria = require('mysql');
const conn = maria.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'test'
});

module.exports.getArticlePage = (idx, callback)=>{
    let sql = 'SELECT * FROM BOARD_ARTICLE WHERE post_idx = ?';
    conn.query(sql, idx, (err, result, fields)=>{
        if(err) throw err;
        callback(result);
    })
}