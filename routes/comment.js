const express = require('express');
const Comment = require('../models/Comments');
const User = require('../models/User');
const middleware = require('../middleware/auth-middleware');
const router = express.Router();



// 댓글 작성
router.post('/', middleware, async (req, res) => {
  const { commentVal } = req.body;
  const { userID } = req.body;
  const { postId } = req.body; // req.body로 받아온 data

  try {
    const recentComment = await Comment.find().sort("-commentId").limit(1); // 가장 최근 commentId 찾기
    let commentId = 1; //시작은 1부터
    if (recentComment.length !== 0) {
      //길이가 0이 아니면 최근걸 찾아서 +1
      commentId = recentComment[0]["commentId"] + 1;
    }

    const comments = new Comment({ userID, postId, commentVal, commentId });
    await comments.save(); // DB저장
    res.status(201).send({ message: "댓글등록 완료" });
  } catch (error) {
    res.status(400).send({ errormessage: "댓글등록중 오류발생" })
  }
  return;
});


// 댓글 불러오기
router.post("/detail", async (req, res) => {
  const { postId } = req.body
  const comment = await Comment.find({ postId }).sort("-commentId")
  res.json({ comment: comment })
})
// 댓글 삭제
router.delete('/detail', middleware, async (req, res) => {
  const { commentId } = req.body
  const { userID } = req.body

  const current_user = userID
  // console.log("current_user", current_user)
  const userComment = await Comment.findOne({ commentId })
  // console.log("userComment",userComment)
  const commentUserId = userComment["userID"]
  // console.log("commentUserId", commentUserId)

  if (current_user === commentUserId) {
    await Comment.deleteOne({ commentId })
    res.send({ succes: true })
  } else {
    res.send({ result: '로그인 후 이용하시오' })
  }
})

// 댓글 수정
router.put('/detail', middleware, async (req, res) => {
  const { commentId, commentVal } = req.body
  const { userID } = req.body

  const current_user = userID
  // console.log("current_user", current_user)
  const userComment = await Comment.findOne({ commentId })
  // console.log("userComment",userComment)
  const commentUserId = userComment["userID"]
  // console.log("commentUserId", commentUserId)

  if (current_user === commentUserId) {
    await Comment.updateOne({ commentId }, { $set: { commentVal } })
    res.send({ succes: true })
  } else {
    res.send({ errormessage: "수정중 오류가 발생했습니다." })
  }
})

module.exports = router;