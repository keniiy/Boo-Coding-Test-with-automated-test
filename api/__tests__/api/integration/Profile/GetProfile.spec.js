const { requester } = require('../../setup');
const { STATUS_CODES } = require('../../../../utils/constant');
const ProfileSeeder = require('../../../seeder/createProfile');
const ProfileGenerator = require('../../../generators/ProfileGenerator');
const mongoose = require('mongoose');
const profiles = [];

describe('Get Profile', () => {
  const endpoint = '/api/profile';

  beforeAll(async () => {
    const seedProfiles = await ProfileSeeder.generateRandomProfile(1);

    profiles.push(...seedProfiles);
  });

  it('should return success response when a profile is created successfully', async () => {
    const id = profiles[0]._id.toString();
    const response = await requester.get(`${endpoint}/${id}`);

    console.log(response.body.data, 'response.body');

    expect(response.status).toBe(STATUS_CODES.SUCCESS);
    expect(response.body.message).toBe('Profile Fetched Successfully');
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('_id');
    expect(response.body.data).toHaveProperty('name');
  });

  it('should return error response when id is invalid', async () => {
    const response = await requester.get(`${endpoint}/123`);

    expect(response.status).toBe(STATUS_CODES.BAD_REQUEST);
  });

  it('should return error response when profile is not found', async () => {
    const id = new mongoose.Types.ObjectId().toString();

    const response = await requester.get(`${endpoint}/${id}`);

    expect(response.status).toBe(STATUS_CODES.NOT_FOUND);
  });
});
