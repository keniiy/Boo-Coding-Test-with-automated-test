const mongoose = require('mongoose');
const { requester } = require('../../setup');
const { STATUS_CODES } = require('../../../../utils/constant');
const CommentSeeder = require('../../../seeder/createComment');
const ProfileSeeder = require('../../../seeder/createProfile');
const CommentGenerator = require('../../../generators/CommentGenerator');
const profiles = [];
const comments = [];

describe('Put Comment', () => {
  const endpoint = '/api/comment';

  beforeAll(async () => {
    const seedProfiles = await ProfileSeeder.generateRandomProfile(2);

    const seedComments = await CommentSeeder.generateRandomComment(2);

    profiles.push(...seedProfiles);
    comments.push(...seedComments);
  });

  it('should return success response when a comment is updated successfully', async () => {
    const response = await requester
      .put(`${endpoint}/${comments[0]._id}/${comments[0].userId}`)
      .send({
        text: 'updated text',
      });

    expect(response.status).toBe(STATUS_CODES.SUCCESS);
    expect(response.body.message).toBe('Comment Updated Successfully');
    expect(response.body.data).toHaveProperty('_id');
    expect(response.body.data).toHaveProperty('profileId');
    expect(response.body.data).toHaveProperty('userId');
    expect(response.body.data).toHaveProperty('type');
    expect(response.body.data).toHaveProperty('text');
  });

  it('should return error response when comment update fails', async () => {
    const response = await requester.put(`${endpoint}/123/123`).send({});

    expect(response.status).toBe(STATUS_CODES.BAD_REQUEST);
  });

  it('should return error response when profile is not found', async () => {
    const seedComments = await CommentSeeder.generateRandomComment(
      1,
      profiles[0]._id,
      profiles[1]._id
    );
    const comment = seedComments[0];

    const response = await requester
      .put(`${endpoint}/${comment._id}`)
      .send(
        CommentGenerator.generateRandomComment(
          new mongoose.Types.ObjectId().toString(),
          profiles[1]._id
        )
      );

    expect(response.status).toBe(STATUS_CODES.NOT_FOUND);
  });

  it('should return error response when user is not found', async () => {
    const seedComments = await CommentSeeder.generateRandomComment(
      1,
      profiles[0]._id,
      profiles[1]._id
    );
    const comment = seedComments[0];

    const response = await requester
      .put(`${endpoint}/${comment._id}`)
      .send(
        CommentGenerator.generateRandomComment(
          profiles[0]._id,
          new mongoose.Types.ObjectId().toString()
        )
      );

    expect(response.status).toBe(STATUS_CODES.NOT_FOUND);
  });
});
