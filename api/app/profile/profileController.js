const ProfileService = require('./profileService');
const { STATUS_CODES, ERROR_MESSAGES } = require('../../utils/constant');
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require('../../utils/responseHandler');

/**
 * @fileOverview Profile Controller - This file contains the Profile Controller class.
 */
class ProfileController {
  /**
   * @description - This method is used to create a profile.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {object} - Returns a response object.
   */
  static async createProfileController(req, res) {
    try {
      let baseUrl = `${req.protocol}://${req.get('host')}`;

      //NOTE: this is just for development purposes
      if (!req.body.image) {
        if (process.env.NODE_ENV === 'development') {
          // Append port only if it's not already included
          const port = process.env.PORT || 8080;
          if (!baseUrl.includes(`:${port}`)) {
            baseUrl += `:${port}`;
          }
        }

        // use default image if no image is provided
        req.body.image = `${baseUrl}/media/avatar.png`;
      }

      const result = await ProfileService.createProfileService(req.body);

      if (result.statusCode !== STATUS_CODES.CREATED)
        return sendErrorResponse(res, result.statusCode, result.message);

      logger.info(
        `createProfileController - Profile created successfully: ${JSON.stringify(
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
      logger.error(`createProfileController - error ${error.message}`);
      return sendErrorResponse(
        res,
        STATUS_CODES.INTERNAL_SERVER_ERROR,
        ERROR_MESSAGES
      );
    }
  }

  /**
   * @description - This method is used to get all profiles.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {object} - Returns a response object.
   */
  static async getProfilesController(req, res) {
    try {
      const result = await ProfileService.getProfilesService(req.query);

      if (result.statusCode !== STATUS_CODES.SUCCESS)
        return sendErrorResponse(res, result.statusCode, result.message);

      logger.info(
        `getAllProfilesController - Profiles fetched successfully: ${JSON.stringify(
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
      logger.error(`getAllProfilesController - error ${error.message}`);
      return sendErrorResponse(
        res,
        STATUS_CODES.INTERNAL_SERVER_ERROR,
        ERROR_MESSAGES
      );
    }
  }

  /**
   * @description - This method is used to get a profile by id.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {object} - Returns a response object.
   */
  static async getProfileController(req, res) {
    try {
      const result = await ProfileService.getProfileService({
        id: req.params.id,
      });

      if (result.statusCode !== STATUS_CODES.SUCCESS)
        return sendErrorResponse(res, result.statusCode, result.message);

      logger.info(
        `getProfileByIdController - Profile fetched successfully: ${JSON.stringify(
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
      logger.error(`getProfileByIdController - error ${error.message}`);
      return sendErrorResponse(
        res,
        STATUS_CODES.INTERNAL_SERVER_ERROR,
        ERROR_MESSAGES
      );
    }
  }

  /**
   * @description - This method is used to update a profile by id.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {object} - Returns a response object.
   */
  static async updateProfileController(req, res) {
    try {
      const result = await ProfileService.updateProfileService({
        id: req.params.id,
        data: req.body,
      });

      if (result.statusCode !== STATUS_CODES.SUCCESS)
        return sendErrorResponse(res, result.statusCode, result.message);

      logger.info(
        `updateProfileController - Profile updated successfully: ${JSON.stringify(
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
      logger.error(`updateProfileController - error ${error.message}`);
      return sendErrorResponse(
        res,
        STATUS_CODES.INTERNAL_SERVER_ERROR,
        ERROR_MESSAGES
      );
    }
  }

  /**
   * @description - This method is used to delete a profile by id.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {object} - Returns a response object.
   */
  static async deleteProfileController(req, res) {
    try {
      const result = await ProfileService.deleteProfileService({
        id: req.params.id,
      });

      if (result.statusCode !== STATUS_CODES.SUCCESS)
        return sendErrorResponse(res, result.statusCode, result.message);

      logger.info(
        `deleteProfileController - Profile deleted successfully: ${JSON.stringify(
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
      logger.error(`deleteProfileController - error ${error.message}`);
      return sendErrorResponse(
        res,
        STATUS_CODES.INTERNAL_SERVER_ERROR,
        ERROR_MESSAGES
      );
    }
  }
}
module.exports = ProfileController;
