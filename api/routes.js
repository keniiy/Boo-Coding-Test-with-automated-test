'use strict';

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const Logger = require('./config/logger');
const morgan = require('morgan');

const profileRoutes = require('./app/profile/profileRoutes');
const commentRoutes = require('./app/comment/commentRoutes');

const app = express.Router();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

global.logger = Logger.createLogger({ label: 'Boo API' });

app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: logger.stream }));

app.use(`/healthcheck`, (req, res) => {
  res.status(200).send('Boo API is healthy.');
});

app.use('/profile', profileRoutes());
app.use('/comment', commentRoutes());

app.get('/', (req, res) => {
  res.status(200).send('Boo API is Up and Running Techies!');
});

module.exports = function () {
  return app;
};
