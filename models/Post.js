const monggose = require('mongoose');
const Schema = monggose.Schema;

//test
const postSchema = monggose.Schema({
    //userID
    writer:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    description:{
        type:String,
        required:[true,'최소 한개는 작성해주세요']
    },
    imgUrl:{
        type:String
    },
    //조회수 count
    viewsCnt:{
        type:Number,
        default:0
    },
    commentCnt:{
        type:Number,
        default:0
    },
    // 좋아요
    postLikeCnt: {
      type: Number,
      required: true,
      unique: false,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Post = monggose.model('Post', postSchema);
module.exports = Post;