
// 导入mongoose
const mongoose = require('mongoose');

var Schema = mongoose.Schema;

// 连接数据库，test是数据库的名字，数据库不需要存在（当然也可以存在），插入第一条数据之后就会创建
mongoose.connect('mongodb://localhost:27017/BYSJ');

//创建用户名表结构
var userinfo = new Schema({

    name:{
        type:String,
        required:true //必须要有
    },
    password:{
    type:String,
    required:true //必须要有
        },
    email:{
        type:String
    }

    
})

// 创建文章评论表
var comment = new Schema({

    name:{
        type:String,
        required:true //必须要有
    },
    con:{
    type:String,
    required:true //必须要有
        },
    artid:{
        type:String,
        required:true //必须要有
    }   
})

// 创建帖子表！
var posts = new Schema({

    name:{
        type:String,
        required:true //必须要有
    },
    con:{
    type:String,
        },
    postid:{
        type:String,
        required:true //必须要有
    }, 
    title:{
        type:String,
        required:true //必须要有
         },
    email:{
            type:String,
            required:true
        },
        img:{
         type:String,
        }
})




// 创建文章表
var artinfo = new Schema({

    id:{
        type:Number,
        required:true //必须要有
    },
    title:{
    type:String,
    required:true //必须要有
        },
    author:{
        type:String,
        required:true
    },
    content:{
        type:String
    },
    email:{
        type:String,
        required:true
    }

    
})


//创建一个模型，就是在设计数据库，mongodb非常灵活，只需要在代码中设计你的数据库就可以了
//mongoose就可以让你的这个设计过程变得非常简单
const user = mongoose.model('userinfo', userinfo);
const art = mongoose.model('artinfo', artinfo);
const com = mongoose.model('comment', comment);
const post = mongoose.model('posts', posts);

// 账户表
module.exports.user = user
// 文章表
module.exports.art = art
// 文章评论表
module.exports.com = com
// 帖子表
module.exports.post = post





