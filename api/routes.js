'use strict';

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const Logger = require('./config/logger');
const morgan = require('morgan');
const path = require('path');
const keys = require('./config/keys');
const http = require('http');
const WebSocket = require('ws');
const notFoundMiddleware = require('./middleware/notFoundMiddleware');

const profileRoutes = require('./app/profile/profileRoutes');
const commentRoutes = require('./app/comment/commentRoutes');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('WebSocket connection established');
  ws.on('message', (message) => {
    console.log('Received message:', message);
  });
});

global.broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

global.logger = Logger.createLogger({ label: 'BOO-API' });

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: logger.stream }));

const publicMediaPath = path.join(__dirname, keys.PUBLIC_PATH);
app.use('/media', express.static(publicMediaPath));

app.get('/healthcheck', (req, res) =>
  res.status(200).send('Boo API is healthy.')
);
app.use('/api/profile', profileRoutes);
app.use('/api/comment', commentRoutes);
app.get('/api', (req, res) =>
  res.status(200).send('Boo API is Up and Running Techies!')
);
app.use(notFoundMiddleware);

module.exports = server;
