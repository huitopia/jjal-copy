
const mongoose = require('mongoose');

const { Schema } = mongoose;

const likeSchema = new Schema({
  postId: {
    type: String,
    required: true,
    unique: false,
  },
  userId: {
    type: String,
    required: true,
    unique: false,
  },
});

module.exports = mongoose.model('Like', likeSchema);