const ProfileGenerator = require('../generators/ProfileGenerator');
const { ProfileRepo } = require('../../database/repository/index');

class ProfileSeeder {
  static async generateRandomProfile(number = 1) {
    const profiles = [];
    for (let i = 0; i < number; i++) {
      const createdProfile = await ProfileGenerator.generateRandomProfile();
      const profile = await ProfileRepo.create(createdProfile);
      profiles.push(profile);
    }
    return profiles;
  }
}

module.exports = ProfileSeeder;
