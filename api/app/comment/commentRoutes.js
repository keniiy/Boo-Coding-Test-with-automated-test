const express = require('express');
const router = express.Router();
const validate = require('../../validation/validatorClass');
const { postSchema, getPostSchema } = require('./commentValidation');
const CommentController = require('./commentController');

module.exports = function () {
  return router;
};
