const { STATUS_CODES } = require('../utils/constant');
const { sendErrorResponse } = require('../utils/responseHandler');

/**
 * @fileOverview NotFoundMiddleware - This file contains the NotFoundMiddleware function.
 */

/**
 * @description - This method is used to handle non-existent routes.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - Returns a response object.
 */

function NotFoundMiddleware(req, res) {
  return sendErrorResponse(
    res,
    STATUS_CODES.NOT_FOUND,
    `Route ${req.method} ${req.originalUrl} not found`
  );
}

module.exports = NotFoundMiddleware;
