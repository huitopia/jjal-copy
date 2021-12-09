const jwt = require("jsonwebtoken");
const User=require('../models/User')
const config = require('../config/dev');

// 로그인되어있는 토큰을 가져와 유저정보를 담아주는 middleware
module.exports = (req, res, next) => {
  const { authorization } = req.headers; 
  const [tokenType, tokenValue] = authorization.split(" "); // Token을 분리해서 배열에 할당

  if (tokenType !== "Bearer") {
    res.status(401).send({
      errorMessage: "로그인 후 사용하세요",
    });
    return;
  }

  try {
    const { userID } = jwt.verify(tokenValue, config.token); // 토큰 인증 후 userID 할당
    User.findById(userID) //User DB에서 데이터 찾기
      .exec()
      .then((user) => {
        res.locals.user = user; 
        next();
      });
  } catch (error) {
    res.status(401).send({
      errorMessage: "로그인 후 사용하세요",
    });
    return;
  }
};