const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const ProfileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    mbti: {
      type: String,
    },
    enneagram: {
      type: String,
      default: '',
    },
    variant: {
      type: String,
      default: '',
    },
    tritype: {
      type: Number,
    },
    socionics: {
      type: String,
      default: '',
    },
    sloan: {
      type: String,
      default: '',
    },
    psyche: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

ProfileSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Profile', ProfileSchema);
