const dotenv = require('dotenv');
dotenv.config();

const keys = {
  port: process.env.PORT || 3000,
};

module.exports = keys;
