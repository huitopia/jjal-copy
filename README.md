# JJal
### 🛠 사용 기술
#### Languages
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
#### Frameworks, Platforms and Libraries
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
#### IDEs/Editors
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
#### Version Control
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
#### Hosting/SaaS
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
#### Databases
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
#### Other
![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
##
### 🎢 API 설계
#### user
- Post /api/users/auth
- Post /api/users/users
- Post Ip/api/users/checkId
#### post
- Post /api/posts/lists
- Post /api/posts
- Post /api/posts/details
- Post /api/posts/search/tag
- Post /api/posts/uploadfile
- Delete /api/posts
#### comment
- Post /api/comment/
- Put /api/comment/detail
- Delete /api/comment/detail
- Post /api/comment/detail
#### like
- Post /api/like/likes
- Post /api/like/likes
#### myPage
- Post /api/users/likeImg
- Post /api/users/myPostImgs
##
### 📜 핵심기능
#### 로그인/회원가입
- JWT를 이용하여 로그인과 회원가입 구현
- 아이디가 3글자 이상, 숫자, 영문자 소/대문자로만 구성
- 비밀번호가 4글자 이상, 숫자, 영문자 소/대문자로만 구성
- 비밀번호에 아이디가 포함되면 회원가입 불가능
- 닉네임을 이미 사용중이면 회원 가입 불가능
#### 게시글 작성하기 CRD
- 이미지와 태그 포스팅가능
- 다른 유저의 게시글 조회 가능
- 유저 본인의 게시글은 삭제가능하며, 다른 유저의 리뷰글은 수정 불가능
#### 댓글 작성하기 CRUD
- 유저 본인의 생각을 담아 작성 가능
- 다른 유저의 댓글 조회 가능
- 유저 본인의 댓글을 수정가능하며, 다른 유저의 리뷰글은 수정 불가능
- 유저 본인의 댓글을 삭제가능하며, 다른 유저의 리뷰글은 수정 불가능
##
### 🤦🏻 프로젝트 중 힘들었던 점이 있다면
- DB형식을 통일하지 않고 각자 편한대로 만들었다가 ObjectId를 String으로 변환해야 하는데 꼬이는 일이 발생하여 TypeError, CastError 발생
- 갈수록 멍청해지는 내 머리...
- API명세를 통일성 있게 작성하고 최대한 수정이 없을 수 있게 정하는게 프론트엔드 팀원이 작업하기 편햬을텐데 죄송했다.
##
### 💯 해결한 문제
1. res.locals 값으로 받으려 하였는데 undefined 발생 > req.body로 받아옴
2. 서버 배포시  invalid ELF header 에러메세지 > node_modules파일을 안올리고 서버에서 npm install
