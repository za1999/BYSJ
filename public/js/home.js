$(function () {
  // 开局获取名字
  if (sessionStorage.getItem("name")) {
    $(".hright ul li").eq(0).text(sessionStorage.getItem("name"));
  }

  // 登陆页面开始请求所有文章
  changePage(1,1);


  // 轮播图的跳转
  $(".homeNews").click(function () {
    if ($(this).attr("artid")) {
      sessionStorage.setItem("artid", $(this).attr("artid"));
      window.location = "/showart";
    }
  });

  // 登陆注册的点击
  $(".login").click(function () {
    var r = confirm("您要前往登陆注册页面吗？");
    if (r == true) {
      window.location = "/login";
      return true;
    } else {
      return 0;
    }
  });

  // 写文章判断及跳转
  $(".wart").click(function () {
    if (sessionStorage.getItem("name")) {
      window.location = "/writepage";
    } else {
      tip("您未登陆！");
    }
  });
  // 写帖子判断及跳转
  $(".wpost").click(function () {
    if (sessionStorage.getItem("name")) {
      window.location = "/writepost";
    } else {
      tip("您未登陆！");
    }
  });

  // 用户中心跳转
  $(".hright ul li")
    .eq(1)
    .click(function () {
      if (sessionStorage.getItem("name")) {
        window.location = "/usercenter";
      } else {
        tip("您未登陆！");
      }
    });

  // 三种类型选择点击
  $(".hleft li").click(function () {
    for (var i = 0; i < $(".hleft li").length; i++) {
      $(".hleft li").eq(i).removeClass("choice");
      $(this).addClass("choice");
    }
  });

  $(".hleft li")
    .eq(0)
    .click(function () {
      for (var i = 0; i < $(".con").length; i++) {
        $(".con").eq(i).removeClass("show");
      }
      $(".con").eq(0).addClass("show");
    });
  $(".hleft li")
    .eq(1)
    .click(function () {
      for (var i = 0; i < $(".con").length; i++) {
        $(".con").eq(i).removeClass("show");
        $(this).addClass("show");
      }
      $(".con").eq(1).addClass("show");
    });
  $(".hleft li")
    .eq(2)
    .click(function () {
      if (sessionStorage.getItem("email")) {
        for (var i = 0; i < $(".con").length; i++) {
          $(".con").eq(i).removeClass("show");
          $(this).addClass("show");
        }
        $(".con").eq(2).addClass("show");
      } else {
        tip("请登录");
      }
    });

  // 这里是点击聊天发送
  $(".wr").click(function () {
    send();
  });
  // 监听enter
  $(".wl").keyup(function (e) {
    if (e.keyCode == 13) {
      send();
    }
  });

  //   轮询聊天
  setInterval(() => {
    settimeTalk();
  }, 1000);


  // 下面是帖子的一些js代码
  $.ajax({
    type: "post",
    url: "http://localhost:3000/allpost",
    success: function (data) {
      $(".po").remove();
      console.log(data)
      for (k in data) {
        var con = `
            <li class="po" postid='${data[k].postid}' onclick="lookpost(this)">
            <!-- 帖子左部分 -->
            <div class="pl">
                <div class="label">
                    <span>发布者:</span>${data[k].name}
                </div>
                <p class="title"><a href="javascript:;">${data[k].title}</a></p>
                <p class="text">
                ${data[k].time}
                </p>
            </div>

            <!-- 帖子右部分 -->
            <div class="pr">
                    <img src="${data[k].img}" alt="">
            </div>
        </li>`;
        $(".posts").append(con);
      }
    },
    error: function (e) {
      alert("接收数据错误！");
    },
  });
});

// 提示信息的函数
function tip(data) {
  $(".ding").text(data);
  $(".ding").fadeIn(1000);
  setTimeout(() => {
    $(".ding").fadeOut(1000);
  }, 2000);
}

// 发送聊天的函数
function send() {
  let con = $(".wl").text();
  //     let talk = ` <div class="tr">
  //     <div class="yourName">我</div>
  //     <div class="yourText">${con}</div>
  // </div>`
  if (con.length == 0) {
    tip("发送内容不能为空");
  } else {
    // $(".cbox").append(talk)
    $(".wl").text("");
    var scrollHeight = $(".cbox").prop("scrollHeight");
    $(".cbox").scrollTop(scrollHeight, 200);
    let email = sessionStorage.getItem("email");
    let time = new Date();
    $.ajax({
      type: "post",
      url: "http://localhost:3000/receiveTalk",
      data: {
        time: time,
        email: email,
        con: con,
        name: sessionStorage.getItem("name"),
      },
      success: function (data) {
        settimeTalk();
      },
      error: function (e) {
        alert("发送数据错误！");
      },
    });
  }
}

//看文章的函数
function look(e) {
  var id = $(e).attr("aid");
  sessionStorage.setItem("artid", id);
  window.location = "/showart";
}

// 看帖子的函数
function lookpost(e) {
  var id = $(e).attr("postid");
  sessionStorage.setItem("postid", id);
  window.location = "/showpost";
}
// 轮询查询数据的函数
function settimeTalk() {
  let num = $(".tc").length;
  $.ajax({
    type: "post",
    url: "http://localhost:3000/sendTalk",
    data: {
      num: num,
    },
    success: function (data) {
      if (data === "0") {
      } else {
        data.forEach((item) => {
          console.log(item.email, sessionStorage.getItem("email"));
          if (item.email == sessionStorage.getItem("email")) {
            let con = `<div class="tr tc">
                    <div class="yourName"><span class="talkTime timeright">${item.time}</span><span class="wo">我</span></div>
                    <div class="yourText">${item.con}</div>
                </div>`;
            $(".cbox").append(con);
          } else {
            let con = ` <div class="tl tc">
                    <div class="OtherName">${item.name}<span class="talkTime timeleft">${item.time}</span></div>
                    <div class="OtherText">${item.con}</div>
                </div>`;
            $(".cbox").append(con);
          }
        });
      }
    },
    error: function (e) {
      alert("接收数据错误！");
    },
  });
}







// 这里设置生成分页函数
function pagemom(num) {
  let pagenum = Math.ceil(num / 8);
  $(".btnpage").remove();
  for (let i = 0; i < pagenum; i++) {
    let con = `<li class="btn btnpage" onclick="clickBtn(this)" page=${
      pagenum - i
    }>${pagenum - i}</li>`;
    $(".last").after(con);
  }
  $(".pageother").text("共" + pagenum + "页");
  $(".btnpage").eq(0).addClass("choicePageBtn");
}

function clickBtn(e) {
  let num = e.getAttribute("page");
   $(".btnpage").removeClass("choicePageBtn");
   $(".btnpage").eq(num-1).addClass("choicePageBtn");

        changePage(num);

}

// 上一页的点击
function lastpage() {
  let num = $(".choicePageBtn").attr("page");
  if (num > 1) {
    $(".btnpage").removeClass("choicePageBtn");
    $(".btnpage")
      .eq(num - 2)
      .addClass("choicePageBtn");
      changePage(num-1)
  }
}

// 下一页的点击
function nextpage() {
  let num = $(".btnpage").last().attr("page");
  let nownum = $(".choicePageBtn").attr("page");
  if (num > nownum) {
    $(".btnpage").removeClass("choicePageBtn");
    $(".btnpage").eq(nownum).addClass("choicePageBtn");
    changePage(parseInt(nownum) + 1);
  }
}

function changePage(num,first) {
 
  let xs = num;
  $.ajax({
    type: "post",
    url: "http://localhost:3000/allart",
    success: function (data) {
      if(first){
        pagemom(data.length);
      }
      for (let i = 0; i < 4; i++) {
        $(".newsTitle").eq(i).text(data[i].title);
        $(".authorn")
          .eq(i)
          .text("作者:" + data[i].author);
        $(".homeNews").eq(i).attr("artid", data[i].id);
      }
      $(".art").remove();
      let x = 0;
      if(num==1){
        let data2 = data.slice((num - 1) * 8, num*8);
             for (let i = 0; i < data2.length; i++) {
               var con = `
                <li class="art">
                <p>文章ID:<span style="margin-right: 10px;">${data2[i].id}</span> ${data2[i].title} <span class="author">作者:${data2[i].author}</span></p>
                <div class="all" aid='${data2[i].id}' onclick="look(this)">
                    详情
                </div>
            </li>`;
               $(".articles").append(con);
             }
      }else{
         let data2 = data.slice((xs- 1) * 8, xs*8-1);
              for (let i = 0; i < data2.length; i++) {
                var con = `
                <li class="art">
                <p>文章ID:<span style="margin-right: 10px;">${data2[i].id}</span> ${data2[i].title} <span class="author">作者:${data2[i].author}</span></p>
                <div class="all" aid='${data2[i].id}' onclick="look(this)">
                    详情
                </div>
            </li>`;
                $(".articles").append(con);
              }
      }
 
    },
    error: function (e) {
      alert("接收数据错误！");
    },
  });
}
