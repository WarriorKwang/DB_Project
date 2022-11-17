var express = require('express');
const history = require('connect-history-api-fallback');


var indexRouter = require('./routes/index');
var articleRouter = require('./routes/articleRouter');

var app = express();

app.listen(8080, ()=>{
    console.log('listening on port 8080');
})

//SECTION: API
app.use('/api/article', articleRouter);

//SECTION: vue application
// 이 아래로 작성되는 router는 history api fallback을 사용한다.
// 즉, vue-router를 사용한다.
app.use(history());
app.use('/', indexRouter);
app.use(express.static('dist'));