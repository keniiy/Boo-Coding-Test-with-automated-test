const { requester } = require('../../setup');
const { STATUS_CODES } = require('../../../../utils/constant');
const ProfileSeeder = require('../../../seeder/createProfile');
const ProfileGenerator = require('../../../generators/ProfileGenerator');
const mongoose = require('mongoose');
const profiles = [];

describe('Get Profiles', () => {
  const endpoint = '/api/profile';

  beforeAll(async () => {
    const seedProfiles = await ProfileSeeder.generateRandomProfile(3);

    profiles.push(...seedProfiles);
  });

  it('should return success response when profiles are fetched successfully', async () => {
    const response = await requester.get(endpoint);

    expect(response.status).toBe(STATUS_CODES.SUCCESS);
    expect(response.body.message).toBe('Profiles Fetched Successfully');
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('totalPages');
    expect(response.body.data).toHaveProperty('hasNextPage');
    expect(response.body.data).toHaveProperty('hasPrevPage');
    expect(response.body.data).toHaveProperty('limit');
    expect(response.body.data).toHaveProperty('nextPage');
    expect(response.body.data).toHaveProperty('prevPage');
    expect(response.body.data).toHaveProperty('page');
    expect(response.body.data).toHaveProperty('docs');
    expect(response.body.data).toHaveProperty('totalDocs');
  });

  it('should return success response when profiles are fetched successfully with pagination', async () => {
    const response = await requester.get(`${endpoint}?page=1&limit=10`);

    expect(response.status).toBe(STATUS_CODES.SUCCESS);
    expect(response.body.message).toBe('Profiles Fetched Successfully');
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('totalPages');
    expect(response.body.data).toHaveProperty('hasNextPage');
    expect(response.body.data).toHaveProperty('hasPrevPage');
    expect(response.body.data).toHaveProperty('limit');
    expect(response.body.data).toHaveProperty('nextPage');
    expect(response.body.data).toHaveProperty('prevPage');
    expect(response.body.data).toHaveProperty('page');
    expect(response.body.data).toHaveProperty('docs');
    expect(response.body.data).toHaveProperty('totalDocs');
  });
});
