// 引入express
var express  = require("express")

// 引入body-parser包，是用来获得post方法的参数的，req上面多了个body，req.query只能拿get请求的参数
var bodyParser = require('body-parser')


// 导入router.js
var router = require("./router")

// 创建服务器
var app = express()

// 公开指定文件夹，这里是public,公开了可以直接通过网址路径进入public文件夹查看资源,当以/开头去public里面读取资源
app.use("/public/",express.static("./public/"))


// 配置body-parser配置完后req上面会多一个属性叫做body
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// 配置art-template模板引擎,代码意思是当以HTML结尾文件时候，使用art-template模板引擎
// express为response（响应）提供了一个方法render，默认是不能使用的，配置了模板引擎之后就可以使用了
// 使用方法是res.render('html模板名',{模板数据})，模板名是默认是views文件里面寻找
app.engine('html',require('express-art-template'))




// 服务器端口设置
app.listen(3000,function(){
    console.log("服务器已经启动")
})

// 把router路由挂载到app服务
app.use(router)

// 这里设置没有的页面都是404页面，放在挂载路由后面，不然一直显示404页面
app.use(function(req,res){
  res.render("404.html")
})