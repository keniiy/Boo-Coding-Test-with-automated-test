const express = require('express');
const router = express.Router();
const validate = require('../../validation/validatorClass');
const {
  commentSchema,
  updateCommentSchema,
  commentIdSchema,
  likeOrUnlikeCommentSchema,
  getCommentSchema,
  deleteCommentSchema,
} = require('./commentValidation');
const CommentController = require('./commentController');

router.post(
  '/',
  validate(commentSchema),
  CommentController.createCommentController
);

router.put(
  '/:commentId/:userId',
  validate(updateCommentSchema),
  CommentController.updateCommentController
);

router.get(
  '/:commentId',
  validate(commentIdSchema),
  CommentController.getCommentController
);

router.delete(
  '/:commentId/:userId',
  validate(deleteCommentSchema),
  CommentController.deleteCommentController
);

router.post(
  '/:commentId/:userId/like',
  validate(likeOrUnlikeCommentSchema),
  CommentController.likeCommentController
);

router.post(
  '/:commentId/:userId/unlike',
  validate(likeOrUnlikeCommentSchema),
  CommentController.unlikeCommentController
);

router.get(
  '/',
  validate(getCommentSchema),
  CommentController.getCommentsController
);

module.exports = router;
