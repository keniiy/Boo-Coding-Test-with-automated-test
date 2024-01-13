'use strict';

const express = require('express');
const app = express();
const keys = require('./api/config/keys');
const connectDatabase = require('./api/database/connection');
const port = keys.PORT;

// set the view engine to ejs
app.set('view engine', 'ejs');

// backend routes
app.use('/api', require('./api/routes')());

// Start the server
const startServer = async () => {
  // Connect to MongoDB
  await connectDatabase();
  app
    .listen(port, () => {
      logger.info(`Express started. Listening on  %s ${port}`);
    })
    .on('error', (err) => {
      console.log(err);
      process.exit();
    });
};

startServer();
