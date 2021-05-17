$(function () {
  getInfo();
});

function deleteUser(e) {
  let r = confirm("您确定要删除当前用户账号吗？");
  if (r == true) {
    let email = $(e).attr("email");
    $.ajax({
      type: "post",
      url: "http://localhost:3000/deleteUser",
      data: {
        email: email,
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

function getInfo() {
  // 管理员请求所有的用户信息
  changePage(1,1)
  // $.ajax({
  //   type: "post",
  //   url: "http://localhost:3000/AdAllUser",
  //   success: function (data) {
  //     $(".num").text(data.length);
  //     console.log(data);
  //     $(".userone").remove();
  //     data.forEach(function (item) {
  //       let con = ` <li class="user userone">
  //                 <ul class="userinfo">
  //                     <li>${item.name}</li>
  //                     <li>${item.email}</li>
  //                     <li>${item.password}</li>
  //                     <li email=${item.email} onclick="deleteUser(this)">删除</li>
  //                 </ul>
  //           </li>`;
  //       $(".users").append(con);
  //     });
  //   },
  //   error: function (e) {
  //     alert("接收数据错误！");
  //   },
  // });
}

// 提示信息的函数
function tip(data){
    $('.ding').text(data)
    $('.ding').fadeIn(1000)
    setTimeout(() => {
        $('.ding').fadeOut(1000)
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
    url: "http://localhost:3000/AdAllUser",
    success: function (data) {
        $(".num").text(data.length);
        $(".userone").remove();
      if (first) {
        pagemom(data.length);
      }
      if (num == 1) {
        let data2 = data.slice((num - 1) * 8, num * 8);
         data2.forEach(function (item) {
           let con = ` <li class="user userone">
                  <ul class="userinfo">
                      <li>${item.name}</li>
                      <li>${item.email}</li>
                      <li>${item.password}</li>
                      <li email=${item.email} onclick="deleteUser(this)">删除</li>
                  </ul>
            </li>`;
           $(".users").append(con);
         });
      } else {
        let data2 = data.slice((xs - 1) * 8 , xs * 8 - 1);
       data2.forEach(function (item) {
         let con = ` <li class="user userone">
                  <ul class="userinfo">
                      <li>${item.name}</li>
                      <li>${item.email}</li>
                      <li>${item.password}</li>
                      <li email=${item.email} onclick="deleteUser(this)">删除</li>
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
