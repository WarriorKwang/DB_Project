const express = require('express');
const app = express();
const router = express.Router();
const maria = require('mysql');
const boardListController = require('./controller/boardListController');
const article = require('./routes/article')
const pool = maria.createPool({
    host : 'localhost',
    user : 'root',
    password : '1234',
    database : 'test',
    connectionLimit : 5
})

app.listen(8080, function(){
    console.log('listening on 8080');
});
app.use('/article', require('./routes/article'));
// app.get('/', (req, res)=>{
//     res.send("log");
// })
// app.get('/article', boardListController.getList);
// app.get('/board', (req, res)=>{
//     pool.getConnection(function(err, connection){
//         connection.query("SELECT name FROM user", function(err, result){
//             res.send(result);
//         });
//         connection.release();
//     })
// })

// app.get('/', function(req, res){
//     conn.query('SELECT name FROM USER', function(err, result){
//         res.send(result);
//     });
// })
