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
    //좋아요 count  ?필요한가 ??
    likesCnt:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Post = monggose.model('Post', postSchema);
module.exports = Post;