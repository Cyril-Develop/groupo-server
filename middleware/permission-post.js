const dbConnection = require('../db/mysql.js');

module.exports = (req, res, next) => {
    dbConnection.query('SELECT userId FROM post WHERE id = ?', req.params.id, (err, result) => {
        if (err) return res.status(500).json(err);
        if(result == 0 ) return res.status(404).json({error: 'Post not found !'});
        dbConnection.query('SELECT role FROM users WHERE id = ?', req.auth.userId, (err, result2) => {
            if (err) return res.status(500).json(err);
            if(req.auth.userId == result[0].userId || result2[0].role == 'admin'){
                next();
            } else {
                return res.status(401).json({error: 'Invalid Request !'});
            }
        })
    })
};