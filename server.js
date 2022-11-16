const express = require('express');
const articleRouter = require('./routes/articleRouter');
const app = express();

app.listen(8080, ()=>{
    console.log('listening on port 8080');
})

app.use('/article', articleRouter);