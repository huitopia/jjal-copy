const express = require("express");
const Comment = require("../models/Comments");
//const Like = require("../models/likes");
const middleware = require("../middleware/auth-middleware");
const router = express.Router();

// 댓글 작성
router.post('/comment',  async (req, res) => {
  try{
    //const post= req.body
    const {postId} = req.body
    const { commentVal } = req.body
    const {userId} = req.body  //userId는 또 그냥 String으로 받을 수 있다 나는 이해가 안된다.....
    //console.log(post, commentVal);
    // const { user } = res.locals
    // const userId = user["userId"]

    const recentComment = await Comment.find().sort("-commentId").limit(1);

    let commentId = 1
    if (recentComment.length != 0) {
      commentId = recentComment[0]["commentId"] + 1
    }
    
    await Comment.create({ commentId, postId,userId, commentVal })
    res.send({ result: "success "})
  }catch(error){
    res.send(error)
    console.log(error);
  }
  return;
})

// 댓글 불러오기
router.get("/comment/:commentId", async (req, res) => {
  const { postId } = req.params
  console.log(postId)
  const comment = await Comment.find({ postId }).sort("-commentId")
  res.json({ comment: comment })
})

// 댓글 삭제
router.delete("/comment/:commentId", middleware, async (req, res) => {
  const { user } = res.locals
  const { commentId } = req.body
  console.log(commentId)

  const tokenUserId = user["userId"]
  const p = await Comment.findOne({ commentId })
  const dbUserId = p["userId"]

  if (tokenUserId === dbUserId) {
    await Comment.deleteOne({ commentId })
    res.json({ msg: "success" })
  } else {
    res.json({ msg: "fail"})
  }
})

// 댓글 수정
router.put("/comment/:commentId", middleware, async (req, res) => {
  const { user } = res.locals
  const { commentId, commentVal } = req.body
  const tokenUserId = user["userId"]
  const p = await Comment.findOne({ commentId })
  const dbUserId = p["userId"]

  if (tokenUserId === dbUserId) {
    await Comment.updateOne({ commentId }, { $set: { commentVal } })
    res.json({ result: "success" })
  } else {
    res.json({ result: "fail" })
  }
})

module.exports = router;