const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser= require('cookie-parser');
const config = require('./config/dev');
const app = express();
//DB연결
const connect = mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));
                
//cors origin에 fornt 주소 넣기 
const cors = require('cors');
// const corsOptions = {
//   origin: "http://chansoo.shop",
//   credentials: true
// }
app.use(cors());
  
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
//json데이터 받기위해
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());

// 정적 파일 불러오기(업로드 테스트용)
app.use(express.static(__dirname + "/public"));

// 라우팅 정의
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/tag.html");
});
//route
app.use('/api/posts', require('./routes/post'))
app.use('/api/users', require('./routes/user'))
app.use('/api/comment', require('./routes/comment'))
app.use('/api/like', require('./routes/like'))


const port = 3000;
app.listen(port, () => {
    console.log(`Server Listening on ${port}`)
  });