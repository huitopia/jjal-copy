const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt =require("jsonwebtoken");
const bcrypt  = require('bcrypt');
const Joi = require('joi')
const config = require('../config/dev');
const Post = require('../models/Post');
const Likes = require('../models/Likes')

// 회원가입 유효성 검사 (Joi)
const registerSchema = Joi.object({
  userID: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$")).required(), // 영문자 숫자 특수문자 조합 자 이상
  confirmPassword: Joi.string().required(),
});
//아이디 중복검사
router.post("/checkId", async (req, res)=>{
  try{
    const {userID} = req.body;
    const isUser = await User.find({ userID });
    if (isUser.length) {
      res.status(400).send({
        Message: "중복된 아이디입니다.", success:true
      })
    }else{
      res.status(200).send({
        Message:"사용가능한 아이디 입니다.",success:true
      })
    }
  }catch(err){
    res.status(400).send({success:false})
  }
})
// 회원가입 API
router.post("/users", async (req, res) => {
  try {
    const { userID, password, confirmPassword } =
      await registerSchema.validateAsync(req.body);
    
    if (password !== confirmPassword ) {     
      res.status(400).send({
        errorMessage: "패스워드 입력이 올바르지 않습니다.",
      });
      return;
    }
    const isUser = await User.find({ userID });
    if (isUser.length) {
      res.status(400).send({
        errorMessage: "중복된 아이디입니다.",
      });
      return;
    }
    const salt=await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password,salt);
    const user = new User({ userID, password:hashedPassword });
    console.log(user);
    await user.save();
    res.status(201).send({success:true});
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success:false
    });
  }
});

// 로그인 API
router.post("/auth", async (req, res) => {
  const{userID, password} = req.body;
    const user = await User.findOne({userID}).exec(); 
    
    if(!user){
        res.send({
          errorMessage:"아이디 또는 비밀번호를 확인해주세요" 
        })
        return;
    }
    console.log(user.password)
    const authenticate = await bcrypt.compare(password,user.password)
    if(authenticate==false){
        res.send({
            errorMessage:"아이디 또는 비밀번호를 확인해주세요" 
        })
        return;
    }
    const userId = user.userID
    const token = jwt.sign({userId: user.userID}, config.token); //userID를 토큰으로 만듬
    res.send({
        result:"success", //success, userID, token값을 보내줌
        userId, 
        token
    })
});
//내가 찜한 목록 불러오기
router.post('/likeImg', async(req, res)=>{
  const {userID} = req.body;
  const postArr =[];
  let posts = await Likes.find({'userID':userID})
    for(let i =0 ;i<posts.length;i++){
      const  postId = posts[i]["postId"].toHexString();  //toHexString()이렇게 하면 new ObjectId:("61b31d2e55813b401e73c6eb")안에 objectId만 가져올수 잇음
      console.log(postId);
      const post = await Post.findById(postId);
      postArr.push(post);
    }
  try{
    if(posts.length ==0){
      res.send({message:"찜한 목록이 없습니다."});
    }else{
      res.send(postArr)
    }
  }catch(error){
    res.send({errorMessage:"목록을 불러오는 중 오류발생"});
    console.log(error)
  }
})
//내가 등록한 짤 가져오기
router.post('/myPostImgs', async(req, res)=>{
  const {userID} = req.body;
  const myPosts = await Post.find({'userID':userID})
  try{
    if(myPosts.length ==0){
      res.send({message:"내가 등록한 짤이 없습니다."});
    }else{
      res.send(myPosts)
    }
  }catch(error){
    res.send({errorMessage:"목록을 불러오는 중 오류발생"});
  }
})
module.exports = router;