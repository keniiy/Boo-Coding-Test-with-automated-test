const supertest = require('supertest');
const app = require('../../routes');
const connectDatabase = require('../../../api/database/connection');

const requester = supertest(app);

connectDatabase();

module.exports = {
  requester,
};
