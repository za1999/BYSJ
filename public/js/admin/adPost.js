$(function () {
  getInfo();
});

function deletePost(e) {
  let r = confirm("您确定要删除当前帖子吗？");
  if (r == true) {
    let id = $(e).attr("id");
    console.log(id);
    $.ajax({
      type: "post",
      url: "http://localhost:3000/deletePost",
      data: {
        id: id,
      },
      success: function (data) {
        console.log(data);
        if (data.code == 200) {
          tip("删除成功！");
          getInfo();
        }
      },
      error: function (e) {
        alert("接收数据错误！");
      },
    });
  } else {
    return 0;
  }
}
function look(e){
  let id = $(e).attr("id");
   sessionStorage.setItem("postid", id);
   window.location = "http://localhost:3000/showpost";
}
function getInfo() {
  // 管理员请求所有的用户信息
 changePage(1,1)
}

// 提示信息的函数
function tip(data) {
  $(".ding").text(data);
  $(".ding").fadeIn(1000);
  setTimeout(() => {
    $(".ding").fadeOut(1000);
  }, 2000);
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
    url: "http://localhost:3000/allpost",
    success: function (data) {
      $(".num").text(data.length);
      console.log(data);
      $(".userone").remove();
      if (first) {
        pagemom(data.length);
      }
      if (num == 1) {
        let data2 = data.slice((num - 1) * 8, num * 8);
        data2.forEach(function (item) {
          let con = ` <li class="user userone">
                        <ul class="userinfo">
                  <li>${item.postid}</li>
                  <li>${item.name}</li>
                  <li>${item.title}</li>
                  <li>${item.con}</li>
                  <li>${item.email}</li>
                   <li><img src=${item.img}></img></li>
                  <li ><span id=${item.postid} onclick="deletePost(this)">删除 </span><span id=${item.postid} onclick="look(this)"> 查看</span></li>
                </ul>
                </li>`;
          $(".users").append(con);
        });
      } else {
        let data2 = data.slice((xs - 1) * 8, xs * 8);
        data2.forEach(function (item) {
          let con = ` <li class="user userone">
                        <ul class="userinfo">
                  <li>${item.postid}</li>
                  <li>${item.name}</li>
                  <li>${item.title}</li>
                  <li>${item.con}</li>
                  <li>${item.email}</li>
                   <li><img src=${item.img}></img></li>
                  <li ><span id=${item.postid} onclick="deletePost(this)">删除 </span><span id=${item.postid} onclick="look(this)"> 查看</span></li>
                </ul>
                </li>`;
          $(".users").append(con);
        });
      }
    },
    error: function (e) {
      alert("接收数据错误！");
    },
  });
}