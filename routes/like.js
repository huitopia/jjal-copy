const express = require('express');
const router = express.Router();
const Like = require('../models/Likes');
const Post = require('../models/Post');
const middleware = require('../middleware/auth-middleware');

// 해당 게시물 좋아요 추가 기능
router.post('/likes', middleware, async (req, res) => {
  const { postId } = req.body;
  const {userId} = req.body;     //body값으로 받기
  try {
    await Like.create({ userId, postId });
    const post = await Post.findOne({ postId }, { _id: false }); // 게시물 카운터
    const postLikeCnt = post.postLikeCnt + 1;

    await Post.updateOne({ postId }, { $set: { postLikeCnt } });
    return res
      .status(200)
      .json({ success: true, postLikeCnt, msg: '좋아요 추가!' });
  } catch (err) {
    console.log('좋아요 추가 기능에서 발생한 에러', err);
    return res
      .status(500)
      .json({ success: false, msg: '예상치 못한 에러가 발생했습니다.' });
  }
});

//좋아요 취소 기능
router.delete('/likes', middleware, async (req, res) => {
  const { postId } = req.body;
  const {userId} = req.body;
  try {
    await Like.deleteOne({ userId, postId });
    const post = await Post.findOne({ postId }, { _id: false });
    // likeCnt가 0인 경우, 내보내기
    if (post.postLikeCnt == 0) {
      return res
        .status(200)
        .json({ success: false, postLikeCnt, msg: '잘못된 접근!' });
    }
    const postLikeCnt = post.postLikeCnt - 1;

    await Post.updateOne({ postId }, { $set: { postLikeCnt } });
    return res
      .status(200)
      .json({ success: true, postLikeCnt, msg: '좋아요 취소!' });
  } catch (err) {
    console.log('좋아요 취소 기능에서 발생한 에러', err);
    return res
      .status(500)
      .json({ success: false, msg: '예상치 못한 에러가 발생했습니다.' });
  }
});
module.exports = router;