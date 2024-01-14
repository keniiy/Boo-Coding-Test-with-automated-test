const CommentService = require('../../../../app/comment/commentService');
const { CommentRepo, ProfileRepo } = require('../../../../database/repository');
const { STATUS_CODES, ERROR_MESSAGES } = require('../../../../utils/constant');

jest.mock('../../../../database/repository/index');

const logger = require('../../mocks/logger');
describe('Comment Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('createCommentService', () => {
    const mockData = {
      profileId: '123',
      userId: '456',
      commentText: 'Great post!',
    };

    it('should return success response when a comment is created successfully', async () => {
      ProfileRepo.getById.mockResolvedValueOnce({ id: '123' });
      ProfileRepo.getById.mockResolvedValueOnce({ id: '456' });
      CommentRepo.create.mockResolvedValueOnce({ id: '789', ...mockData });

      const result = await CommentService.createCommentService(mockData);

      expect(ProfileRepo.getById).toHaveBeenCalledWith('123');
      expect(ProfileRepo.getById).toHaveBeenCalledWith('456');
      expect(CommentRepo.create).toHaveBeenCalledWith(mockData);
      expect(result.statusCode).toBe(STATUS_CODES.CREATED);
      expect(result.message).toBe('Comment created successfully');
      expect(result.data).toEqual({ id: '789', ...mockData });
    });

    it('should return error response when trying to self-comment', async () => {
      const selfCommentData = {
        profileId: '123',
        userId: '123',
        commentText: 'Great post!',
      };

      const result = await CommentService.createCommentService(selfCommentData);

      expect(result.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
      expect(result.message).toBe('You cannot self comment on your profile');
    });

    it('should return error response when profile is not found', async () => {
      ProfileRepo.getById.mockResolvedValueOnce(null); // Mock profile not found

      const result = await CommentService.createCommentService(mockData);

      expect(ProfileRepo.getById).toHaveBeenCalledWith('123');
      expect(result.statusCode).toBe(STATUS_CODES.NOT_FOUND);
      expect(result.message).toBe('Profile for comment not found');
    });

    it('should return error response when user is not found', async () => {
      ProfileRepo.getById.mockResolvedValueOnce({ id: '123' });
      ProfileRepo.getById.mockResolvedValueOnce(null);

      const result = await CommentService.createCommentService(mockData);

      expect(ProfileRepo.getById).toHaveBeenCalledWith('456');
      expect(result.statusCode).toBe(STATUS_CODES.NOT_FOUND);
      expect(result.message).toBe('User for comment not found');
    });

    it('should return error response when comment creation fails', async () => {
      ProfileRepo.getById.mockResolvedValueOnce({ id: '123' });
      ProfileRepo.getById.mockResolvedValueOnce({ id: '456' });
      CommentRepo.create.mockResolvedValueOnce(null);

      const result = await CommentService.createCommentService(mockData);

      expect(CommentRepo.create).toHaveBeenCalledWith(mockData);
      expect(result.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
      expect(result.message).toBe('Comment creation failed');
    });

    it('should throw an error when an unexpected error occurs', async () => {
      const errorMessage = 'Unexpected error';
      ProfileRepo.getById.mockRejectedValueOnce(new Error(errorMessage));

      await expect(
        CommentService.createCommentService(mockData)
      ).rejects.toThrow(errorMessage);
    });
  });

  describe('updateCommentService', () => {
    const mockData = { commentId: '123', updatedText: 'Updated comment' };

    it('should return success response when a comment is updated successfully', async () => {
      CommentRepo.get.mockResolvedValueOnce({ id: '123', ...mockData });
      CommentRepo.update.mockResolvedValueOnce({ id: '123', ...mockData });

      const result = await CommentService.updateCommentService(mockData);

      expect(CommentRepo.get).toHaveBeenCalledWith('123');
      expect(CommentRepo.update).toHaveBeenCalledWith('123', {
        updatedText: 'Updated comment',
      });
      expect(result.statusCode).toBe(STATUS_CODES.SUCCESS);
      expect(result.message).toBe('Comment updated successfully');
      expect(result.data).toEqual({ id: '123', ...mockData });
    });

    it('should return error response when comment is not found', async () => {
      CommentRepo.get.mockResolvedValueOnce(null);

      const result = await CommentService.updateCommentService(mockData);

      expect(CommentRepo.get).toHaveBeenCalledWith('123');
      expect(result.statusCode).toBe(STATUS_CODES.NOT_FOUND);
      expect(result.message).toBe('Comment not found');
    });

    it('should return error response when comment update fails', async () => {
      CommentRepo.get.mockResolvedValueOnce({ id: '123', ...mockData });
      CommentRepo.update.mockResolvedValueOnce(null);

      const result = await CommentService.updateCommentService(mockData);

      expect(CommentRepo.update).toHaveBeenCalledWith('123', {
        updatedText: 'Updated comment',
      });
      expect(result.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
      expect(result.message).toBe('Comment update failed');
    });

    it('should throw an error when an unexpected error occurs', async () => {
      const errorMessage = 'Unexpected error';
      CommentRepo.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(
        CommentService.updateCommentService(mockData)
      ).rejects.toThrow(errorMessage);
    });
  });

  describe('getCommentService', () => {
    const mockData = { commentId: '123' };

    it('should return success response when a comment is fetched successfully', async () => {
      CommentRepo.get.mockResolvedValueOnce({
        id: '123',
        commentText: 'Sample comment',
      });

      const result = await CommentService.getCommentService(mockData);

      expect(CommentRepo.get).toHaveBeenCalledWith('123');
      expect(result.statusCode).toBe(STATUS_CODES.SUCCESS);
      expect(result.message).toBe('Comment fetched successfully');
      expect(result.data).toEqual({
        id: '123',
        commentText: 'Sample comment',
      });
    });

    it('should return error response when comment is not found', async () => {
      CommentRepo.get.mockResolvedValueOnce(null);

      const result = await CommentService.getCommentService(mockData);

      expect(CommentRepo.get).toHaveBeenCalledWith('123');
      expect(result.statusCode).toBe(STATUS_CODES.NOT_FOUND);
      expect(result.message).toBe('Comment not found');
    });
  });

  describe('deleteCommentService', () => {
    const mockData = { commentId: '123' };

    it('should return success response when a comment is deleted successfully', async () => {
      CommentRepo.get.mockResolvedValueOnce({ id: '123' });
      CommentRepo.delete.mockResolvedValueOnce(true);

      const result = await CommentService.deleteCommentService(mockData);

      expect(CommentRepo.get).toHaveBeenCalledWith('123');
      expect(CommentRepo.delete).toHaveBeenCalledWith('123');
      expect(result.statusCode).toBe(STATUS_CODES.SUCCESS);
      expect(result.message).toBe('Comment deleted successfully');
    });

    it('should return error response when comment is not found', async () => {
      CommentRepo.get.mockResolvedValueOnce(null);

      const result = await CommentService.deleteCommentService(mockData);

      expect(CommentRepo.get).toHaveBeenCalledWith('123');
      expect(result.statusCode).toBe(STATUS_CODES.NOT_FOUND);
      expect(result.message).toBe('Comment not found');
    });
  });

  describe('likeCommentService', () => {
    const mockData = { commentId: '123', userId: '456' };

    it('should return success response when a comment is liked successfully', async () => {
      CommentRepo.get.mockResolvedValueOnce({ id: '123' });
      ProfileRepo.getById.mockResolvedValueOnce({ id: '456' });
      CommentRepo.isLiked.mockResolvedValueOnce(false);
      CommentRepo.like.mockResolvedValueOnce(true);

      const result = await CommentService.likeCommentService(mockData);

      expect(CommentRepo.get).toHaveBeenCalledWith('123');
      expect(ProfileRepo.getById).toHaveBeenCalledWith('456');
      expect(CommentRepo.isLiked).toHaveBeenCalledWith('123', '456');
      expect(CommentRepo.like).toHaveBeenCalledWith('123', '456');
      expect(result.statusCode).toBe(STATUS_CODES.SUCCESS);
      expect(result.message).toBe('Comment liked successfully');
    });

    it('should return error response when comment is not found', async () => {
      CommentRepo.get.mockResolvedValueOnce(null);

      const result = await CommentService.likeCommentService(mockData);

      expect(CommentRepo.get).toHaveBeenCalledWith('123');
      expect(result.statusCode).toBe(STATUS_CODES.NOT_FOUND);
      expect(result.message).toBe('Comment not found');
    });

    it('should return error response when user is not found', async () => {
      CommentRepo.get.mockResolvedValueOnce({ id: '123' });

      const result = await CommentService.likeCommentService(mockData);

      expect(ProfileRepo.getById).toHaveBeenCalledWith('456');
      expect(result.statusCode).toBe(STATUS_CODES.NOT_FOUND);
      expect(result.message).toBe('User for comment not found');
    });

    it('should return error response when comment is already liked', async () => {
      CommentRepo.get.mockResolvedValueOnce({ id: '123' });
      ProfileRepo.getById.mockResolvedValueOnce({ id: '456' });
      CommentRepo.isLiked.mockResolvedValueOnce(true);

      const result = await CommentService.likeCommentService(mockData);

      expect(CommentRepo.isLiked).toHaveBeenCalledWith('123', '456');
      expect(result.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
      expect(result.message).toBe('Comment already liked');
    });
  });

  describe('likeCommentService', () => {
    const mockData = { commentId: '123', userId: '456' };

    it('should return success response when a comment is liked successfully', async () => {
      CommentRepo.get.mockResolvedValueOnce({ id: '123' });
      ProfileRepo.getById.mockResolvedValueOnce({ id: '456' });
      CommentRepo.isLiked.mockResolvedValueOnce(false);
      CommentRepo.like.mockResolvedValueOnce(true);

      const result = await CommentService.likeCommentService(mockData);

      expect(CommentRepo.get).toHaveBeenCalledWith('123');
      expect(ProfileRepo.getById).toHaveBeenCalledWith('456');
      expect(CommentRepo.isLiked).toHaveBeenCalledWith('123', '456');
      expect(CommentRepo.like).toHaveBeenCalledWith('123', '456');
      expect(result.statusCode).toBe(STATUS_CODES.SUCCESS);
      expect(result.message).toBe('Comment liked successfully');
    });

    it('should return error response when comment is not found', async () => {
      CommentRepo.get.mockResolvedValueOnce(null);

      const result = await CommentService.unlikeCommentService(mockData);

      expect(CommentRepo.get).toHaveBeenCalledWith('123');
      expect(result.statusCode).toBe(STATUS_CODES.NOT_FOUND);
      expect(result.message).toBe('Comment not found');
    });

    it('should return error response when user is not found', async () => {
      CommentRepo.get.mockResolvedValueOnce({ id: '123' }); // Mock comment exists
      ProfileRepo.getById.mockResolvedValueOnce(null); // Mock user not found

      const result = await CommentService.unlikeCommentService(mockData);

      expect(ProfileRepo.getById).toHaveBeenCalledWith('456');
      expect(result.statusCode).toBe(STATUS_CODES.NOT_FOUND);
      expect(result.message).toBe('User for comment not found');
    });

    it('should return error response when comment is not liked', async () => {
      CommentRepo.get.mockResolvedValueOnce({ id: '123' });
      ProfileRepo.getById.mockResolvedValueOnce({ id: '456' });
      CommentRepo.isLiked.mockResolvedValueOnce(false);

      const result = await CommentService.unlikeCommentService(mockData);

      expect(CommentRepo.isLiked).toHaveBeenCalledWith('123', '456');
      expect(result.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
      expect(result.message).toBe('Comment not liked');
    });
  });

  describe('unlikeCommentService', () => {
    const mockData = { commentId: '123', userId: '456' };

    it('should return success response when a comment is unliked successfully', async () => {
      CommentRepo.get.mockResolvedValueOnce({ id: '123' });
      ProfileRepo.getById.mockResolvedValueOnce({ id: '456' });
      CommentRepo.isLiked.mockResolvedValueOnce(true);
      CommentRepo.unlike.mockResolvedValueOnce(true);

      const result = await CommentService.unlikeCommentService(mockData);

      expect(CommentRepo.get).toHaveBeenCalledWith('123');
      expect(ProfileRepo.getById).toHaveBeenCalledWith('456');
      expect(CommentRepo.isLiked).toHaveBeenCalledWith('123', '456');
      expect(CommentRepo.unlike).toHaveBeenCalledWith('123', '456');
      expect(result.statusCode).toBe(STATUS_CODES.SUCCESS);
      expect(result.message).toBe('Comment unlike successfully');
    });
  });

  describe('getCommentsService', () => {
    const mockData = {};

    it('should return success response when comments are fetched successfully', async () => {
      CommentRepo.getAll.mockResolvedValueOnce([
        { id: '123', commentText: 'Sample comment' },
      ]);

      const result = await CommentService.getCommentsService(mockData);

      expect(CommentRepo.getAll).toHaveBeenCalledWith(mockData);
      expect(result.statusCode).toBe(STATUS_CODES.SUCCESS);
      expect(result.message).toBe('Comments fetched successfully');
      expect(result.data).toEqual([
        { id: '123', commentText: 'Sample comment' },
      ]);
    });

    it('should throw an error when an unexpected error occurs', async () => {
      const errorMessage = 'Unexpected error';
      CommentRepo.getAll.mockRejectedValueOnce(new Error(errorMessage));

      await expect(CommentService.getCommentsService(mockData)).rejects.toThrow(
        errorMessage
      );
    });
  });
});
