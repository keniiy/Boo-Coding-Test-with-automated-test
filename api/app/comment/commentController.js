const CommentService = require('./commentService');
const { STATUS_CODES, ERROR_MESSAGES } = require('../../utils/constant');
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require('../../utils/responseHandler');

/**
 * @fileOverview Comment Controller - This file contains the Comment Controller class.
 */
class CommentController {
  /**
   * @description - This method is used to create a comment.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {object} - Returns a response object.
   */
  static async createCommentController(req, res) {
    try {
      const result = await CommentService.createCommentService(req.body);

      if (result.statusCode !== STATUS_CODES.CREATED)
        return sendErrorResponse(res, result.statusCode, result.message);

      logger.info(
        `createCommentController - Comment created successfully: ${JSON.stringify(
          result.data
        )}`
      );

      return sendSuccessResponse(
        res,
        result.data,
        result.message,
        result.statusCode
      );
    } catch (error) {
      logger.error(`createCommentController - error ${error.message}`);
      return sendErrorResponse(
        res,
        STATUS_CODES.INTERNAL_SERVER_ERROR,
        ERROR_MESSAGES
      );
    }
  }

  /**
   * @description - This method is used to update a comment.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {object} - Returns a response object.
   */
  static async updateCommentController(req, res) {
    const { commentId, userId } = req.params;
    try {
      const result = await CommentService.updateCommentService({
        commentId,
        userId,
        ...req.body,
      });

      if (result.statusCode !== STATUS_CODES.SUCCESS)
        return sendErrorResponse(res, result.statusCode, result.message);

      logger.info(
        `updateCommentController - Comment updated successfully: ${JSON.stringify(
          result.data
        )}`
      );

      return sendSuccessResponse(
        res,
        result.data,
        result.message,
        result.statusCode
      );
    } catch (error) {
      logger.error(`updateCommentController - error ${error.message}`);
      return sendErrorResponse(
        res,
        STATUS_CODES.INTERNAL_SERVER_ERROR,
        ERROR_MESSAGES
      );
    }
  }

  /**
   * @description - This method is used to get a comment by id.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {object} - Returns a response object.
   */
  static async getCommentController(req, res) {
    try {
      const { commentId } = req.params;
      const result = await CommentService.getCommentService({
        commentId,
      });

      if (result.statusCode !== STATUS_CODES.SUCCESS)
        return sendErrorResponse(res, result.statusCode, result.message);

      logger.info(
        `getCommentByIdController - Comment fetched successfully: ${JSON.stringify(
          result.data
        )}`
      );

      return sendSuccessResponse(
        res,
        result.data,
        result.message,
        result.statusCode
      );
    } catch (error) {
      logger.error(`getCommentByIdController - error ${error.message}`);
      return sendErrorResponse(
        res,
        STATUS_CODES.INTERNAL_SERVER_ERROR,
        ERROR_MESSAGES
      );
    }
  }

  /**
   * @description - This method is used to delete a comment by id.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {object} - Returns a response object.
   */
  static async deleteCommentController(req, res) {
    try {
      const { commentId, userId } = req.params;
      const result = await CommentService.deleteCommentService({
        userId,
        commentId,
      });

      if (result.statusCode !== STATUS_CODES.SUCCESS)
        return sendErrorResponse(res, result.statusCode, result.message);

      logger.info(
        `deleteCommentController - Comment deleted successfully: ${JSON.stringify(
          result.data
        )}`
      );

      return sendSuccessResponse(
        res,
        result.data,
        result.message,
        result.statusCode
      );
    } catch (error) {
      logger.error(`deleteCommentController - error ${error.message}`);
      return sendErrorResponse(
        res,
        STATUS_CODES.INTERNAL_SERVER_ERROR,
        ERROR_MESSAGES
      );
    }
  }

  /**
   * @description - This method is used to like a comment by id.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {object} - Returns a response object.
   */
  static async likeCommentController(req, res) {
    try {
      const { commentId, userId } = req.params;

      const result = await CommentService.likeCommentService({
        commentId,
        userId,
      });

      if (result.statusCode !== STATUS_CODES.SUCCESS)
        return sendErrorResponse(res, result.statusCode, result.message);

      logger.info(
        `likeCommentController - Comment liked successfully: ${JSON.stringify(
          result.data
        )}`
      );

      return sendSuccessResponse(
        res,
        result.data,
        result.message,
        result.statusCode
      );
    } catch (error) {
      logger.error(`likeCommentController - error ${error.message}`);
      return sendErrorResponse(
        res,
        STATUS_CODES.INTERNAL_SERVER_ERROR,
        ERROR_MESSAGES
      );
    }
  }

  /**
   * @description - This method is used to unlike a comment by id.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {object} - Returns a response object.
   */
  static async unlikeCommentController(req, res) {
    try {
      const { commentId, userId } = req.params;
      const result = await CommentService.unlikeCommentService({
        commentId,
        userId,
      });

      if (result.statusCode !== STATUS_CODES.SUCCESS)
        return sendErrorResponse(res, result.statusCode, result.message);

      logger.info(
        `unlikeCommentController - Comment unliked successfully: ${JSON.stringify(
          result.data
        )}`
      );

      return sendSuccessResponse(
        res,
        result.data,
        result.message,
        result.statusCode
      );
    } catch (error) {
      logger.error(`unlikeCommentController - error ${error.message}`);
      return sendErrorResponse(
        res,
        STATUS_CODES.INTERNAL_SERVER_ERROR,
        ERROR_MESSAGES
      );
    }
  }

  /**
   * @description - This method is used to get all comments.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {object} - Returns a response object.
   */
  static async getCommentsController(req, res) {
    try {
      const result = await CommentService.getCommentsService({
        ...req.query,
      });

      if (result.statusCode !== STATUS_CODES.SUCCESS)
        return sendErrorResponse(res, result.statusCode, result.message);

      logger.info(
        `getCommentsController - Comments fetched successfully: ${JSON.stringify(
          result.data
        )}`
      );

      return sendSuccessResponse(
        res,
        result.data,
        result.message,
        result.statusCode
      );
    } catch (error) {
      logger.error(`getCommentsController - error ${error.message}`);
      return sendErrorResponse(
        res,
        STATUS_CODES.INTERNAL_SERVER_ERROR,
        ERROR_MESSAGES
      );
    }
  }
}
module.exports = CommentController;
