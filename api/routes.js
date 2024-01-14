'use strict';

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const Logger = require('./config/logger');
const morgan = require('morgan');
const path = require('path');
const keys = require('./config/keys');

const profileRoutes = require('./app/profile/profileRoutes');
const commentRoutes = require('./app/comment/commentRoutes');

const app = express.Router();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

global.logger = Logger.createLogger({ label: 'Boo API' });

const publicMediaPath = path.join(__dirname, keys.PUBLIC_PATH);

app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: logger.stream }));

app.use(`/healthcheck`, (req, res) => {
  res.status(200).send('Boo API is healthy.');
});

app.use('/profile', profileRoutes());
app.use('/comment', commentRoutes());
app.use('/media', express.static(publicMediaPath));

app.get('/', (req, res) => {
  res.status(200).send('Boo API is Up and Running Techies!');
});

module.exports = function () {
  return app;
};
