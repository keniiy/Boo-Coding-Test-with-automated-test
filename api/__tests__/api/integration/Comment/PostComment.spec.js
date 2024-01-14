const mongoose = require('mongoose');
const { requester } = require('../../setup');
const { STATUS_CODES } = require('../../../../utils/constant');
const CommentSeeder = require('../../../seeder/createComment');
const ProfileSeeder = require('../../../seeder/createProfile');
const CommentGenerator = require('../../../generators/CommentGenerator');
const profiles = [];

describe('Post Comment', () => {
  const endpoint = '/api/comment';

  beforeAll(async () => {
    const seedProfiles = await ProfileSeeder.generateRandomProfile(2);

    profiles.push(...seedProfiles);
  });

  it('should return success response when a comment is created successfully', async () => {
    const response = await requester
      .post(endpoint)
      .send(
        CommentGenerator.generateRandomComment(profiles[0]._id, profiles[1]._id)
      );

    expect(response.status).toBe(STATUS_CODES.CREATED);
    expect(response.body.message).toBe('Comment Created Successfully');
    expect(response.body.data).toHaveProperty('_id');
    expect(response.body.data).toHaveProperty('profileId');
    expect(response.body.data).toHaveProperty('userId');
    expect(response.body.data).toHaveProperty('type');
    expect(response.body.data).toHaveProperty('text');
  });

  it('should return error response when comment creation fails', async () => {
    const response = await requester.post(endpoint).send({});

    expect(response.status).toBe(STATUS_CODES.BAD_REQUEST);
  });

  it('should return error response when profile is not found', async () => {
    const response = await requester
      .post(endpoint)
      .send(
        CommentGenerator.generateRandomComment(
          new mongoose.Types.ObjectId().toString(),
          profiles[1]._id
        )
      );

    expect(response.status).toBe(STATUS_CODES.NOT_FOUND);
  });

  it('should return error response when user is not found', async () => {
    const response = await requester
      .post(endpoint)
      .send(
        CommentGenerator.generateRandomComment(
          profiles[0]._id,
          new mongoose.Types.ObjectId().toString()
        )
      );

    expect(response.status).toBe(STATUS_CODES.NOT_FOUND);
  });
});
