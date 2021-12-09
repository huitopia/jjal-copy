const express = require('express');
const router = express.Router();
const multer = require('multer');
const Post = require('../models/Post')
const Comment = require('../models/Comments');
//const middleware = require("../middleware/auth-middleware");//권한 미들웨어 받아와서 적용해야함 , 로그인한 유저만 글을 포스팅 가능

//Storage multer 
let storage = multer.diskStorage({
    destination:(req, file, fn)=>{
        fn(null, "uploads/")
    },
    filename:(req, file, fn)=>{
        fn(null, `${Date.now()}_${file.originalname}`);
    
    },
    fileFilter:(req, file, fn)=>{
        const ext = path.extname(file.originalname)
        if(ext !==".gif" || ext !==".png"){
            return fn(res.status(400).end('파일 업로드중 오류가 발생 했습니다.'),false);
        }
        fn(null, true)
    }
})

const upload = multer({storage:storage}).single("img")
//============== 짤업로드 하는데 따로 짤정보 저장 따로 ==============
//짤파일 서버에 저장

router.post('/uploadfile', (req, res)=>{  //req는 클라이언트에서 보내준 파일객체 
    console.log(req);
    try{
        upload(req, res, err=>{
            if(err){
                return res.send({errormessage:"파일 업로드 중 오류가 발생했습니다."})
            }
            return res.json({succes:true,      //성공하면 파일경로, 파일 이름 클라이언트로
                url:res.req.file.path,  //path랑 
                fileName: res.req.file.filename //filename
            })
        })
    }catch(error){
        res.status(400).send({
            errormessage: "파일 업로드 중 오류가 발생했습니다.",
        });
        console.log(error)
    }
    
})
//사용자 정보 쿠키로 넘기면 클라이언트에서 받아주고 세션이면 서버에서 받기
//짤파일 정보저장
router.post('/',(req, res)=>{
    try{
        // const { userId } = res.locals; // 만약 클라이언트 단에서 유저정보를 안넘겨주면 middleware에서 res.locals에 담아온 user할당 
        // if(!userId){
        //     res.send(400).send({errormessage:'로그인한 사용자만 파일 업로드가 가능합니다.'})
        // }else{}
        const video = new Post(req.body)  //req.body 안에 클라이언트에서 보낸 모든 variable 가져옴 (유저아이디까지 넘겨준 상황)
        video.save((err, doc)=>{
            if(err) return res.json({success:false, err})
                            .send({errormessage:"파일 업로드 중 오류가 발생했습니다."})
            res.status(200).json({success:true})
        })
    }catch(error){
        res.status(400).send({
            errormessage: "파일 업로드 중 오류가 발생했습니다.",
        });
        console.log(error)
    }
    
})

//메인페이지 리스트
router.get('/', async(req, res)=>{
    let page = req.query['page'];  //쿼리파리미터로 페이지 받아오기
    page = page || 1 
    console.log(page)
    
    try{
        const posts = await Post.find({})
            .sort({createdAt:-1})  //생성순으로 정렬, 조회수로 변경할건지 논의 할것
            .skip((page-1)*20)   //20개씩 빼고 보여줌 
            .limit(20)        //20개씩 보여줌 
        if(posts.length ==0){     
            res.send({next:false}) 
        }else{
            let postId = posts._id;
            const comment = await Comment.find({postId})
            const commentCnt = comment.length;
            Post.update({_id:postId}, {$set:{commentCnt:commentCnt}});
            res.send({posts})     //클라이언트에 post객체 response
            console.log(posts, commentCnt)
            
        }
    }catch(error){
        res.status(400).send({
            errormessage:"포스트를 불러오는 중 오류가 발생"
        });
        console.log(error)
    }
});
//상세페이지
router.get('/:postId', async (req, res)=>{
    const {postId} = req.params; //{} 비구조화 할당, [] 구조분해 할당
    try{
        let post = await Post.findById(postId);  //모든 정보를넘기면 필요한 거만 가져가서 사용 가능한가...
        post.viewsCnt++;  //상세페이지 들어올때마다 1씩 증가
        post.save();
        console.log(post.viewsCnt);
        res.json({post});
        
    }catch(error){
        res.status(400).send({errormessage:"포스트를 불러오는 중 오류가 발생"})
        console.log(error);
    }
})
//검색
router.post('/search/tag', async(req, res)=>{
    const searchTag = req.body;
    console.log(searchTag['description'])
    try{
        const tag = searchTag['description'].trim(); //공백을 기준으로 나누어서 검색 searchTag => db에는 description으로 저장
        const search = await Post.find({description:new RegExp(tag,'i')}).sort('-createdAt') //몽구스 like검색 정규식 사용 ,i는 대소문자 무시
        res.status(200).send({result:{search}})
    }catch(error){
        res.status(400).send({errormessage:"검색중 오류가 발생"})
    }
})

//삭제
router.delete('/:postId', async (req, res)=>{
    const {postId} = req.params;  //{postId}로 구조분해 할당해주면 object값 자체가 아닌 value값만 받을 수 잇다.
    try{
        await Post.findByIdAndDelete(postId);
        res.send({succes:true})
    }catch(error){
        res.status(400).send({errormessage:"삭제중 오류가 발생했습니다."})
        console.log(error);
    }
   
})
module.exports = router;    