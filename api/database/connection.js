const mongoose = require('mongoose');
const uri = require('../config/memoryServer');

const connectDatabase = async () => {
  const stringConnection = await uri();
  await mongoose
    .connect(stringConnection)
    .then(() => logger.info('MongoDB Connected...'))
    .catch((err) => console.log(err));
};

module.exports = connectDatabase;
