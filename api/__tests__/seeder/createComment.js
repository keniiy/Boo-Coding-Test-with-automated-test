const CommentGenerator = require('../generators/CommentGenerator');
const ProfileGenerator = require('../generators/ProfileGenerator');
const ProfileSeeder = require('./createProfile');
const { COMMENT_TYPE_ENUM } = require('../../utils/constant');
const { CommentRepo, ProfileRepo } = require('../../database/repository/index');

class CommentSeeder {
  /**
   * @description This method creates a comment
   * @param {*} profileId
   * @param {*} userId
   * @returns {object} comment
   */
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

  /**
   * @description This method add likes to a comment
   * @param {*} commentId
   * @param {*} userId
   * @returns {object} comment
   */
  static async generateLikesForComment(commentId, userId) {
    const comment = await CommentRepo.like(commentId, userId);

    return comment;
  }

  /**
   * @description generate multiple comment for a profile
   * @param {*} profileId
   * @param {*} userId
   * @param {*} number
   * @type {*} array
   * @returns {object} comment
   */
  static async generateMultipleCommentForProfile(
    profileId,
    userId,
    number,
    type = Object.values(COMMENT_TYPE_ENUM)
  ) {
    const comments = [];

    console.log(type, 'type');

    if (!Array.isArray(type)) {
      type = [type];
    }

    for (let i = 0; i < number; i++) {
      const comment = await CommentRepo.create({
        profileId,
        userId,
        type,
        text: 'This is a comment',
      });

      comments.push(comment);
    }

    return comments;
  }
}

module.exports = CommentSeeder;
