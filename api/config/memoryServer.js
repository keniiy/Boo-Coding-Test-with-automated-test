const { MongoMemoryServer } = require('mongodb-memory-server');

module.exports = async function () {
  const mongod = await MongoMemoryServer.create();
  const uri = await mongod.getUri();
  return uri;
};
