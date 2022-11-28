const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(morgan('dev'));

require('./db/mysql');

app.use(helmet({
    crossOriginResourcePolicy: { policy: "same-site"}
}));

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;