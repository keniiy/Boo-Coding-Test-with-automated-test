const { MongoMemoryServer } = require('mongodb-memory-server');

const mongod = new MongoMemoryServer();

module.exports = async function () {
  const uri = await mongod.getConnectionString();
  return uri;
};
