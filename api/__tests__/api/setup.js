const supertest = require('supertest');
const app = require('../../../api/routes');
const connectDatabase = require('../../../api/database/connection');

const requester = supertest(app);

connectDatabase();

module.exports = {
  requester,
};
