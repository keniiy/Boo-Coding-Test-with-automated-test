const Joi = require('joi');

const profileSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  mbti: Joi.string(),
  enneagram: Joi.string(),
  variant: Joi.string(),
  tritype: Joi.number(),
  socionics: Joi.string(),
  sloan: Joi.string(),
  psyche: Joi.string(),
  image: Joi.string(),
});

const getProfileSchema = Joi.object({
  page: Joi.number().min(1),
  limit: Joi.number().min(10),
});

const profileIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const updateProfileSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
  name: Joi.string(),
  description: Joi.string(),
  mbti: Joi.string(),
  enneagram: Joi.string(),
  variant: Joi.string(),
  tritype: Joi.number(),
  socionics: Joi.string(),
  sloan: Joi.string(),
  psyche: Joi.string(),
  image: Joi.string(),
}).or(
  'name',
  'description',
  'mbti',
  'enneagram',
  'variant',
  'tritype',
  'socionics',
  'sloan',
  'psyche',
  'image'
);

module.exports = {
  profileSchema,
  getProfileSchema,
  profileIdSchema,
  updateProfileSchema,
};
