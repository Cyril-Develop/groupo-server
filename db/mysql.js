require('dotenv').config();
const mysql = require('mysql');

const dbConnection = mysql.createConnection({
    host: `${process.env.DB_HOST}`,
    database : `${process.env.DB_NAME}`,
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`
});

dbConnection.connect((err) => {
    if(err) throw err;
    console.log('Connected to the database');
});

module.exports = dbConnection;
