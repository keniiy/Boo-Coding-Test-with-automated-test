const { StatusCodes } = require('http-status-codes');

const STATUS_CODES = {
  SUCCESS: StatusCodes.OK,
  CREATED: StatusCodes.CREATED,
  BAD_REQUEST: StatusCodes.BAD_REQUEST,
  UNAUTHORIZED: StatusCodes.UNAUTHORIZED,
  FORBIDDEN: StatusCodes.FORBIDDEN,
  NOT_FOUND: StatusCodes.NOT_FOUND,
  INTERNAL_SERVER_ERROR: StatusCodes.INTERNAL_SERVER_ERROR,
};

const ERROR_MESSAGES = 'Something went wrong. Please try again later.';

const COMMENT_TYPE_ENUM = {
  MBTI: 'MBTI',
  ENNEAGRAM: 'ENNEAGRAM',
  BIG_FIVE: 'BIG_FIVE',
  ZODIAC: 'ZODIAC',
};

module.exports = {
  STATUS_CODES,
  ERROR_MESSAGES,
  COMMENT_TYPE_ENUM,
};
