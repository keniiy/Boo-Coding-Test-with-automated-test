const mongoose = require('mongoose');
const { ProfileModel } = require('../../../../database/models/index');
const { ProfileRepo } = require('../../../../database/repository/index');

mongoose.connect = jest.fn();
mongoose.createConnection = jest.fn();
mongoose.model = jest.fn();
mongoose.Schema = jest.fn();

describe('ProfileRepo', () => {
  beforeAll(() => {
    mongoose.connect.mockResolvedValue();
    mongoose.createConnection.mockReturnValue({ model: jest.fn() });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('create', () => {
    it('should create a new Profile', async () => {
      const mockProfileData = { name: 'John Doe', email: 'john@example.com' };
      const mockCreatedProfile = { ...mockProfileData, _id: '12345' };

      ProfileModel.create = jest.fn().mockResolvedValue(mockCreatedProfile);

      const result = await ProfileRepo.create(mockProfileData);

      expect(ProfileModel.create).toHaveBeenCalledWith(mockProfileData);
      expect(result).toEqual(mockCreatedProfile);
    });
  });

  describe('getAll', () => {
    it('should get all Profiles with pagination', async () => {
      const mockQueryData = { page: 2, limit: 20 };
      const mockProfiles = [{ name: 'Profile 1' }, { name: 'Profile 2' }];
      const mockPaginationResult = {
        docs: mockProfiles,
        page: 2,
        limit: 20,
        totalDocs: 100,
      };

      ProfileModel.paginate = jest.fn().mockResolvedValue(mockPaginationResult);

      const result = await ProfileRepo.getAll(mockQueryData);

      expect(ProfileModel.paginate).toHaveBeenCalledWith({}, mockQueryData);
      expect(result).toEqual(mockPaginationResult);
    });
  });

  describe('getById', () => {
    it('should get a Profile by id', async () => {
      const mockProfileId = '12345';
      const mockProfile = { name: 'John Doe', _id: mockProfileId };

      ProfileModel.findById = jest.fn().mockResolvedValue(mockProfile);

      const result = await ProfileRepo.getById(mockProfileId);

      expect(ProfileModel.findById).toHaveBeenCalledWith(mockProfileId);
      expect(result).toEqual(mockProfile);
    });
  });

  describe('getByName', () => {
    it('should find a Profile by username', async () => {
      const mockUsername = 'johndoe';
      const mockProfile = { name: 'John Doe', username: mockUsername };

      ProfileModel.findOne = jest.fn().mockResolvedValue(mockProfile);

      const result = await ProfileRepo.getByName(mockUsername);

      expect(ProfileModel.findOne).toHaveBeenCalledWith({ name: mockUsername });
      expect(result).toEqual(mockProfile);
    });
  });

  describe('updateById', () => {
    it('should update a Profile by id', async () => {
      const mockProfileId = '12345';
      const mockUpdatedProfile = {
        name: 'Updated John Doe',
        _id: mockProfileId,
      };

      ProfileModel.findByIdAndUpdate = jest
        .fn()
        .mockResolvedValue(mockUpdatedProfile);

      const result = await ProfileRepo.updateById(mockProfileId, {
        name: 'Updated John Doe',
      });

      expect(ProfileModel.findByIdAndUpdate).toHaveBeenCalledWith(
        mockProfileId,
        { $set: { name: 'Updated John Doe' } },
        { new: true }
      );
      expect(result).toEqual(mockUpdatedProfile);
    });
  });

  describe('deleteById', () => {
    it('should delete a Profile by id', async () => {
      const mockProfileId = '12345';

      ProfileModel.findByIdAndDelete = jest.fn().mockResolvedValue(null);

      const result = await ProfileRepo.deleteById(mockProfileId);

      expect(ProfileModel.findByIdAndDelete).toHaveBeenCalledWith(
        mockProfileId
      );
      expect(result).toBeNull();
    });
  });
});
