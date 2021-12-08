const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt =require("jsonwebtoken");




// 회원가입 API
router.post("/users", async (req, res) => {
    const { userID, password, confirmPassword } = req.body;
  
    if (password !== confirmPassword) {
      res.status(400).send({
        errorMessage: "패스워드가 패스워드 확인란과 다릅니다.",
      });
      return;
    }
  
    // email 이 동일한게 이미 있는지 확인하기 위해 가져온다.
    const existsUsers = await User.findOne({
      $or: [{ userID }],
    });
    if (existsUsers) {
      res.status(400).send({
        errorMessage: "아이디는 이미 사용중입니다.",
      });
      return;
    }
  
    const user = new User({ userID, password });
    await user.save();
  
    res.status(201).send({success:true});
  });
//로그인
  router.post("/auth", async (req, res) => {
    const {userID, password} = req.body;

    const user = await User.findOne({userID, password}).exec();
    
    if (!user || password !== user.password) {
        res.status(400).send({
          errorMessage: "이메일 또는 패스워드가 틀렸습니다.",
        });
        return;
    }
    const token = jwt.sign({ userId: user.userId }, "my-secret-key");
    res.cookie('token', token, { httpOnly: true });
    res.json({ token });
});


  module.exports = router;