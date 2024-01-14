const { faker } = require('@faker-js/faker');

class ProfileGenerator {
  /**
   * @description Generate a random profile object data for testing
   * @returns {Object}
   */
  static generateRandomProfile() {
    return {
      name: faker.internet.userName(),
      description: faker.lorem.paragraph(),
      mbti: faker.lorem.word(),
      enneagram: faker.lorem.word(),
      variant: faker.lorem.word(),
      tritype: faker.number.int(),
      socionics: faker.lorem.word(),
      sloan: faker.lorem.word(),
      psyche: faker.lorem.word(),
    };
  }
}

module.exports = ProfileGenerator;
