const dotenv = require('dotenv');
dotenv.config();

const keys = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  PUBLIC_PATH: process.env.PUBLIC_PATH || '../public/static',
};

module.exports = keys;
