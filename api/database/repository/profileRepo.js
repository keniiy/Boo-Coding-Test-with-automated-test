const { ProfileModel } = require('../models/index');

/**
 * @fileOverview ProfileRepo class handles all database operations for the Profile model
 */

class ProfileRepo {
  /**
   * @description Create a new Profile
   * @param {Object} data - Profile data
   * @returns {Promise<Object|null>} - Promise resolving to new Profile object
   */
  static async create(data) {
    const user = await ProfileModel.create(data);
    return user;
  }

  /**
   * @description Get all Profiles
   * @param {Object} data - Query data
   * @returns {Promise<Object|null>} - Promise resolving to new Profile object
   */
  static async getAll(data) {
    const { page, limit } = data;
    const options = {
      page: page || 1,
      limit: limit || 10,
    };

    return await ProfileModel.paginate({}, options);
  }

  /**
   * @description Get a Profile by id
   * @param {string} id - Profile id
   * @returns {Promise<Object|null>} - Promise resolving to new Profile object
   */
  static async getById(id) {
    return await ProfileModel.findById(id);
  }

  /**
   * @description find a Profile by username
   * @param {string} username - Profile username
   * @returns {Promise<Object|null>} - Promise resolving to new Profile object
   */
  static async getByName(name) {
    return await ProfileModel.findOne({ name });
  }

  /**
   * @description Update a Profile
   * @param {string} id - Profile id
   * @param {Object} data - Profile data
   * @returns {Promise<Object|null>} - Promise resolving to new Profile object
   */
  static async updateById(id, data) {
    return await ProfileModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
  }

  /**
   * @description Delete a Profile
   * @param {string} id - Profile id
   * @returns {Promise<Object|null>} - Promise resolving to new Profile object
   */
  static async deleteById(id) {
    return await ProfileModel.findByIdAndDelete(id);
  }
}

module.exports = ProfileRepo;
