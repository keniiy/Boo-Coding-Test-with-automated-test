const HelperFunction = require('../../utils/helperFunctions');
const { STATUS_CODES } = require('../../utils/constant');
const { ProfileRepo } = require('../../database/repository');

/**
 * @fileOverview ProfileService class.
 */
class ProfileService {
  /**
   * @description - This method is used to create a profile.
   * @param {object} data - The request object.
   * @returns {object} - Returns a response object.
   */
  static async createProfileService(data) {
    try {
      const result = await ProfileRepo.create(data);

      if (!result)
        return {
          statusCode: STATUS_CODES.BAD_REQUEST,
          message: 'Profile creation failed',
        };

      logger.info(
        `createProfileService - Profile created successfully: ${JSON.stringify(
          result
        )}`
      );

      return {
        statusCode: STATUS_CODES.CREATED,
        message: 'Profile created successfully',
        data: result,
      };
    } catch (error) {
      logger.error(`createProfileService - error ${error.message}`);
      throw error;
    }
  }

  /**
   * @description - This method is used to get all profiles.
   * @param {object} data - The request object.
   * @returns {object} - Returns a response object.
   */
  static async getProfilesService(data) {
    try {
      const result = await ProfileRepo.getAll(data);

      if (!result)
        return {
          statusCode: STATUS_CODES.BAD_REQUEST,
          message: 'Profiles not found',
        };

      logger.info(
        `getAllProfilesService - Profiles fetched successfully: ${JSON.stringify(
          result
        )}`
      );

      return {
        statusCode: STATUS_CODES.SUCCESS,
        message: 'Profiles fetched successfully',
        data: result,
      };
    } catch (error) {
      logger.error(`getAllProfilesService - error ${error.message}`);
      throw error;
    }
  }

  /**
   * @description - This method is used to get a profile by id.
   * @param {object} data - The request object.
   * @returns {object} - Returns a response object.
   */
  static async getProfileService(data) {
    const { id } = data;

    try {
      const result = await ProfileRepo.getById(id);

      if (!result)
        return {
          statusCode: STATUS_CODES.BAD_REQUEST,
          message: 'Profile not found',
        };

      logger.info(
        `getProfileByIdService - Profile fetched successfully: ${JSON.stringify(
          result
        )}`
      );

      return {
        statusCode: STATUS_CODES.SUCCESS,
        message: 'Profile fetched successfully',
        data: result,
      };
    } catch (error) {
      logger.error(`getProfileByIdService - error ${error.message}`);
      throw error;
    }
  }

  /**
   * @description - This method is used to update a profile by id.
   * @param {object} data - The request object.
   * @returns {object} - Returns a response object.
   */
  static async updateProfileService(data) {
    const { id } = data;

    try {
      const profile = await ProfileRepo.getById(id);

      if (!profile)
        return {
          statusCode: STATUS_CODES.BAD_REQUEST,
          message: 'Profile not found',
        };

      const result = await ProfileRepo.updateById(id, {
        ...data,
      });

      if (!result)
        return {
          statusCode: STATUS_CODES.BAD_REQUEST,
          message: 'Profile update failed',
        };

      logger.info(
        `updateProfileService - Profile updated successfully: ${JSON.stringify(
          result
        )}`
      );

      return {
        statusCode: STATUS_CODES.SUCCESS,
        message: 'Profile updated successfully',
        data: result,
      };
    } catch (error) {
      logger.error(`updateProfileService - error ${error.message}`);
      throw error;
    }
  }

  /**
   * @description - This method is used to delete a profile by id.
   * @param {object} data - The request object.
   * @returns {object} - Returns a response object.
   */
  static async deleteProfileService(data) {
    const { id } = data;

    try {
      const profile = await ProfileRepo.getById(id);

      if (!profile)
        return {
          statusCode: STATUS_CODES.BAD_REQUEST,
          message: 'Profile not found',
        };

      const result = await ProfileRepo.deleteById(id);

      if (!result)
        return {
          statusCode: STATUS_CODES.BAD_REQUEST,
          message: 'Profile deletion failed',
        };

      logger.info(
        `deleteProfileService - Profile deleted successfully: ${JSON.stringify(
          result
        )}`
      );

      return {
        statusCode: STATUS_CODES.SUCCESS,
        message: 'Profile deleted successfully',
      };
    } catch (error) {
      logger.error(`deleteProfileService - error ${error.message}`);
      throw error;
    }
  }
}

module.exports = ProfileService;
