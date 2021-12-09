
const mongoose = require('mongoose');

const { Schema } = mongoose;

const likeSchema = new Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'post', required: true 
  },
  userId: {
    type: String,
    required: true,
    unique: false,
  },
});

module.exports = mongoose.model('Like', likeSchema);