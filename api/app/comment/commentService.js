const HelperFunction = require('../../utils/helperFunctions');
const { STATUS_CODES } = require('../../utils/constant');
const { CommentRepo, ProfileRepo } = require('../../database/repository');

/**
 * @fileOverview CommentService class for handling comment related operations.
 */
class CommentService {
  /**
   * @description - This method is used to create a comment.
   * @param {object} data - The request object.
   * @returns {object} - Returns a response object.
   */
  static async createCommentService(data) {
    try {
      const { profileId, userId } = data;

      if (profileId === userId)
        return {
          statusCode: STATUS_CODES.BAD_REQUEST,
          message: 'You cannot self comment on your profile',
        };

      const profileExists = await ProfileRepo.getById(profileId);

      if (!profileExists)
        return {
          statusCode: STATUS_CODES.NOT_FOUND,
          message: 'Profile for comment not found',
        };

      const userExists = await ProfileRepo.getById(userId);

      if (!userExists)
        return {
          statusCode: STATUS_CODES.NOT_FOUND,
          message: 'User for comment not found',
        };

      const result = await CommentRepo.create(data);

      if (!result)
        return {
          statusCode: STATUS_CODES.BAD_REQUEST,
          message: 'Comment creation failed',
        };

      logger.info(
        `createCommentService - Comment created successfully: ${JSON.stringify(
          result
        )}`
      );

      return {
        statusCode: STATUS_CODES.CREATED,
        message: 'Comment created successfully',
        data: result,
      };
    } catch (error) {
      logger.error(`createCommentService - error ${error.message}`);
      throw error;
    }
  }

  /**
   * @description - This method is used to update a comment.
   * @param {object} data - The request object.
   * @returns {object} - Returns a response object.
   */
  static async updateCommentService(data) {
    try {
      const { commentId, ...rest } = data;
      const comment = await CommentRepo.get(commentId);

      if (!comment)
        return {
          statusCode: STATUS_CODES.NOT_FOUND,
          message: 'Comment not found',
        };

      const result = await CommentRepo.update(commentId, rest);

      if (!result)
        return {
          statusCode: STATUS_CODES.BAD_REQUEST,
          message: 'Comment update failed',
        };

      logger.info(
        `updateCommentService - Comment updated successfully: ${JSON.stringify(
          result
        )}`
      );

      return {
        statusCode: STATUS_CODES.SUCCESS,
        message: 'Comment updated successfully',
        data: result,
      };
    } catch (error) {
      logger.error(`updateCommentService - error ${error.message}`);
      throw error;
    }
  }

  /**
   * @description - This method is used to get comment.
   * @param {object} data - The request object.
   * @returns {object} - Returns a response object.
   */
  static async getCommentService(data) {
    try {
      const { commentId } = data;
      const result = await CommentRepo.get(commentId);

      if (!result)
        return {
          statusCode: STATUS_CODES.NOT_FOUND,
          message: 'Comment not found',
        };

      logger.info(
        `getCommentService - Comment fetched successfully: ${JSON.stringify(
          result
        )}`
      );

      return {
        statusCode: STATUS_CODES.SUCCESS,
        message: 'Comment fetched successfully',
        data: result,
      };
    } catch (error) {
      logger.error(`getCommentService - error ${error.message}`);
      throw error;
    }
  }

  /**
   * @description - This method is used to delete a comment.
   * @param {object} data - The request object.
   * @returns {object} - Returns a response object.
   */
  static async deleteCommentService(data) {
    try {
      const { commentId } = data;

      const comment = await CommentRepo.get(commentId);

      if (!comment)
        return {
          statusCode: STATUS_CODES.NOT_FOUND,
          message: 'Comment not found',
        };

      const result = await CommentRepo.delete(commentId);

      if (!result)
        return {
          statusCode: STATUS_CODES.BAD_REQUEST,
          message: 'Comment deletion failed',
        };

      logger.info(
        `deleteCommentService - Comment deleted successfully: ${JSON.stringify(
          result
        )}`
      );

      return {
        statusCode: STATUS_CODES.SUCCESS,
        message: 'Comment deleted successfully',
      };
    } catch (error) {
      logger.error(`deleteCommentService - error ${error.message}`);
      throw error;
    }
  }

  /**
   * @description - This method is used to like a comment.
   * @param {object} data - The request object.
   * @returns {object} - Returns a response object.
   */
  static async likeCommentService(data) {
    try {
      const { commentId, userId } = data;

      const comment = await CommentRepo.get(commentId);

      if (!comment)
        return {
          statusCode: STATUS_CODES.NOT_FOUND,
          message: 'Comment not found',
        };

      const userExists = await ProfileRepo.getById(userId);

      if (!userExists)
        return {
          statusCode: STATUS_CODES.NOT_FOUND,
          message: 'User for comment not found',
        };

      const alreadyLiked = await CommentRepo.isLiked(commentId, userId);

      if (alreadyLiked)
        return {
          statusCode: STATUS_CODES.BAD_REQUEST,
          message: 'Comment already liked',
        };
      const result = await CommentRepo.like(commentId, userId);

      if (!result)
        return {
          statusCode: STATUS_CODES.BAD_REQUEST,
          message: 'Comment like failed',
        };

      logger.info(
        `likeCommentService - Comment liked successfully: ${JSON.stringify(
          result
        )}`
      );

      return {
        statusCode: STATUS_CODES.SUCCESS,
        message: 'Comment liked successfully',
        data: result,
      };
    } catch (error) {
      logger.error(`likeCommentService - error ${error.message}`);
      throw error;
    }
  }

  /**
   * @description - This method is used to unlike a comment.
   * @param {object} data - The request object.
   * @returns {object} - Returns a response object.
   */
  static async unlikeCommentService(data) {
    try {
      const { commentId, userId } = data;

      const comment = await CommentRepo.get(commentId);

      if (!comment)
        return {
          statusCode: STATUS_CODES.NOT_FOUND,
          message: 'Comment not found',
        };

      const userExists = await ProfileRepo.getById(userId);

      if (!userExists)
        return {
          statusCode: STATUS_CODES.NOT_FOUND,
          message: 'User for comment not found',
        };

      const alreadyLiked = await CommentRepo.isLiked(commentId, userId);

      if (!alreadyLiked)
        return {
          statusCode: STATUS_CODES.BAD_REQUEST,
          message: 'Comment not liked',
        };
      const result = await CommentRepo.unlike(commentId, userId);

      if (!result)
        return {
          statusCode: STATUS_CODES.BAD_REQUEST,
          message: 'Comment unlike failed',
        };

      logger.info(
        `unlikeCommentService - Comment unlike successfully: ${JSON.stringify(
          result
        )}`
      );

      return {
        statusCode: STATUS_CODES.SUCCESS,
        message: 'Comment unlike successfully',
        data: result,
      };
    } catch (error) {
      logger.error(`unlikeCommentService - error ${error.message}`);
      throw error;
    }
  }

  /**
   * @description - This method is used to get all comments.
   * @param {object} data - The request object.
   * @returns {object} - Returns a response object.
   */
  static async getCommentsService(data) {
    try {
      const result = await CommentRepo.getAll(data);

      if (!result)
        return {
          statusCode: STATUS_CODES.BAD_REQUEST,
          message: 'Comments not found',
        };

      logger.info(
        `getAllCommentsService - Comments fetched successfully: ${JSON.stringify(
          result
        )}`
      );

      return {
        statusCode: STATUS_CODES.SUCCESS,
        message: 'Comments fetched successfully',
        data: result,
      };
    } catch (error) {
      logger.error(`getAllCommentsService - error ${error.message}`);
      throw error;
    }
  }
}

module.exports = CommentService;
