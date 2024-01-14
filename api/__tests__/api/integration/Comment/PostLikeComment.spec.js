const mongoose = require('mongoose');
const { requester } = require('../../setup');
const { STATUS_CODES } = require('../../../../utils/constant');
const CommentSeeder = require('../../../seeder/createComment');
const ProfileSeeder = require('../../../seeder/createProfile');
const CommentGenerator = require('../../../generators/CommentGenerator');
const profiles = [];
const comments = [];

describe('Like Comment', () => {
  const endpoint = '/api/comment';
  beforeAll(async () => {
    const seedComments = await CommentSeeder.generateRandomComment(2);

    comments.push(...seedComments);
  });

  it('should return success response when a comment is liked successfully', async () => {
    const response = await requester.post(
      `${endpoint}/${comments[0]._id}/${comments[0].userId}/like`
    );

    expect(response.status).toBe(STATUS_CODES.SUCCESS);
    expect(response.body.message).toBe('Comment Liked Successfully');
    expect(response.body.data).toHaveProperty('_id');
    expect(response.body.data).toHaveProperty('profileId');
    expect(response.body.data).toHaveProperty('userId');
    expect(response.body.data).toHaveProperty('type');
    expect(response.body.data).toHaveProperty('text');
  });

  it('should return error response when comment has already been liked by the user', async () => {
    const response = await requester.post(
      `${endpoint}/${comments[0]._id}/${comments[0].userId}/like`
    );

    expect(response.status).toBe(STATUS_CODES.BAD_REQUEST);
  });

  it('should return error response when profile is not found', async () => {
    const response = await requester.post(
      `${endpoint}/${new mongoose.Types.ObjectId().toString()}/${new mongoose.Types.ObjectId().toString()}/like`
    );

    expect(response.status).toBe(STATUS_CODES.NOT_FOUND);
  });
});
