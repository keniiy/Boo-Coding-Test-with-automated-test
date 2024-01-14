const mongoose = require('mongoose');
const { requester } = require('../../setup');
const { STATUS_CODES } = require('../../../../utils/constant');
const CommentSeeder = require('../../../seeder/createComment');

const comments = [];

describe('Delete Comment', () => {
  const endpoint = '/api/comment';

  beforeAll(async () => {
    const seedComments = await CommentSeeder.generateRandomComment(2);

    comments.push(...seedComments);
  });

  it('should return success response when a comment is deleted successfully', async () => {
    const response = await requester.delete(
      `${endpoint}/${comments[0]._id}/${comments[0].userId}`
    );

    expect(response.status).toBe(STATUS_CODES.SUCCESS);
    expect(response.body.message).toBe('Comment Deleted Successfully');
  });

  it('should return error response when comment delete fails', async () => {
    const response = await requester.delete(`${endpoint}/123/123`);

    expect(response.status).toBe(STATUS_CODES.BAD_REQUEST);
  });

  it('should return error response when profile is not found', async () => {
    const response = await requester.delete(
      `${endpoint}/${new mongoose.Types.ObjectId()
        .toString()
        .toString()}/${new mongoose.Types.ObjectId().toString()}`
    );

    expect(response.status).toBe(STATUS_CODES.UNAUTHORIZED);
  });
});
