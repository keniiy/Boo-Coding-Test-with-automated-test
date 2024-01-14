const { CommentModel } = require('../models');
const { COMMENT_SORT_BY_ENUM } = require('../../utils/constant');
const mongoose = require('mongoose');

/**
 * @fileOverview commentRepo.js handles all database operations for the Comment model
 */
class CommentRepo {
  /**
   * @description Create a new Comment
   * @param {Object} data - Comment data
   * @returns {Promise<Object|null>} - Promise resolving to new Comment object
   */
  static async create(data) {
    const comment = await CommentModel.create(data);
    return comment;
  }

  /**
   * @description Update a Comment
   * @param {String} id - Comment id
   * @param {Object} data - Comment data
   * @returns {Promise<Object|null>} - Promise resolving to updated Comment object
   */
  static async update(id, data) {
    return CommentModel.findByIdAndUpdate(id, { $set: data }, { new: true });
  }

  /**
   * @description Get a Comment by id
   * @param {String} id - Comment id
   * @returns {Promise<Object|null>} - Promise resolving to Comment object
   */
  static async get(id) {
    return await CommentModel.findById(id);
  }

  /**
   * @description Delete a Comment by id
   * @param {String} id - Comment id
   * @returns {Promise<Object|null>} - Promise resolving to deleted Comment object
   */
  static async delete(id) {
    return await CommentModel.findByIdAndDelete(id);
  }

  /**
   * @description Check user already liked the comment
   * @param {String} id - Comment id
   * @param { String } userId - User id of those who liked the comment
   * @returns {Promise<Object|null>} - Promise resolving to updated Comment object
   */
  static async isLiked(id, userId) {
    return CommentModel.findOne({ _id: id, likesBy: userId });
  }

  /**
   * @description Like a Comment and increment likes count also add user id to likesBy array
   * @param {String} id - Comment id
   * @param { String } userId - User id of those who liked the comment
   * @returns {Promise<Object|null>} - Promise resolving to updated Comment object
   */
  static async like(id, userId) {
    return CommentModel.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 }, $push: { likesBy: userId } },
      { new: true }
    );
  }

  /**
   * @description Unlike a Comment and decrement likes count also remove user id from likesBy array
   * @param {String} id - Comment id
   * @param { String } userId - User id of those who liked the comment
   * @returns {Promise<Object|null>} - Promise resolving to updated Comment object
   */
  static async unlike(id, userId) {
    return CommentModel.findByIdAndUpdate(
      id,
      { $inc: { likes: -1 }, $pull: { likesBy: userId } },
      { new: true }
    );
  }

  /**
   * @description Get all Comments
   * @param {Object} query - Query object
   * @returns {Promise<Object|null>} - Promise resolving to Comment object
   */
  static async getAll(query) {
    const profileId = new mongoose.Types.ObjectId(query.profileId);
    const userId = new mongoose.Types.ObjectId(query.userId);
    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 10;
    const sortBy =
      query.sortBy === COMMENT_SORT_BY_ENUM.BEST
        ? { likes: -1 }
        : { createdAt: -1 };

    const pipeline = [
      {
        $match: {
          profileId: profileId,
        },
      },
      {
        $addFields: {
          likedByUser: {
            $in: [userId, '$likesBy'],
          },
        },
      },
      {
        $sort: sortBy,
      },
      {
        $skip: (page - 1) * limit,
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: 'profiles',
          localField: 'userId',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      {
        $lookup: {
          from: 'profiles',
          localField: 'profileId',
          foreignField: '_id',
          as: 'profileDetails',
        },
      },
      {
        $unwind: {
          path: '$userDetails',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$profileDetails',
          preserveNullAndEmptyArrays: true,
        },
      },
    ];

    const comments = await CommentModel.aggregate(pipeline);

    const typesPromise = CommentModel.distinct('type', {
      profileId: profileId,
    });

    const countPromise = CommentModel.countDocuments({
      profileId: profileId,
    });

    const [types, totalDocs] = await Promise.all([typesPromise, countPromise]);

    return {
      docs: comments,
      types,
      totalDocs,
      limit,
      totalPages: Math.ceil(totalDocs / limit),
      page,
      pagingCounter: (page - 1) * limit + 1,
      hasPrevPage: page > 1,
      hasNextPage: page * limit < totalDocs,
    };
  }
}

module.exports = CommentRepo;
