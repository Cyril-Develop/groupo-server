const dbConnection = require('../db/mysql.js');

module.exports = (req, res, next) => {
    dbConnection.query('SELECT * FROM users WHERE id = ?', req.params.id, (err, result) => {
        if(result == 0) {
            return res.status(404).json({error: 'User not found !'});
        } else {
            dbConnection.query('SELECT * FROM users WHERE id = ?', req.auth.userId, (err, result) => {
                if (err) return res.status(500).json(err);
                if (req.auth.userId == req.params.id || result[0].role == 'admin'){
                    next();
                } else {
                    return res.status(401).json({error: 'Invalid Request !'});
                }
            })
        }
    })
};