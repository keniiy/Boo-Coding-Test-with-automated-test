const CommentGenerator = require('../generators/CommentGenerator');
const ProfileGenerator = require('../generators/ProfileGenerator');
const ProfileSeeder = require('./createProfile');
const { CommentRepo, ProfileRepo } = require('../../database/repository/index');

class CommentSeeder {
  static async generateRandomComment(number = 1) {
    const comments = [];

    for (let i = 0; i < number; i++) {
      const usersInfo = await ProfileSeeder.generateRandomProfile(2);

      const createdComment = await CommentGenerator.generateRandomComment(
        usersInfo[0].id || usersInfo[0]._id,
        usersInfo[1].id || usersInfo[1]._id
      );

      const comment = await CommentRepo.create(createdComment);

      comments.push(comment);
    }

    return comments;
  }
}

module.exports = CommentSeeder;
