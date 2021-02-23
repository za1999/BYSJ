// 这是一个专门存放路由的文件

// 导入数据库！
var mon = require('./mongo')


// 导入fs，因为会用到也导入一下
var fs  = require("fs")



// 使用express的router方法导入express
var express = require("express")
var router = express.Router()



   

// 默认网址为登陆页面
    router.get("/",function(req,res){
      
        res.render('home.html')

    })
// 给登陆也设置一个单独路由
router.get("/login",function(req,res){
      
    res.render('login.html')

})
// 设置首页的路由
    router.get("/home",function(req,res){
      
        res.render('home.html')

    })

// 设置用户中心的路由
router.get("/usercenter",function(req,res){
      
    res.render('usercenter.html')

})

//设置写文章页面
router.get("/writepage",function(req,res){
      
    res.render('writepage.html')

})

//设置注册的接口
router.post("/register",function(req,res){
    console.log(req.body)
    mon.user.find(
        {
            $or: [
               { email: req.body.email}, 
               {name:req.body.name}
            ]
         }
        ,
        function(err,ret){
        if(err){
            console.log("查询失败")
        }else{
            if(ret.length>=1){
               res.send("100")
               console.log("失败")
            }else{
                let za = new mon.user({
                    name: req.body.name,
                    password:req.body.password,
                    email:req.body.email
                  });
                  za.save().then(() => {
                      res.send("200")
                      console.log("成功")
                  });
            }
        }
    })


})


// 设置登陆的接口
router.post("/login",function(req,res){
    var email = req.body.email
    var password = req.body.password
    mon.user.find(
        {
            email:email,
            password:password
        },
        function(err,ret){
        if(err){
            console.log("查询失败")
        }else{
            if(ret.length==1){
                var s = {
                    code:200,
                   name:ret[0].name,
                   email:ret[0].email
                }
                res.send(s)

                console.log("登陆成功")
            }else{
                var q = {
                    code:0
                }
                res.send(q)
            }
        }
    })
    
})












 





    module.exports = router


