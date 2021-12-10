const express = require('express');
const Comment = require('../models/Comments');
const User = require('../models/User');
const middleware = require('../middleware/auth-middleware');
const router = express.Router();



// 댓글 작성
router.post('/',  middleware, async (req, res) => {
  try{
    //const post= req.body
    const { postId } = req.body
    const { commentVal } = req.body
    const { userId } = req.body  //userId는 또 그냥 String으로 받을 수 있다 나는 이해가 안된다.....
    //console.log(post, commentVal);
    // const { user } = res.locals
    // const userId = user["userId"]

    const recentComment = await Comment.find().sort("-commentId").limit(1);

    let commentId = 1
    if (recentComment.length != 0) {
      commentId = recentComment[0]["commentId"] + 1
    }
    console.log(userId)
    console.log({userId})
    await Comment.create({ commentId, postId, userId, commentVal })
    res.send({ result: "success"})
  }catch(error){
    res.send(error)
    console.log(error);
  }
  return;
})

// 댓글 불러오기
router.post("/detail", async (req, res) => {
  const { postId } = req.body
  const comment = await Comment.find({ postId }).sort("-commentId")
  res.json({ comment: comment })
})
// 댓글 삭제
router.delete('/detail', middleware, async (req, res)=>{
  const { commentId } = req.body
  const { userId } = req.body

  const current_user = userId
  // console.log("current_user", current_user)
  const userComment = await Comment.findOne({ commentId })
  // console.log("userComment",userComment)
  const commentUserId = userComment["userId"]
  // console.log("commentUserId", commentUserId)

  if (current_user === commentUserId) {
    await Comment.deleteOne({ commentId })
    res.send({succes: true})
  } else {
    res.send({result: '로그인 후 이용하시오'})
  }
})

// 댓글 수정
router.put('/detail',middleware, async (req, res)=>{
  const { commentId, commentVal } = req.body
  const { userId } = req.body

  const current_user = userId
  // console.log("current_user", current_user)
  const userComment = await Comment.findOne({ commentId })
  // console.log("userComment",userComment)
  const commentUserId = userComment["userId"]
  // console.log("commentUserId", commentUserId)

  if (current_user === commentUserId) {
    await Comment.updateOne({ commentId }, { $set: { commentVal }})
    res.send({succes: true})
  } else {
    res.send({errormessage:"수정중 오류가 발생했습니다."})
  }
})

module.exports = router;