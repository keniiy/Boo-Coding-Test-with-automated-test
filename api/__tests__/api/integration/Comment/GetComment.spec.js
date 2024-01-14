const mongoose = require('mongoose');
const { requester } = require('../../setup');
const { STATUS_CODES } = require('../../../../utils/constant');
const CommentSeeder = require('../../../seeder/createComment');
const ProfileSeeder = require('../../../seeder/createProfile');
const CommentGenerator = require('../../../generators/CommentGenerator');
const profiles = [];
const comments = [];

describe('Get Comment', () => {
  const endpoint = '/api/comment';
  beforeAll(async () => {
    const seedComments = await CommentSeeder.generateRandomComment(2);

    comments.push(...seedComments);
  });

  it('should return success response when a comment is fetched successfully', async () => {
    const response = await requester.get(`${endpoint}/${comments[0]._id}`);

    expect(response.status).toBe(STATUS_CODES.SUCCESS);
    expect(response.body.message).toBe('Comment Fetched Successfully');
    expect(response.body.data).toHaveProperty('_id');
    expect(response.body.data).toHaveProperty('profileId');
    expect(response.body.data).toHaveProperty('userId');
    expect(response.body.data).toHaveProperty('type');
    expect(response.body.data).toHaveProperty('text');
  });

  it('should return error response when comment fetch fails', async () => {
    const response = await requester.get(`${endpoint}/123`).send();

    expect(response.status).toBe(STATUS_CODES.BAD_REQUEST);
  });

  it('should return error response when comment is not found', async () => {
    const response = await requester.get(
      `${endpoint}/${new mongoose.Types.ObjectId().toString()}`
    );

    expect(response.status).toBe(STATUS_CODES.NOT_FOUND);
  });
});
