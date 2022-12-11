const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

const history = require('connect-history-api-fallback');


var indexRouter = require('./routes/index');

const articleRouter = require('./routes/articleRouter');

const loginRouter = require('./routes/loginRouter');
const logoutRouter = require('./routes/logoutRouter');
const stockRouter = require('./routes/stockRouter');
// var joinRouter = require('./routes/joinRouter');
// var loginRouter = require('./routes/loginRouter');
var commentRouter = require('./routes/commentRouter');
var userRouter = require('./routes/userRouter');
const tradeRouter = require('./routes/tradeRouter');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.json())
app.use(express.urlencoded({extended : false}));
app.use(session({
    secret: 'secretCode',
    expires : 3600000,
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWD,
      port: process.env.DB_PORT,
      database:'session'
    })
  }));

app.listen(8080, function(){
    console.log('listening on port 8080');
})



//SECTION: API
app.use('/api/article', articleRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter)
app.use('/api/comment', commentRouter);
app.use('/api/stock', stockRouter);
app.use('/api/trade', tradeRouter);
// app.use('/api/join', joinRouter);
// app.use('/api/login', loginRouter);
app.use('/api/user', userRouter);



//SECTION: vue application
// 이 아래로 작성되는 router는 history api fallback을 사용한다.
// 즉, vue-router를 사용한다.
app.use(history());
app.use('/', indexRouter);
app.use(express.static('dist'));
