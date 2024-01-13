const HelperFunctions = require('./helperFunctions');
const { STATUS_CODES } = require('./constant');

/**
 * @fileOverview Response Handler - This file contains the Response Handler class.
 */
class ResponseHandler {
  /**
   * @description - This method is used to send a success response.
   * @param {object} res - The response object.
   * @param {object} data - The data to be sent.
   * @param {string} message - The success message to be sent.
   * @param {number} statusCode - The status code to be sent.
   * @returns {object} - Returns a response object.
   */
  static sendSuccessResponse(
    res,
    data,
    message,
    statusCode = STATUS_CODES.SUCCESS
  ) {
    return res.status(statusCode).json({
      status: 'success',
      message: HelperFunctions.capitalizeAllNamesAndInitials(message),
      data,
    });
  }

  /**
   * @description - This method is used to send an error response.
   * @param {object} res - The response object.
   * @param {number} statusCode - The status code to be sent.
   * @param {string} message - The error message to be sent.
   * @returns {object} - Returns a response object.
   */
  static sendErrorResponse(res, statusCode, message) {
    return res.status(statusCode).json({
      status: 'error',
      message: HelperFunctions.capitalizeAllNamesAndInitials(message),
    });
  }
}

module.exports = ResponseHandler;
