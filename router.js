// 这是一个专门存放路由的文件

// 解析markdown的文件
var showdown = require("showdown"),
  converter = new showdown.Converter();

// 这里设置一个存放聊天信息的数组
const talks = [];

// 这里是存放管理员账号密码的数组，拉跨
const AdminInfo = [
  {
    email: "110@qq.com",
    password: "wyst2017",
    name: "鸡爪五毛一根",
  },
];

// 导入数据库！
var mon = require("./mongo");

// 导入fs，因为会用到也导入一下
var fs = require("fs");

// 使用express的router方法导入express
var express = require("express");
var router = express.Router();

// 默认网址为登陆页面
router.get("/", function (req, res) {
  res.render("login.html");
});
// 给登陆也设置一个单独路由
router.get("/login", function (req, res) {
  res.render("login.html");
});
// 设置首页的路由
router.get("/home", function (req, res) {
  res.render("home.html");
});

// 设置用户中心的路由
router.get("/usercenter", function (req, res) {
  res.render("usercenter.html");
});

//设置写文章页面
router.get("/writepage", function (req, res) {
  res.render("writepage.html");
});

// 设置看文章页面
// 进入看文章页面
router.get("/showart", function (req, res) {
  res.render("showart.html");
});

// 文章页面的详细数据请求阿妹妹
router.post("/showart", function (req, res) {
  mon.art.findOne(
    {
      id: req.body.id,
    },
    function (err, ret) {
      if (err) {
        console.log("查询失败");
        res.send(0);
      } else {
        var data = ret;
        if (data.content) {
          data.content = converter.makeHtml(data.content);
        }

        res.send(data);
      }
    }
  );
});

//设置注册的接口
router.post("/register", function (req, res) {
  mon.user.find(
    {
      $or: [{ email: req.body.email }, { name: req.body.name }],
    },
    function (err, ret) {
      if (err) {
        console.log("查询失败");
      } else {
        if (ret.length >= 1) {
          res.send("100");
          console.log("失败");
        } else {
          let za = new mon.user({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
          });
          za.save().then(() => {
            res.send("200");
            console.log("成功");
          });
        }
      }
    }
  );
});

// 设置登陆的接口
router.post("/login", function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  mon.user.find(
    {
      email: email,
      password: password,
    },
    function (err, ret) {
      if (err) {
        console.log("查询失败");
      } else {
        if (ret.length == 1) {
          var s = {
            code: 200,
            name: ret[0].name,
            email: ret[0].email,
          };
          res.send(s);

          console.log("登陆成功");
        } else {
          var q = {
            code: 0,
          };
          res.send(q);
        }
      }
    }
  );
});

// 处理新写的文章
router.post("/writeart", function (req, res) {
  var arts = new mon.art({
    id: req.body.id,
    title: req.body.title,
    content: req.body.con,
    email: req.body.email,
    author: req.body.author,
  });
  arts.save().then(() => {
    res.send("200");
  });
});

// 主页显示所有文章
router.post("/allart", function (req, res) {
  mon.art.find(function (err, ret) {
    if (err) {
      console.log("查询失败");
      res.send(0);
    } else {
      res.send(ret);
    }
  });
});

// 这里是提交文章评论的路由
router.post("/addmon", function (req, res) {
  var com = new mon.com({
    artid: req.body.artid,
    name: req.body.name,
    con: req.body.con,
  });
  com.save().then(() => {
    res.send("200");
  });
});

// 查找当前文章所有评论的路由
router.post("/allcom", function (req, res) {
  mon.com.find(
    {
      artid: req.body.artid,
    },
    function (err, ret) {
      if (err) {
        console.log("查询失败");
        res.send(0);
      } else {
        var data = ret;
        data.code = 200;
        res.send(data);
      }
    }
  );
});

/*****************************进入帖子路由区 ************************/
// 这里是进入写帖子的路由
router.get("/writepost", function (req, res) {
  res.render("writepost.html");
});

// 这里是提交帖子的路由
router.post("/inputPost", function (req, res) {
  var post = new mon.post({
    name: req.body.name,
    con: req.body.con,
    postid: req.body.id,
    title: req.body.title,
    email: req.body.email,
    img: req.body.img,
  });
  post.save().then(() => {
    res.send("200");
  });
});

// 请求所有帖子的路由

router.post("/allpost", function (req, res) {
  mon.post.find(function (err, ret) {
    if (err) {
      console.log("查询失败");
      res.send(0);
    } else {
      res.send(ret);
    }
  });
});

// 这里是查看帖子的页面
router.get("/showpost", function (req, res) {
  res.render("showpost.html");
});

// 查看帖子内容路由
router.post("/showpost", function (req, res) {
  mon.post.findOne(
    {
      postid: req.body.id,
    },
    function (err, ret) {
      if (err) {
        console.log("查询失败");
        res.send(0);
      } else {
        res.send(ret);
      }
    }
  );
});
// 这里是提交帖子评论的路由
router.post("/addpmon", function (req, res) {
  var pcom = new mon.pcom({
    postid: req.body.postid,
    name: req.body.name,
    con: req.body.con,
    time: req.body.time,
  });
  pcom.save().then(() => {
    res.send("200");
  });
});
// 查找当前帖子所有评论的路由
router.post("/allpcom", function (req, res) {
  mon.pcom.find(
    {
      postid: req.body.postid,
    },
    function (err, ret) {
      if (err) {
        console.log("查询失败");
        res.send(0);
      } else {
        var data = ret;
        data.code = 200;
        res.send(data);
      }
    }
  );
});
/*****************************用户中心 ************************/
// 查找你所有的帖子
router.post("/yourpost", function (req, res) {
  mon.post.find(
    {
      email: req.body.email,
    },
    function (err, ret) {
      if (err) {
        console.log("查询失败");
        res.send(0);
      } else {
        res.send(ret);
      }
    }
  );
});
// 查找你所有的文章
router.post("/yourart", function (req, res) {
  mon.art.find(
    {
      email: req.body.email,
    },
    function (err, ret) {
      if (err) {
        console.log("查询失败");
        res.send(0);
      } else {
        res.send(ret);
      }
    }
  );
});

// 这里是接收聊天内容的接口
router.post("/receiveTalk", function (req, res) {
  talks.push(req.body);
  console.log(talks);
  res.send(200);
});
// 发送聊天内容的接口
router.post("/sendTalk", function (req, res) {
  let talk = talks.slice(req.body.num);
  if (talks.length > req.body.num) {
    res.send(talk);
  } else {
    res.send("0");
  }
});

// 下面是管理员登陆页面
router.get("/Admin-login", function (req, res) {
  res.render("Admin-login.html");
});
// 下面是管理员的数据展示页面
router.get("/AdMain", function (req, res) {
  res.render("admin/AdMain.html");
});
// 管理员登陆验证
router.post("/AdminHandle", function (req, res) {
  //   AdminInfo;
  AdminInfo.forEach((item) => {
    if (item.email == req.body.email && item.password == req.body.password) {
      res.send(item.name);
    }
  });
  res.send("0");
  setTimeout(() => {
    res.send("0");
  }, 500);
});

module.exports = router;
