const maria = require('mysql');
const conn = maria.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'test'
});