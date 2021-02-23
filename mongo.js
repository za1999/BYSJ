
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




//创建一个模型，就是在设计数据库，mongodb非常灵活，只需要在代码中设计你的数据库就可以了
//mongoose就可以让你的这个设计过程变得非常简单
const user = mongoose.model('userinfo', userinfo);


module.exports.user = user






