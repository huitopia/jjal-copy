# JJal - https://github.com/99-6W-6/JJal_backend
### ๐  ์ฌ์ฉ ๊ธฐ์ 
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
### ๐ข API ์ค๊ณ
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
### ๐ ํต์ฌ๊ธฐ๋ฅ
#### ๋ก๊ทธ์ธ/ํ์๊ฐ์
- JWT๋ฅผ ์ด์ฉํ์ฌ ๋ก๊ทธ์ธ๊ณผ ํ์๊ฐ์ ๊ตฌํ
- ์์ด๋๊ฐ 3๊ธ์ ์ด์, ์ซ์, ์๋ฌธ์ ์/๋๋ฌธ์๋ก๋ง ๊ตฌ์ฑ
- ๋น๋ฐ๋ฒํธ๊ฐ 4๊ธ์ ์ด์, ์ซ์, ์๋ฌธ์ ์/๋๋ฌธ์๋ก๋ง ๊ตฌ์ฑ
- ๋น๋ฐ๋ฒํธ์ ์์ด๋๊ฐ ํฌํจ๋๋ฉด ํ์๊ฐ์ ๋ถ๊ฐ๋ฅ
- ๋๋ค์์ ์ด๋ฏธ ์ฌ์ฉ์ค์ด๋ฉด ํ์ ๊ฐ์ ๋ถ๊ฐ๋ฅ
#### ๊ฒ์๊ธ ์์ฑํ๊ธฐ CRD
- ์ด๋ฏธ์ง์ ํ๊ทธ ํฌ์คํ๊ฐ๋ฅ
- ๋ค๋ฅธ ์ ์ ์ ๊ฒ์๊ธ ์กฐํ ๊ฐ๋ฅ
- ์ ์  ๋ณธ์ธ์ ๊ฒ์๊ธ์ ์ญ์ ๊ฐ๋ฅํ๋ฉฐ, ๋ค๋ฅธ ์ ์ ์ ๋ฆฌ๋ทฐ๊ธ์ ์์  ๋ถ๊ฐ๋ฅ
#### ๋๊ธ ์์ฑํ๊ธฐ CRUD
- ์ ์  ๋ณธ์ธ์ ์๊ฐ์ ๋ด์ ์์ฑ ๊ฐ๋ฅ
- ๋ค๋ฅธ ์ ์ ์ ๋๊ธ ์กฐํ ๊ฐ๋ฅ
- ์ ์  ๋ณธ์ธ์ ๋๊ธ์ ์์ ๊ฐ๋ฅํ๋ฉฐ, ๋ค๋ฅธ ์ ์ ์ ๋ฆฌ๋ทฐ๊ธ์ ์์  ๋ถ๊ฐ๋ฅ
- ์ ์  ๋ณธ์ธ์ ๋๊ธ์ ์ญ์ ๊ฐ๋ฅํ๋ฉฐ, ๋ค๋ฅธ ์ ์ ์ ๋ฆฌ๋ทฐ๊ธ์ ์์  ๋ถ๊ฐ๋ฅ
##
### ๐คฆ๐ป ํ๋ก์ ํธ ์ค ํ๋ค์๋ ์ ์ด ์๋ค๋ฉด
- DBํ์์ ํต์ผํ์ง ์๊ณ  ๊ฐ์ ํธํ๋๋ก ๋ง๋ค์๋ค๊ฐ ObjectId๋ฅผ String์ผ๋ก ๋ณํํด์ผ ํ๋๋ฐ ๊ผฌ์ด๋ ์ผ์ด ๋ฐ์ํ์ฌ TypeError, CastError ๋ฐ์
- ๊ฐ์๋ก ๋ฉ์ฒญํด์ง๋ ๋ด ๋จธ๋ฆฌ...
- API๋ช์ธ๋ฅผ ํต์ผ์ฑ ์๊ฒ ์์ฑํ๊ณ  ์ต๋ํ ์์ ์ด ์์ ์ ์๊ฒ ์ ํ๋๊ฒ ํ๋ก ํธ์๋ ํ์์ด ์์ํ๊ธฐ ํธํฌ์ํ๋ฐ ์ฃ์กํ๋ค.
##
### ๐ฏ ํด๊ฒฐํ ๋ฌธ์ 
1. res.locals ๊ฐ์ผ๋ก ๋ฐ์ผ๋ ค ํ์๋๋ฐ undefined ๋ฐ์ > req.body๋ก ๋ฐ์์ด
2. ์๋ฒ ๋ฐฐํฌ์  invalid ELF header ์๋ฌ๋ฉ์ธ์ง > node_modulesํ์ผ์ ์์ฌ๋ฆฌ๊ณ  ์๋ฒ์์ npm install
