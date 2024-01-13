'use strict';

const express = require('express');
const app = express();
const keys = require('./api/config/keys');
const port = keys.port;

// set the view engine to ejs
app.set('view engine', 'ejs');

// routes
// app.use('/', require('./api/app/routes/profile')());

// Start the server
const startServer = async () => {
  try {
    await app.listen(port);
    console.log('Express started. Listening on %s', port);
  } catch (err) {
    console.log(err);
  }
};

startServer();
