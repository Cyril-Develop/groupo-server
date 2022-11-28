const Post = require('../models/post.js');
const Comment = require('../models/comment.js');
const dbConnection = require('../db/mysql');
const fs = require('fs');

exports.createPost = (req, res) => {
    const post = new Post({
        title: req.body.title ? req.body.title : '',
        content: req.body.content ? req.body.content : '',
        userId: req.auth.userId,
        imagePost: req.file ? `${req.protocol}://${req.get('host')}/images/articleImages/${req.file.filename}` : ''    
    });
    dbConnection.query('INSERT INTO post SET ? ', post, (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({message: 'Post created !'});
    });
};

exports.getAllPost = (req, res) => {
    dbConnection.query('SELECT p.*, u.lastname, firstname, imageProfile FROM post AS p JOIN users AS u ON (u.id = p.userId) ORDER BY p.createdAt DESC', (err, result) => {
        if (err) return res.status(500).json(err);
        if(result == 0) return res.status(404).json([]);
        res.status(200).json(result);
    });
};

exports.getPost = (req, res) => {
    dbConnection.query('SELECT p.*, u.lastname, firstname, imageProfile FROM post AS p JOIN users AS u ON (u.id = p.userId) WHERE userId = ? ORDER BY p.createdAt DESC', req.params.id, (err, result) => {
        if (err) return res.status(500).json(err);
        if(result === 0) return res.status(404).json([]);
        res.status(200).json(result); 
    });    
}

exports.deletePost = (req, res) => {
    dbConnection.query('SELECT * FROM post WHERE id = ?', req.params.id, (err, result) => {
        if (err) return res.status(500).json(err);
        else {
            const filename = result[0].imagePost.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
            dbConnection.query('DELETE FROM post WHERE id = ?', req.params.id, (err, result) => {
                if (err) return res.status(500).json(err);
                res.status(200).json({message: 'Post deleted !'});
            });
        })}
    });  
};

 exports.editPost = (req, res) => {
     dbConnection.query('SELECT * FROM post WHERE id = ?', req.params.id, (err, result) => {
        if (err) return res.status(500).json(err);
                const image = req.file ? `${req.protocol}://${req.get('host')}/images/articleImages/${req.file.filename}` : result[0].imagePost;
                const title = req.body.title ? req.body.title : result[0].title;
                const content = req.body.content ? req.body.content : result[0].content;
            if (result[0].imagePost !== "") {
                const filename = result[0].imagePost.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    dbConnection.query('UPDATE post SET imagePost = ?, title = ?, content = ?  WHERE id = ?', [image, title, content, req.params.id], (err, result) => {
                        if (err) return res.status(500).json(err);
                        res.status(200).json({message: 'Post updated !'});
                    });
                });
            } else {
                dbConnection.query('UPDATE post SET imagePost = ?, title = ?, content = ?  WHERE id = ?', [image, title, content, req.params.id], (err, result) => {
                    if (err) return res.status(500).json(err);
                    res.status(200).json({message: 'Post updated !'});
            });
        }
    }); 
};

exports.likePost = (req, res) => {
    dbConnection.query('SELECT userId FROM likes WHERE postId = ?', req.params.id, (err, result) => {
        if (err) return res.status(500).json(err);
        const userLiked = result.find(user => user.userId == req.auth.userId);
        if (userLiked) {
            dbConnection.query('DELETE FROM likes WHERE userId = ? AND postId = ?', [req.auth.userId, req.params.id], (err, result) => {
                if (err) return res.status(500).json(err);
                res.status(200).json({message: 'Like removed !'});
            });
        } else {
            dbConnection.query('INSERT INTO likes SET postId = ?, userId = ?', [req.params.id, req.auth.userId], (err, result) => {
                if (err) return res.status(500).json(err);
                res.status(200).json({message: 'Post liked !'});
            });
        }
    })
};
    
exports.getLikes = (req, res) => {
    dbConnection.query('SELECT userId FROM likes WHERE postId = ?', req.params.id, (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(result.map(like=>like.userId));
    });
};

exports.addComment = (req, res) => {
    const comment = new Comment({
        content: req.body.content ? req.body.content : '',
        userId: req.auth.userId,
        postId: req.params.id
    });
    dbConnection.query('INSERT INTO comments SET ? ', comment, (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({message: 'Comment created !'});
    });
};

exports.getComments = (req, res) => {
    dbConnection.query('SELECT c.*, u.lastname, firstname, imageProfile FROM comments AS c JOIN users AS u ON (u.id = c.userId) WHERE postId = ? ORDER BY c.createdAt DESC', req.params.id, (err, result) => {
        if (err) return res.status(500).json(err);
        if(result === 0) return res.status(404).json([]);
        res.status(200).json(result);
    });
};

exports.deleteComment = (req, res) => {
    dbConnection.query('DELETE FROM comments WHERE commentId = ?', req.params.id, (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({message: 'Comment deleted !'});
    });
};



