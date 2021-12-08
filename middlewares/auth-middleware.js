const jwt = require("jsonwebtoken");
const {User} =require('../models/User')

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    const [authType, authToken] = (authorization || "").split(" ");
  
    if (!authToken || authType !== "Bearer") {
      res.status(401).send({
        errorMessage: "로그인 후 이용 가능한 기능입니다.",
      });
      return;
    }
  
    try {
      const { userId } = jwt.verify(authToken, "my-secret-key"); 

      

      User.findById(userId).exec().then((user) => {
        res.locals.user = user;
        console.log(res.locals.user);
        next();
      });
    } catch (err) {
      res.status(401).send({
        errorMessage: "로그인 후 이용 가능한 기능입니다.",
      });
    }
  };
//=======================================
// const jwt = require("jsonwebtoken")
// const {User} = require("../models/User")
// // const split =require()

// module.exports = (req, res, next) => {
//   console.log("auth 미들웨어 동작확인!") // 미들웨어 호출확인
//   // console.log(req)
//   const { authorization } = req.headers
//   // console.log(req.headers)
//   console.log(authorization)
//   // 프론트에서 대문자로 보내도 무조건 소문자로 들어와
//   // 'Bearer null'// 문 자 열 이 야
//   const [tokenType, tokenValue] = authorization.split(' ')
//   // console.log(tokenValue)
//   // console.log(null)-

//   if (tokenType !== 'Bearer') {
//     res.status(401).send({ 
//       errorMessage: '로그인 후 사용하세요'
//     })
//     return
//   }

//   // console.log(tokenValue === 'null')

//   if (tokenValue === 'null') {
//     res.status(401).send({ 
//       errorMessage: '로그인 후 사용하세요'
//     })
//     return
//   }

//   try {
//     const { userId } = jwt.verify(tokenValue, "huitopia-blog-key")
//     User.findOne({ userId })
//       .exec()
//       .then((user) => {
//         res.locals.user = user
//         next()
//       })
//     // async 함수가 아니라 await 사용 못 하니 then 사용

//   } catch (error) {
//     res.status(401).send({ // 401이 인증실패 스테이터스 코드
//       errorMessage: '로그인 후 사용하세요'
//     })
//     return
//   }
// }