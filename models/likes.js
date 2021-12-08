const mongoose = require("mongoose");

const { Schema } = mongoose;
const likeSchema = new Schema({
  likeId: {
    type: Number,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  }
});
module.exports = mongoose.model("Like", likeSchema);