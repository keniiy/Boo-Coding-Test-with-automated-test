const Joi = require('joi');
const {
  COMMENT_TYPE_ENUM,
  COMMENT_SORT_BY_ENUM,
  COMMENT_SORT_ORDER_ENUM,
} = require('../../utils/constant');

const commentSchema = Joi.object({
  userId: Joi.string().hex().required(),
  profileId: Joi.string().hex().required(),
  type: Joi.array()
    .items(Joi.string().valid(...Object.values(COMMENT_TYPE_ENUM)))
    .required(),

  text: Joi.string().required(),
});

const updateCommentSchema = Joi.object({
  commentId: Joi.string().hex().required(),
  text: Joi.string().required(),
  type: Joi.array()
    .items(Joi.string().valid(...Object.values(COMMENT_TYPE_ENUM)))
    .required(),
}).or('text', 'type');

const commentIdSchema = Joi.object({
  commentId: Joi.string().hex().length(24).required(),
});

const likeOrUnlikeCommentSchema = Joi.object({
  commentId: Joi.string().hex().length(24).required(),
  userId: Joi.string().hex().required(),
});

const getCommentSchema = Joi.object({
  profileId: Joi.string().hex().required(),
  page: Joi.number().min(1),
  limit: Joi.number().min(1),
  sortBy: Joi.string()
    .valid(...Object.values(COMMENT_SORT_BY_ENUM))
    .default(COMMENT_SORT_BY_ENUM.BEST),
  type: Joi.string().valid(...Object.values(COMMENT_TYPE_ENUM)),
});

module.exports = {
  commentSchema,
  updateCommentSchema,
  commentIdSchema,
  likeOrUnlikeCommentSchema,
  getCommentSchema,
};
