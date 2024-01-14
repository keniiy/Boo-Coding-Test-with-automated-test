const mongoose = require('mongoose');
const { requester } = require('../../setup');
const {
  STATUS_CODES,
  COMMENT_SORT_BY_ENUM,
  COMMENT_TYPE_ENUM,
} = require('../../../../utils/constant');
const CommentSeeder = require('../../../seeder/createComment');
const ProfileSeeder = require('../../../seeder/createProfile');
const profiles = [];
const comments = [];

describe('Get Comments Endpoint', () => {
  const endpoint = '/api/comment';

  beforeAll(async () => {
    const seedProfiles = await ProfileSeeder.generateRandomProfile(2);
    const seedComments = await CommentSeeder.generateRandomComment(5);

    profiles.push(...seedProfiles);
    comments.push(...seedComments);
  });

  it('should return success response with filtered comments by profileId', async () => {
    const profileIdToFilter = comments[0].profileId.toString();

    const response = await requester.get(
      `${endpoint}?profileId=${profileIdToFilter}`
    );

    expect(response.status).toBe(STATUS_CODES.SUCCESS);
    expect(response.body.message).toBe('Comments Fetched Successfully');
    expect(response.body.data).toHaveProperty('docs');
    expect(response.body.data).toHaveProperty('types');
    expect(response.body.data).toHaveProperty('totalDocs');
    expect(response.body.data).toHaveProperty('limit');
    expect(response.body.data).toHaveProperty('totalPages');
    expect(response.body.data).toHaveProperty('page');
    expect(response.body.data).toHaveProperty('pagingCounter');
    response.body.data.docs.forEach((comment) => {
      expect(comment.profileId).toBe(profileIdToFilter);
    });
  });

  it('should return paginated comments when page and limit filters are applied', async () => {
    const page = 1;
    const limit = 2;
    const profileIdToFilter = comments[0].profileId.toString();

    const response = await requester.get(
      `${endpoint}?profileId=${profileIdToFilter}&page=${page}&limit=${limit}`
    );

    expect(response.status).toBe(STATUS_CODES.SUCCESS);
    expect(response.body.message).toBe('Comments Fetched Successfully');
    expect(response.body.data).toHaveProperty('docs');
    expect(response.body.data).toHaveProperty('types');
    expect(response.body.data).toHaveProperty('limit');
    expect(response.body.data.limit).toBe(limit);
    expect(response.body.data.page).toBe(page);
  });

  it('should return comments sorted by likes when sortBy best filter is applied', async () => {
    const sortBy = COMMENT_SORT_BY_ENUM.BEST;
    const profileIdToFilter = comments[0].profileId.toString();

    await CommentSeeder.generateLikesForComment(
      comments[0]._id,
      profileIdToFilter
    );

    await CommentSeeder.generateMultipleCommentForProfile(
      profileIdToFilter,
      comments[0].userId,
      2
    );

    const response = await requester.get(
      `${endpoint}?profileId=${profileIdToFilter}&sortBy=${sortBy}`
    );

    console.log(response.body, 'response body');

    console.log(JSON.stringify(response.body.data.docs, null, 2));

    expect(response.status).toBe(STATUS_CODES.SUCCESS);
    expect(response.status).toBe(STATUS_CODES.SUCCESS);
    expect(response.body.message).toBe('Comments Fetched Successfully');

    for (let i = 0; i < response.body.data.length - 1; i++) {
      expect(response.body.data[i].likes).toBeGreaterThanOrEqual(
        response.body.data[i + 1].likes
      );
    }
  });

  it('should return comments sorted by date when sortBy latest filter is applied', async () => {
    const sortBy = COMMENT_SORT_BY_ENUM.RECENT;
    const profileIdToFilter = comments[0].profileId.toString();

    const response = await requester.get(
      `${endpoint}?profileId=${profileIdToFilter}&sortBy=${sortBy}`
    );

    expect(response.status).toBe(STATUS_CODES.SUCCESS);
    expect(response.status).toBe(STATUS_CODES.SUCCESS);
    expect(response.body.message).toBe('Comments Fetched Successfully');

    for (let i = 0; i < response.body.data.length - 1; i++) {
      expect(response.body.data[i].createdAt).toBeGreaterThanOrEqual(
        response.body.data[i + 1].createdAt
      );
    }
  });

  it('should return comments containing type MBTI and exclude comments solely of type ENNEAGRAM when sortBy types filter MBTI is applied', async () => {
    const mbtiType = COMMENT_TYPE_ENUM.MBTI;
    const enneagramType = COMMENT_TYPE_ENUM.ENNEAGRAM;

    await CommentSeeder.generateMultipleCommentForProfile(
      comments[0].profileId.toString(),
      comments[0].userId.toString(),
      2,
      mbtiType
    );

    await CommentSeeder.generateMultipleCommentForProfile(
      comments[0].profileId.toString(),
      comments[0].userId.toString(),
      2,
      enneagramType
    );

    const response = await requester.get(
      `${endpoint}?profileId=${comments[0].profileId.toString()}&type=${mbtiType}`
    );

    const commentsArray = response.body.data.docs;
    commentsArray.forEach((comment) => {
      expect(comment.type).toContain(mbtiType);
    });

    commentsArray.forEach((comment) => {
      if (comment.type.length === 1) {
        expect(comment.type).not.toContain(enneagramType);
      }
    });
  });
});
