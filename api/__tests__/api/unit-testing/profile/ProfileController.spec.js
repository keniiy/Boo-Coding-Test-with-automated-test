const ProfileService = require('../../../../app/profile/profileService');
const ProfileController = require('../../../../app/profile/profileController');
const { STATUS_CODES, ERROR_MESSAGES } = require('../../../../utils/constant');
const logger = require('../../mocks/logger');

jest.mock('../../../../app/profile/profileService');

describe('Profile Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createProfileController', () => {
    it('should return success response when a profile is created successfully', async () => {
      const req = {
        protocol: 'http',
        get: jest.fn(() => 'localhost'),
        body: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockProfileData = {};
      ProfileService.createProfileService = jest.fn().mockResolvedValue({
        statusCode: STATUS_CODES.CREATED,
        message: 'Profile created Successfully',
        data: mockProfileData,
      });

      await ProfileController.createProfileController(req, res);

      expect(ProfileService.createProfileService).toHaveBeenCalledWith(
        req.body
      );

      expect(res.status).toHaveBeenCalledWith(STATUS_CODES.CREATED);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'Profile Created Successfully',
        statusCode: STATUS_CODES.CREATED,
        data: mockProfileData,
      });
    });

    it('should return error response when profile creation fails', async () => {
      const req = {
        protocol: 'http',
        get: jest.fn(() => 'localhost'),
        body: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      ProfileService.createProfileService = jest.fn().mockResolvedValue({
        statusCode: STATUS_CODES.BAD_REQUEST,
        message: 'Profile Creation Failed',
      });

      await ProfileController.createProfileController(req, res);

      expect(ProfileService.createProfileService).toHaveBeenCalledWith(
        req.body
      );

      expect(res.status).toHaveBeenCalledWith(STATUS_CODES.BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Profile Creation Failed',
        statusCode: STATUS_CODES.BAD_REQUEST,
      });
    });

    it('should return error response when an error occurs', async () => {
      const req = {
        protocol: 'http',
        get: jest.fn(() => 'localhost'),
        body: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      ProfileService.createProfileService = jest
        .fn()
        .mockRejectedValue(new Error('Some error'));

      await ProfileController.createProfileController(req, res);

      expect(ProfileService.createProfileService).toHaveBeenCalledWith(
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

  describe('getProfilesController', () => {
    it('should return success response when profiles are fetched successfully', async () => {
      const req = {
        query: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockProfiles = [];
      ProfileService.getProfilesService = jest.fn().mockResolvedValue({
        statusCode: STATUS_CODES.SUCCESS,
        message: 'Profiles Fetched Successfully',
        data: mockProfiles,
      });

      await ProfileController.getProfilesController(req, res);

      expect(ProfileService.getProfilesService).toHaveBeenCalledWith(req.query);

      expect(res.status).toHaveBeenCalledWith(STATUS_CODES.SUCCESS);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'Profiles Fetched Successfully',
        statusCode: STATUS_CODES.SUCCESS,
        data: mockProfiles,
      });
    });

    it('should return error response when profiles fetch fails', async () => {
      const req = {
        query: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      ProfileService.getProfilesService = jest.fn().mockResolvedValue({
        statusCode: STATUS_CODES.BAD_REQUEST,
        message: 'Profiles Fetch Failed',
      });

      await ProfileController.getProfilesController(req, res);

      expect(ProfileService.getProfilesService).toHaveBeenCalledWith(req.query);

      expect(res.status).toHaveBeenCalledWith(STATUS_CODES.BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Profiles Fetch Failed',
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

      ProfileService.getProfilesService = jest
        .fn()
        .mockRejectedValue(new Error('Some error'));

      await ProfileController.getProfilesController(req, res);

      expect(ProfileService.getProfilesService).toHaveBeenCalledWith(req.query);

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

  describe('getProfileController', () => {
    it('should return success response when profile is fetched successfully', async () => {
      const req = {
        params: { id: 'profileId' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockProfileData = {
        /* mock profile data */
      };
      ProfileService.getProfileService = jest.fn().mockResolvedValue({
        statusCode: STATUS_CODES.SUCCESS,
        message: 'Profile Fetched Successfully',
        data: mockProfileData,
      });

      await ProfileController.getProfileController(req, res);

      expect(ProfileService.getProfileService).toHaveBeenCalledWith({
        id: req.params.id,
      });

      expect(res.status).toHaveBeenCalledWith(STATUS_CODES.SUCCESS);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'Profile Fetched Successfully',
        statusCode: STATUS_CODES.SUCCESS,
        data: mockProfileData,
      });
    });

    it('should return error response when profile fetch fails', async () => {
      const req = {
        params: { id: 'profileId' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      ProfileService.getProfileService = jest.fn().mockResolvedValue({
        statusCode: STATUS_CODES.BAD_REQUEST,
        message: 'Profile Fetch Failed',
      });

      await ProfileController.getProfileController(req, res);

      expect(ProfileService.getProfileService).toHaveBeenCalledWith({
        id: req.params.id,
      });

      expect(res.status).toHaveBeenCalledWith(STATUS_CODES.BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Profile Fetch Failed',
        statusCode: STATUS_CODES.BAD_REQUEST,
      });
    });

    it('should return error response when an error occurs', async () => {
      const req = {
        params: { id: 'profileId' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      ProfileService.getProfileService = jest
        .fn()
        .mockRejectedValue(new Error('Some error'));

      await ProfileController.getProfileController(req, res);

      expect(ProfileService.getProfileService).toHaveBeenCalledWith({
        id: req.params.id,
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

  describe('updateProfileController', () => {
    it('should return success response when profile is updated successfully', async () => {
      const req = {
        params: { id: 'profileId' },
        body: {
          /* mock profile data to update */
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockUpdatedProfileData = {
        /* mock updated profile data */
      };
      ProfileService.updateProfileService = jest.fn().mockResolvedValue({
        statusCode: STATUS_CODES.SUCCESS,
        message: 'Profile Updated Successfully',
        data: mockUpdatedProfileData,
      });

      await ProfileController.updateProfileController(req, res);

      expect(ProfileService.updateProfileService).toHaveBeenCalledWith({
        id: req.params.id,
        data: req.body,
      });

      expect(res.status).toHaveBeenCalledWith(STATUS_CODES.SUCCESS);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'Profile Updated Successfully',
        statusCode: STATUS_CODES.SUCCESS,
        data: mockUpdatedProfileData,
      });
    });

    it('should return error response when profile update fails', async () => {
      const req = {
        params: { id: 'profileId' },
        body: {
          /* mock profile data to update */
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      ProfileService.updateProfileService = jest.fn().mockResolvedValue({
        statusCode: STATUS_CODES.BAD_REQUEST,
        message: 'Profile Update Failed',
      });

      await ProfileController.updateProfileController(req, res);

      expect(ProfileService.updateProfileService).toHaveBeenCalledWith({
        id: req.params.id,
        data: req.body,
      });

      expect(res.status).toHaveBeenCalledWith(STATUS_CODES.BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Profile Update Failed',
        statusCode: STATUS_CODES.BAD_REQUEST,
      });
    });

    it('should return error response when an error occurs', async () => {
      const req = {
        params: { id: 'profileId' },
        body: {
          /* mock profile data to update */
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      ProfileService.updateProfileService = jest
        .fn()
        .mockRejectedValue(new Error('Some error'));

      await ProfileController.updateProfileController(req, res);

      expect(ProfileService.updateProfileService).toHaveBeenCalledWith({
        id: req.params.id,
        data: req.body,
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

  describe('deleteProfileController', () => {
    it('should return success response when profile is deleted successfully', async () => {
      const req = {
        params: { id: 'profileId' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockDeletedProfileData = {
        /* mock deleted profile data */
      };
      ProfileService.deleteProfileService = jest.fn().mockResolvedValue({
        statusCode: STATUS_CODES.SUCCESS,
        message: 'Profile Deleted Successfully',
        data: mockDeletedProfileData,
      });

      await ProfileController.deleteProfileController(req, res);

      expect(ProfileService.deleteProfileService).toHaveBeenCalledWith({
        id: req.params.id,
      });

      expect(res.status).toHaveBeenCalledWith(STATUS_CODES.SUCCESS);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'Profile Deleted Successfully',
        statusCode: STATUS_CODES.SUCCESS,
        data: mockDeletedProfileData,
      });
    });

    it('should return error response when profile deletion fails', async () => {
      const req = {
        params: { id: 'profileId' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      ProfileService.deleteProfileService = jest.fn().mockResolvedValue({
        statusCode: STATUS_CODES.BAD_REQUEST,
        message: 'Profile Deletion Failed',
      });

      await ProfileController.deleteProfileController(req, res);

      expect(ProfileService.deleteProfileService).toHaveBeenCalledWith({
        id: req.params.id,
      });

      expect(res.status).toHaveBeenCalledWith(STATUS_CODES.BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Profile Deletion Failed',
        statusCode: STATUS_CODES.BAD_REQUEST,
      });
    });

    it('should return error response when an error occurs', async () => {
      const req = {
        params: { id: 'profileId' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      ProfileService.deleteProfileService = jest
        .fn()
        .mockRejectedValue(new Error('Some error'));

      await ProfileController.deleteProfileController(req, res);

      expect(ProfileService.deleteProfileService).toHaveBeenCalledWith({
        id: req.params.id,
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
});
