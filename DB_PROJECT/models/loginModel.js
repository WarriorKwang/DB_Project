require('dotenv').config();
const maria = require('mysql');
const dbConfig = require('../config/database')
const conn = maria.createConnection(dbConfig);

module.exports.login = function(datas, callback){
    const id = datas[0];
    const pw = datas[1];
    let sql = 'SELECT id, pw, user_name, permission FROM USER_INFO WHERE id = ?';
    conn.query(sql, id, function(err, result){
        if(err) throw err;
        callback(result);
    });
}

module.exports.findPw = (user_id, user_name, phone_number) => {
    return new Promise ((resolve, reject) => {
        let sql = 'SELECT * FROM USER_INFO WHERE id=? and user_name = ? and phone_number = ?';
        conn.query(sql, [user_id, user_name, phone_number], (err, rows, fields)=>{
            if(err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })
  }

  module.exports.setPw = (pw, user_id) => {
    return new Promise ((resolve, reject) => {
        let sql = 'UPDATE USER_INFO SET pw = ? WHERE id = ?';
        conn.query(sql, [pw, user_id], (err, rows, fields)=>{
            if(err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })
  }

  
  module.exports.getUserInfo = (user_id) => {
    return new Promise ((resolve, reject) => {
        let sql = 'SELECT id, user_name, phone_number FROM USER_INFO WHERE id=?';
        conn.query(sql, user_id, (err, rows, fields)=>{
            if(err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })
  }



// module.exports.login = (datas, callback) =>{
//     conn.query('SELECT pw, permission FROM USER_INFO WHERE id=?', datas[0], function(err, rows){
//         if(rows[0].pw == datas[1]){
//             callback(rows[1]);
//         }
//     })
// }

// module.exports.findId = (datas, callback) =>{
//     conn.query('SELECT phone_number WHERE user_name=?', datas[0], function(err, rows){
//         if(rows[0].phone_number == datas[1]){
//             callback(datas);
//         }
//     })
// }

// module.exports.findPw = (datas, callback) =>{
//     conn.query('SELECT phone_number WHERE id=?', datas[0], function(err, rows){
//         if(rows[0].phone_number == datas[1]){
//             callback(datas);
//         }
//     })
// }

// module.exports.getId = (datas, callback) =>{
//     conn.query('SELECT id WHERE user_name=?', datas[0], function(err, rows){
//         if(err) throw err;
//         callback(rows);
//     })
// }

// module.exports.getPw = (datas, callback) =>{
//     conn.query('SELECT pw WHERE id=?', datas[0], function(err, rows){
//         if(err) throw err;
//         callback(rows);
//     })
// }
