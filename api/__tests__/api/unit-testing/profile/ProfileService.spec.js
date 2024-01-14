const ProfileService = require('../../../../app/profile/profileService');
const { ProfileRepo } = require('../../../../database/repository/index');
const { STATUS_CODES, ERROR_MESSAGES } = require('../../../../utils/constant');
const logger = require('../../mocks/logger');

describe('Profile Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createProfileService', () => {
    it('should return success response when a profile is created successfully', async () => {
      const mockProfileData = {};
      ProfileRepo.create = jest.fn().mockResolvedValue(mockProfileData);

      const result = await ProfileService.createProfileService(mockProfileData);

      expect(ProfileRepo.create).toHaveBeenCalledWith(mockProfileData);

      expect(result.statusCode).toBe(STATUS_CODES.CREATED);
      expect(result.message).toBe('Profile created successfully');
      expect(result.data).toEqual(mockProfileData);
    });

    it('should return error response when profile creation fails', async () => {
      ProfileRepo.create = jest.fn().mockResolvedValue(null);

      const result = await ProfileService.createProfileService({});

      expect(ProfileRepo.create).toHaveBeenCalled();

      expect(result.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
      expect(result.message).toBe('Profile creation failed');
    });

    it('should throw an error when an error occurs', async () => {
      const errorMessage = 'Some error';
      ProfileRepo.create = jest.fn().mockRejectedValue(new Error(errorMessage));

      try {
        await ProfileService.createProfileService({});
      } catch (error) {
        expect(error.message).toBe(errorMessage);
      }
    });
  });

  describe('getProfilesService', () => {
    it('should return success response when profiles are fetched successfully', async () => {
      const mockProfilesData = {
        /* mock profiles data */
      };
      ProfileRepo.getAll = jest.fn().mockResolvedValue(mockProfilesData);

      const result = await ProfileService.getProfilesService({});

      expect(ProfileRepo.getAll).toHaveBeenCalledWith({});
      expect(result.statusCode).toBe(STATUS_CODES.SUCCESS);
      expect(result.message).toBe('Profiles fetched successfully');
      expect(result.data).toEqual(mockProfilesData);
    });

    it('should throw an error when an error occurs', async () => {
      const errorMessage = 'Some error';
      ProfileRepo.getAll = jest.fn().mockRejectedValue(new Error(errorMessage));

      try {
        await ProfileService.getProfilesService({});
      } catch (error) {
        expect(error.message).toBe(errorMessage);
      }
    });
  });

  describe('getProfileService', () => {
    it('should return success response when a profile is fetched successfully', async () => {
      const mockProfileData = {};
      ProfileRepo.getById = jest.fn().mockResolvedValue(mockProfileData);

      const result = await ProfileService.getProfileService({
        id: 'profileId',
      });

      expect(ProfileRepo.getById).toHaveBeenCalledWith('profileId');
      expect(result.statusCode).toBe(STATUS_CODES.SUCCESS);
      expect(result.message).toBe('Profile fetched successfully');
      expect(result.data).toEqual(mockProfileData);
    });

    it('should return error response when profile is not found', async () => {
      ProfileRepo.getById = jest.fn().mockResolvedValue(null);

      const result = await ProfileService.getProfileService({
        id: 'profileId',
      });

      expect(ProfileRepo.getById).toHaveBeenCalledWith('profileId');
      expect(result.statusCode).toBe(STATUS_CODES.NOT_FOUND);
      expect(result.message).toBe('Profile not found');
    });

    it('should throw an error when an error occurs', async () => {
      const errorMessage = 'Some error';
      ProfileRepo.getById = jest
        .fn()
        .mockRejectedValue(new Error(errorMessage));

      try {
        await ProfileService.getProfileService({ id: 'profileId' });
      } catch (error) {
        expect(error.message).toBe(errorMessage);
      }
    });
  });

  describe('updateProfileService', () => {
    it('should return success response when a profile is updated successfully', async () => {
      const mockProfileData = {
        data: {},
      };
      ProfileRepo.getById = jest.fn().mockResolvedValue(mockProfileData);
      ProfileRepo.updateById = jest.fn().mockResolvedValue(mockProfileData);

      const result = await ProfileService.updateProfileService({
        data: mockProfileData,
        id: 'profileId',
      });

      expect(ProfileRepo.getById).toHaveBeenCalledWith('profileId');
      expect(ProfileRepo.updateById).toHaveBeenCalled();
      expect(result.statusCode).toBe(STATUS_CODES.SUCCESS);
      expect(result.message).toBe('Profile updated successfully');
      expect(result.data).toEqual(mockProfileData);
    });

    it('should return error response when profile is not found for update', async () => {
      ProfileRepo.getById = jest.fn().mockResolvedValue(null);

      const result = await ProfileService.updateProfileService({
        id: 'profileId',
        data: {},
      });

      expect(ProfileRepo.getById).toHaveBeenCalledWith('profileId');
      expect(result.statusCode).toBe(STATUS_CODES.NOT_FOUND);
      expect(result.message).toBe('Profile not found');
    });

    it('should return error response when profile update fails', async () => {
      const mockProfileData = {};
      ProfileRepo.getById = jest.fn().mockResolvedValue(mockProfileData);
      ProfileRepo.updateById = jest.fn().mockResolvedValue(null);

      const result = await ProfileService.updateProfileService({
        id: 'profileId',
        data: mockProfileData,
      });

      expect(ProfileRepo.getById).toHaveBeenCalledWith('profileId');
      expect(result.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
      expect(result.message).toBe('Profile update failed');
    });

    it('should throw an error when an error occurs', async () => {
      const errorMessage = 'Some error';
      ProfileRepo.getById = jest.fn().mockResolvedValue({});
      ProfileRepo.updateById = jest
        .fn()
        .mockRejectedValue(new Error(errorMessage));

      try {
        await ProfileService.updateProfileService({
          id: 'profileId',
          data: {},
        });
      } catch (error) {
        expect(error.message).toBe(errorMessage);
      }
    });
  });

  describe('deleteProfileService', () => {
    it('should return success response when a profile is deleted successfully', async () => {
      const mockProfileData = {};
      ProfileRepo.getById = jest.fn().mockResolvedValue(mockProfileData);
      ProfileRepo.deleteById = jest.fn().mockResolvedValue({});

      const result = await ProfileService.deleteProfileService({
        id: 'profileId',
      });

      expect(ProfileRepo.getById).toHaveBeenCalledWith('profileId');
      expect(ProfileRepo.deleteById).toHaveBeenCalledWith('profileId');
      expect(result.statusCode).toBe(STATUS_CODES.SUCCESS);
      expect(result.message).toBe('Profile deleted successfully');
    });

    it('should return error response when profile is not found for deletion', async () => {
      ProfileRepo.getById = jest.fn().mockResolvedValue(null);

      const result = await ProfileService.deleteProfileService({
        id: 'profileId',
      });

      expect(ProfileRepo.getById).toHaveBeenCalledWith('profileId');
      expect(result.statusCode).toBe(STATUS_CODES.NOT_FOUND);
      expect(result.message).toBe('Profile not found');
    });

    it('should return error response when profile deletion fails', async () => {
      const mockProfileData = {
        /* mock profile data */
      };
      ProfileRepo.getById = jest.fn().mockResolvedValue(mockProfileData);
      ProfileRepo.deleteById = jest.fn().mockResolvedValue(null);

      const result = await ProfileService.deleteProfileService({
        id: 'profileId',
      });

      expect(ProfileRepo.getById).toHaveBeenCalledWith('profileId');
      expect(ProfileRepo.deleteById).toHaveBeenCalledWith('profileId');
      expect(result.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
      expect(result.message).toBe('Profile deletion failed');
    });

    it('should throw an error when an error occurs', async () => {
      const errorMessage = 'Some error';
      ProfileRepo.getById = jest.fn().mockResolvedValue({});
      ProfileRepo.deleteById = jest
        .fn()
        .mockRejectedValue(new Error(errorMessage));

      try {
        await ProfileService.deleteProfileService({
          id: 'profileId',
        });
      } catch (error) {
        expect(error.message).toBe(errorMessage);
      }
    });
  });
});
