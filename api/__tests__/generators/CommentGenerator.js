const { faker } = require('@faker-js/faker');

class CommentGenerator {
  /**
   * Generate a random comment object data for testing
   * @param {String} profileId - Profile id
   * @param {String} userId - User id
   * @returns {Object}
   */
  static generateRandomComment(profileId, userId) {
    return {
      userId,
      profileId,
      type: ['MBTI', 'ENNEAGRAM', 'CANCER', 'ZODIAC'],
      text: faker.lorem.paragraph(),
    };
  }
}

module.exports = CommentGenerator;
