$(function () {
  getInfo();
});

function deleteArt(e) {
  let r = confirm("您确定要删除当前文章吗？");
  if (r == true) {
    let id = $(e).attr("id");
    console.log(id)
    $.ajax({
      type: "post",
      url: "http://localhost:3000/deleteArt",
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

function getInfo() {
  // 管理员请求所有的用户信息
  $.ajax({
    type: "post",
    url: "http://localhost:3000/allart",
    success: function (data) {
      $(".num").text(data.length);
      console.log(data);
      $(".userone").remove();
      console.log(data);
      data.forEach(function (item) {
        let con = ` <li class="user userone">
                      <ul class="userinfo">
                <li>${item.id}</li>
                <li>${item.author}</li>
                <li>${item.title}</li>
                <li>${item.content}</li>
                <li>${item.email}</li>
                <li id=${item.id} onclick="deleteArt(this)">删除</li>
              </ul>
              </li>`;
        $(".users").append(con);
      });
    },
    error: function (e) {
      alert("接收数据错误！");
    },
  });
}

// 提示信息的函数
function tip(data) {
  $(".ding").text(data);
  $(".ding").fadeIn(1000);
  setTimeout(() => {
    $(".ding").fadeOut(1000);
  }, 2000);
}
