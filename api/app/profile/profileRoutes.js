const express = require('express');
const router = express.Router();
const validate = require('../../validation/validatorClass');
const {
  profileSchema,
  getProfileSchema,
  profileIdSchema,
  updateProfileSchema,
} = require('./profileValidation');
const ProfileController = require('./profileController');

router.post(
  '/',
  validate(profileSchema),
  ProfileController.createProfileController
);

router.get(
  '/',
  validate(getProfileSchema),
  ProfileController.getProfilesController
);

router.get(
  '/:id',
  validate(profileIdSchema),
  ProfileController.getProfileController
);

router.put(
  '/:id',
  validate(updateProfileSchema),
  ProfileController.updateProfileController
);

router.delete(
  '/:id',
  validate(profileIdSchema),
  ProfileController.deleteProfileController
);

module.exports = router;
