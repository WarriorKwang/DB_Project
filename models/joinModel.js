require('dotenv').config();
const maria = require('mysql');
const dbConfig = require('../config/database')
const conn = maria.createConnection(dbConfig);

module.exports.join = (datas, callback) =>{
    conn.query('SELECT id FROM USER_INFO WHERE id=?', datas[0], function(err, rows){
        if(rows.length) { //NOTE: 이미 있나?
            callback(400, '이미 존재하는 ID');
        }
        else{ // NOTE: 없으면 회원가입
            conn.query('INSERT INTO USER_INFO(id, pw, user_name, birthday, phone_number, mail_addr) VALUES (?,?,?,?,?,?)', datas, (err, rows)=>{
                if(err) throw err;
                callback(200, '회원가입 성공');
            })
        }
    })
}
