const commentModel = require('../models/commentModel');

exports.getComments = (req, res) =>{
    let idx = req.params.article_idx;
    commentModel.getComments(idx, function(result){
        res.send(result);
    });
}

exports.postComment = (req, res) =>{
    if(req.session.user_id != null){
        let datas = [req.body.articleIdx, req.body.comment, req.session.user_id];
        console.log(datas)
        commentModel.writeComment(datas, function(result){
            res.sendStatus(result);
        });
    }
    else{
        res.sendStatus(400);
    }
}

exports.deleteComment = function(req, res){
    if(req.session.user_id != null){
        let comment_idx = req.params.comment_idx;
        let id = req.session.user_id;
        if(req.session.permission == 2) {
            commentModel.deleteComment2(comment_idx, function(result){
                res.sendStatus(result);
            })
        } else {
            commentModel.deleteComment([id, comment_idx], function(result){
                res.sendStatus(result);
            })
        }
    }
    else{
        res.sendStatus(400);
    }
}

exports.updateComment = function(req, res){
    if(req.session.user_id != null){
        let id = req.session.user_id;
        let content = req.body.content;
        let comment_idx = req.body.comment_idx;
        let datas = [content, comment_idx, id];
        commentModel.updateComment(datas, function(result){
            res.sendStatus(result);
        })
    }
    else{
        res.sendStatus(400);
    }
}