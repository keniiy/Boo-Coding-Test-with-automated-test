const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { COMMENT_TYPE_ENUM } = require('../../utils/constant');

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // user who commented
      ref: 'Profile',
      required: true,
    },
    profileId: {
      type: mongoose.Schema.Types.ObjectId, // user whose profile is commented on
      ref: 'Profile',
      required: true,
    },
    type: [
      {
        type: String,
        enum: Object.values(COMMENT_TYPE_ENUM),
        required: true,
      },
    ],
    text: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    likesBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
      },
    ],
  },
  {
    timestamps: true,
  }
);

CommentSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Comment', CommentSchema);
