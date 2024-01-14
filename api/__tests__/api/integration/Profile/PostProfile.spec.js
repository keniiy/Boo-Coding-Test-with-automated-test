const { requester } = require('../../setup');
const { STATUS_CODES } = require('../../../../utils/constant');
const ProfileSeeder = require('../../../seeder/createProfile');
const ProfileGenerator = require('../../../generators/ProfileGenerator');

describe('Post Profile', () => {
  const endpoint = '/api/profile';

  it('should return success response when a profile is created successfully', async () => {
    const response = await requester
      .post(endpoint)
      .send(ProfileGenerator.generateRandomProfile());

    console.log(response.body.data, 'response.body');
    expect(response.status).toBe(STATUS_CODES.CREATED);
    expect(response.body.message).toBe('Profile Created Successfully');
    expect(response.body.data).toHaveProperty('_id');
    expect(response.body.data).toHaveProperty('name');
  });

  it('should return error response when profile creation fails', async () => {
    const response = await requester.post(endpoint).send({});

    expect(response.status).toBe(STATUS_CODES.BAD_REQUEST);
  });
});
