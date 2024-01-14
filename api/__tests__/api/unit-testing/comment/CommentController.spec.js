const CommentService = require('../../../../app/comment/commentService');
const CommentController = require('../../../../app/comment/commentController');
const { STATUS_CODES, ERROR_MESSAGES } = require('../../../../utils/constant');
const logger = require('../../mocks/logger');

jest.mock('../../../../app/comment/commentService');

describe('Comment Controller ', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createCommentController', () => {
    it('should return success response when a comment is created successfully', async () => {
      const req = {
        body: { content: 'This is a comment' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockCommentData = { commentId: 1, content: 'This is a comment' };
      CommentService.createCommentService = jest.fn().mockResolvedValue({
        statusCode: STATUS_CODES.CREATED,
        message: 'Comment Created Successfully',
        data: mockCommentData,
      });

      await CommentController.createCommentController(req, res);

      expect(CommentService.createCommentService).toHaveBeenCalledWith(
        req.body
      );

      expect(res.status).toHaveBeenCalledWith(STATUS_CODES.CREATED);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'Comment Created Successfully',
        statusCode: STATUS_CODES.CREATED,
        data: mockCommentData,
      });
    });

    it('should return error response when comment creation fails', async () => {
      const req = {
        body: { content: 'Invalid comment content' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      CommentService.createCommentService = jest.fn().mockResolvedValue({
        statusCode: STATUS_CODES.BAD_REQUEST,
        message: 'Comment Creation Failed',
      });

      await CommentController.createCommentController(req, res);

      expect(CommentService.createCommentService).toHaveBeenCalledWith(
        req.body
      );

      expect(res.status).toHaveBeenCalledWith(STATUS_CODES.BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Comment Creation Failed',
        statusCode: STATUS_CODES.BAD_REQUEST,
      });
    });

    it('should return error response when an error occurs during comment creation', async () => {
      const req = {
        body: { content: 'This is a comment' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      CommentService.createCommentService = jest
        .fn()
        .mockRejectedValue(new Error('Internal Server Error'));

      await CommentController.createCommentController(req, res);

      expect(CommentService.createCommentService).toHaveBeenCalledWith(
        req.body
      );

      expect(res.status).toHaveBeenCalledWith(
        STATUS_CODES.INTERNAL_SERVER_ERROR
      );
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: ERROR_MESSAGES,
        statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
      });
    });
  });

  describe('updateCommentController', () => {
    it('should return success response when a comment is updated successfully', async () => {
      const req = {
        params: { commentId: 1 },
        body: { content: 'This is a comment' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockCommentData = { commentId: 1, content: 'This is a comment' };
      CommentService.updateCommentService = jest.fn().mockResolvedValue({
        statusCode: STATUS_CODES.SUCCESS,
        message: 'Comment Updated Successfully',
        data: mockCommentData,
      });

      await CommentController.updateCommentController(req, res);

      expect(CommentService.updateCommentService).toHaveBeenCalledWith({
        commentId: req.params.commentId,
        ...req.body,
      });

      expect(res.status).toHaveBeenCalledWith(STATUS_CODES.SUCCESS);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'Comment Updated Successfully',
        statusCode: STATUS_CODES.SUCCESS,
        data: mockCommentData,
      });
    });

    it('should return error response when comment updation fails', async () => {
      const req = {
        params: { commentId: 1 },
        body: { content: 'Invalid comment content' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      CommentService.updateCommentService = jest.fn().mockResolvedValue({
        statusCode: STATUS_CODES.BAD_REQUEST,
        message: 'Comment Updation Failed',
      });

      await CommentController.updateCommentController(req, res);

      expect(CommentService.updateCommentService).toHaveBeenCalledWith({
        commentId: req.params.commentId,
        ...req.body,
      });

      expect(res.status).toHaveBeenCalledWith(STATUS_CODES.BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Comment Updation Failed',
        statusCode: STATUS_CODES.BAD_REQUEST,
      });
    });

    it('should return error response when an error occurs during comment updation', async () => {
      const req = {
        params: { commentId: 1 },
        body: { content: 'This is a comment' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      CommentService.updateCommentService = jest
        .fn()
        .mockRejectedValue(new Error('Internal Server Error'));

      await CommentController.updateCommentController(req, res);

      expect(CommentService.updateCommentService).toHaveBeenCalledWith({
        commentId: req.params.commentId,
        ...req.body,
      });

      expect(res.status).toHaveBeenCalledWith(
        STATUS_CODES.INTERNAL_SERVER_ERROR
      );

      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: ERROR_MESSAGES,
        statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
      });
    });
  });

  describe('getCommentController', () => {
    it('should return success response when a comment is fetched successfully', async () => {
      const req = {
        params: { commentId: '1' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockCommentData = {
        commentId: 1,
        content: 'Comment content',
      };
      CommentService.getCommentService = jest.fn().mockResolvedValue({
        statusCode: STATUS_CODES.SUCCESS,
        message: 'Comment Fetched Successfully',
        data: mockCommentData,
      });

      await CommentController.getCommentController(req, res);

      expect(CommentService.getCommentService).toHaveBeenCalledWith({
        commentId: req.params.commentId,
      });
      expect(res.status).toHaveBeenCalledWith(STATUS_CODES.SUCCESS);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'Comment Fetched Successfully',
        statusCode: STATUS_CODES.SUCCESS,
        data: mockCommentData,
      });
    });

    it('should return error response when comment fetch fails', async () => {
      const req = {
        params: { commentId: '1' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      CommentService.getCommentService = jest.fn().mockResolvedValue({
        statusCode: STATUS_CODES.BAD_REQUEST,
        message: 'Comment Fetch Failed',
      });

      await CommentController.getCommentController(req, res);

      expect(CommentService.getCommentService).toHaveBeenCalledWith({
        commentId: req.params.commentId,
      });
      expect(res.status).toHaveBeenCalledWith(STATUS_CODES.BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Comment Fetch Failed',
        statusCode: STATUS_CODES.BAD_REQUEST,
      });
    });

    it('should return error response when an error occurs', async () => {
      const req = {
        params: { commentId: '1' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      CommentService.getCommentService = jest
        .fn()
        .mockRejectedValue(new Error('Some error'));

      await CommentController.getCommentController(req, res);

      expect(CommentService.getCommentService).toHaveBeenCalledWith({
        commentId: req.params.commentId,
      });
      expect(res.status).toHaveBeenCalledWith(
        STATUS_CODES.INTERNAL_SERVER_ERROR
      );
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: ERROR_MESSAGES,
        statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
      });
    });
  });
  describe('deleteCommentController', () => {
    it('should return success response when a comment is deleted successfully', async () => {
      const commentId = 'comment123';
      const req = {
        params: { commentId },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      CommentService.deleteCommentService.mockResolvedValue({
        statusCode: STATUS_CODES.SUCCESS,
        message: 'Comment Deleted Successfully',
        data: {},
      });

      await CommentController.deleteCommentController(req, res);

      expect(CommentService.deleteCommentService).toHaveBeenCalledWith({
        commentId,
      });

      expect(res.status).toHaveBeenCalledWith(STATUS_CODES.SUCCESS);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'Comment Deleted Successfully',
        statusCode: STATUS_CODES.SUCCESS,
        data: {},
      });
    });

    it('should return error response when comment deletion fails', async () => {
      const commentId = 'comment123';
      const req = {
        params: { commentId },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      CommentService.deleteCommentService.mockResolvedValue({
        statusCode: STATUS_CODES.BAD_REQUEST,
        message: 'Comment Deletion Failed',
      });

      await CommentController.deleteCommentController(req, res);

      expect(CommentService.deleteCommentService).toHaveBeenCalledWith({
        commentId,
      });

      expect(res.status).toHaveBeenCalledWith(STATUS_CODES.BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Comment Deletion Failed',
        statusCode: STATUS_CODES.BAD_REQUEST,
      });
    });

    it('should return error response when comment is not found', async () => {
      const commentId = 'comment123';
      const req = {
        params: { commentId },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      CommentService.deleteCommentService.mockResolvedValue({
        statusCode: STATUS_CODES.NOT_FOUND,
        message: 'Comment Not Found',
      });

      await CommentController.deleteCommentController(req, res);

      expect(CommentService.deleteCommentService).toHaveBeenCalledWith({
        commentId,
      });

      expect(res.status).toHaveBeenCalledWith(STATUS_CODES.NOT_FOUND);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Comment Not Found',
        statusCode: STATUS_CODES.NOT_FOUND,
      });
    });

    it('should return error response when an error occurs', async () => {
      const commentId = 'comment123';
      const req = {
        params: { commentId },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      CommentService.deleteCommentService.mockRejectedValue(
        new Error('Some error')
      );

      await CommentController.deleteCommentController(req, res);

      expect(CommentService.deleteCommentService).toHaveBeenCalledWith({
        commentId,
      });

      expect(res.status).toHaveBeenCalledWith(
        STATUS_CODES.INTERNAL_SERVER_ERROR
      );
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: ERROR_MESSAGES,
        statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
      });
    });
  });

  describe('likeCommentController', () => {
    it('should return success response when liking a comment is successful', async () => {
      const commentId = 'comment123';
      const userId = 'user123';
      const req = {
        params: { commentId, userId },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      CommentService.likeCommentService.mockResolvedValue({
        statusCode: STATUS_CODES.SUCCESS,
        message: 'Comment Liked Successfully',
        data: {},
      });

      await CommentController.likeCommentController(req, res);

      expect(CommentService.likeCommentService).toHaveBeenCalledWith({
        commentId,
        userId,
      });

      expect(res.status).toHaveBeenCalledWith(STATUS_CODES.SUCCESS);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'Comment Liked Successfully',
        statusCode: STATUS_CODES.SUCCESS,
        data: {},
      });
    });

    it('should return error response when liking a comment fails', async () => {
      const commentId = 'comment123';
      const userId = 'user123';
      const req = {
        params: { commentId, userId },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      CommentService.likeCommentService.mockResolvedValue({
        statusCode: STATUS_CODES.BAD_REQUEST,
        message: 'Comment Liking Failed',
      });

      await CommentController.likeCommentController(req, res);

      expect(CommentService.likeCommentService).toHaveBeenCalledWith({
        commentId,
        userId,
      });

      expect(res.status).toHaveBeenCalledWith(STATUS_CODES.BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Comment Liking Failed',
        statusCode: STATUS_CODES.BAD_REQUEST,
      });
    });

    it('should return error response when an error occurs', async () => {
      const commentId = 'comment123';
      const userId = 'user123';
      const req = {
        params: { commentId, userId },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      CommentService.likeCommentService.mockRejectedValue(
        new Error('Some error')
      );

      await CommentController.likeCommentController(req, res);

      expect(CommentService.likeCommentService).toHaveBeenCalledWith({
        commentId,
        userId,
      });

      expect(res.status).toHaveBeenCalledWith(
        STATUS_CODES.INTERNAL_SERVER_ERROR
      );
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: ERROR_MESSAGES,
        statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
      });
    });
  });

  describe('unlikeCommentController', () => {
    it('should return success response when unliking a comment is successful', async () => {
      const commentId = 'comment123';
      const userId = 'user123';
      const req = {
        params: { commentId, userId },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      CommentService.unlikeCommentService.mockResolvedValue({
        statusCode: STATUS_CODES.SUCCESS,
        message: 'Comment Unliked Successfully',
        data: {},
      });

      await CommentController.unlikeCommentController(req, res);

      expect(CommentService.unlikeCommentService).toHaveBeenCalledWith({
        commentId,
        userId,
      });

      expect(res.status).toHaveBeenCalledWith(STATUS_CODES.SUCCESS);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'Comment Unliked Successfully',
        statusCode: STATUS_CODES.SUCCESS,
        data: {},
      });
    });

    it('should return error response when unliking a comment fails', async () => {
      const commentId = 'comment123';
      const userId = 'user123';
      const req = {
        params: { commentId, userId },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      CommentService.unlikeCommentService.mockResolvedValue({
        statusCode: STATUS_CODES.BAD_REQUEST,
        message: 'Comment Unliking Failed',
      });

      await CommentController.unlikeCommentController(req, res);

      expect(CommentService.unlikeCommentService).toHaveBeenCalledWith({
        commentId,
        userId,
      });

      expect(res.status).toHaveBeenCalledWith(STATUS_CODES.BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Comment Unliking Failed',
        statusCode: STATUS_CODES.BAD_REQUEST,
      });
    });

    it('should return error response when an error occurs', async () => {
      const commentId = 'comment123';
      const userId = 'user123';
      const req = {
        params: { commentId, userId },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      CommentService.unlikeCommentService.mockRejectedValue(
        new Error('Some error')
      );

      await CommentController.unlikeCommentController(req, res);

      expect(CommentService.unlikeCommentService).toHaveBeenCalledWith({
        commentId,
        userId,
      });

      expect(res.status).toHaveBeenCalledWith(
        STATUS_CODES.INTERNAL_SERVER_ERROR
      );
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: ERROR_MESSAGES,
        statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
      });
    });
  });

  describe('getCommentsController', () => {
    it('should return success response with comments when fetching comments is successful', async () => {
      const req = {
        query: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const comments = [
        { id: 'comment1', text: 'Comment 1' },
        { id: 'comment2', text: 'Comment 2' },
      ];

      CommentService.getCommentsService.mockResolvedValue({
        statusCode: STATUS_CODES.SUCCESS,
        message: 'Comments Fetched Successfully',
        data: comments,
      });

      await CommentController.getCommentsController(req, res);

      expect(CommentService.getCommentsService).toHaveBeenCalledWith(req.query);

      expect(res.status).toHaveBeenCalledWith(STATUS_CODES.SUCCESS);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'Comments Fetched Successfully',
        statusCode: STATUS_CODES.SUCCESS,
        data: comments,
      });
    });

    it('should return error response when fetching comments fails', async () => {
      const req = {
        query: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      CommentService.getCommentsService.mockResolvedValue({
        statusCode: STATUS_CODES.BAD_REQUEST,
        message: 'Comments Fetching Failed',
      });

      await CommentController.getCommentsController(req, res);

      expect(CommentService.getCommentsService).toHaveBeenCalledWith(req.query);

      expect(res.status).toHaveBeenCalledWith(STATUS_CODES.BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Comments Fetching Failed',
        statusCode: STATUS_CODES.BAD_REQUEST,
      });
    });

    it('should return error response when an error occurs', async () => {
      const req = {
        query: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      CommentService.getCommentsService.mockRejectedValue(
        new Error('Some error')
      );

      await CommentController.getCommentsController(req, res);

      expect(CommentService.getCommentsService).toHaveBeenCalledWith(req.query);

      expect(res.status).toHaveBeenCalledWith(
        STATUS_CODES.INTERNAL_SERVER_ERROR
      );
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: ERROR_MESSAGES,
        statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
      });
    });
  });
});
