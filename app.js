'use strict';

const server = require('./api/routes');
const connectDatabase = require('./api/database/connection');
const keys = require('./api/config/keys');
const port = keys.PORT;

const startServer = async () => {
  await connectDatabase();
  server
    .listen(port, () => {
      logger.info(`Express started. Listening on port ${port}`);
    })
    .on('error', (err) => {
      console.error(err);
      process.exit(1);
    });
};

startServer();
