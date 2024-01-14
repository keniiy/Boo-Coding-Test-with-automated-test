const mongoose = require('mongoose');
const { CommentModel } = require('../../../../database/models/index');
const CommentRepo = require('../../../../database/repository/commentRepo');

mongoose.connect = jest.fn();
mongoose.createConnection = jest.fn();
mongoose.model = jest.fn();
mongoose.Schema = jest.fn();

jest.mock('../../../../database/models/index');

describe('CommentRepo', () => {
  describe('create', () => {
    it('should create a comment successfully', async () => {
      const mockData = {
        text: 'Test Comment',
        userId: '123',
        profileId: '456',
      };
      CommentModel.create.mockResolvedValue(mockData);

      const result = await CommentRepo.create(mockData);

      expect(CommentModel.create).toHaveBeenCalledWith(mockData);
      expect(result).toEqual(mockData);
    });
  });

  describe('update', () => {
    it('should update a comment successfully', async () => {
      const mockData = { text: 'Updated Comment' };
      const commentId = '123';
      CommentModel.findByIdAndUpdate.mockResolvedValue(mockData);

      const result = await CommentRepo.update(commentId, mockData);

      expect(CommentModel.findByIdAndUpdate).toHaveBeenCalledWith(
        commentId,
        { $set: mockData },
        { new: true }
      );
      expect(result).toEqual(mockData);
    });
  });

  describe('get', () => {
    it('should retrieve a comment successfully', async () => {
      const commentId = '123';
      const mockComment = {
        text: 'Test Comment',
        userId: '123',
        profileId: '456',
      };
      CommentModel.findById.mockResolvedValue(mockComment);

      const result = await CommentRepo.get(commentId);

      expect(CommentModel.findById).toHaveBeenCalledWith(commentId);
      expect(result).toEqual(mockComment);
    });
  });

  describe('delete', () => {
    it('should delete a comment successfully', async () => {
      const commentId = '123';
      CommentModel.findByIdAndDelete.mockResolvedValue({});

      const result = await CommentRepo.delete(commentId);

      expect(CommentModel.findByIdAndDelete).toHaveBeenCalledWith(commentId);
      expect(result).toEqual({});
    });
  });

  describe('isLiked', () => {
    it('should check if a comment is liked by a user', async () => {
      const commentId = '123';
      const userId = '456';
      CommentModel.findOne.mockResolvedValue(true);

      const result = await CommentRepo.isLiked(commentId, userId);

      expect(CommentModel.findOne).toHaveBeenCalledWith({
        _id: commentId,
        likesBy: userId,
      });
      expect(result).toBeTruthy();
    });
  });

  describe('like', () => {
    it('should like a comment successfully', async () => {
      const commentId = '123';
      const userId = '456';
      const mockUpdate = { likes: 1 };
      CommentModel.findByIdAndUpdate.mockResolvedValue(mockUpdate);

      const result = await CommentRepo.like(commentId, userId);

      expect(CommentModel.findByIdAndUpdate).toHaveBeenCalledWith(
        commentId,
        { $inc: { likes: 1 }, $push: { likesBy: userId } },
        { new: true }
      );
      expect(result).toEqual(mockUpdate);
    });
  });

  describe('unlike', () => {
    it('should unlike a comment successfully', async () => {
      const commentId = '123';
      const userId = '456';
      const mockUpdate = { likes: 0 };
      CommentModel.findByIdAndUpdate.mockResolvedValue(mockUpdate);

      const result = await CommentRepo.unlike(commentId, userId);

      expect(CommentModel.findByIdAndUpdate).toHaveBeenCalledWith(
        commentId,
        { $inc: { likes: -1 }, $pull: { likesBy: userId } },
        { new: true }
      );
      expect(result).toEqual(mockUpdate);
    });
  });

  describe('getAll', () => {
    it('should retrieve all comments successfully', async () => {
      const query = {
        profileId: new mongoose.Types.ObjectId(),
        userId: new mongoose.Types.ObjectId(),
        page: 1,
        limit: 10,
        sortBy: 'best',
      };
      const mockComments = [
        { text: 'Comment 1' },
        {
          text: 'Comment 2',
        },
      ];
      CommentModel.aggregate.mockResolvedValue(mockComments);
      CommentModel.distinct.mockResolvedValue(['type1', 'type2']);
      CommentModel.countDocuments.mockResolvedValue(2);

      const result = await CommentRepo.getAll(query);

      expect(CommentModel.aggregate).toHaveBeenCalled();
      expect(CommentModel.distinct).toHaveBeenCalledWith('type', {
        profileId: expect.any(mongoose.Types.ObjectId),
      });
      expect(CommentModel.countDocuments).toHaveBeenCalledWith({
        profileId: expect.any(mongoose.Types.ObjectId),
      });

      expect(result).toEqual({
        docs: mockComments,
        types: ['type1', 'type2'],
        totalDocs: 2,
        limit: 10,
        totalPages: 1,
        page: 1,
        pagingCounter: 1,
        hasPrevPage: false,
        hasNextPage: false,
      });
    });
  });
});
