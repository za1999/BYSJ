$(function () {
  // 登陆的点击
  $(".adminLogin").click(function () {
    login();
  });

  // 监听enter
  $("body").keyup(function (e) {
    if (e.keyCode == 13) {
      login();
    }
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

// 登陆函数
function login() {
  let email = $(".userEmail").val();
  let password = $(".password").val();
  if (email.length == 0 || password.length == 0) {
    tip("请您输入正确的邮箱密码！");
  } else {
    $.ajax({
      type: "post",
      url: "http://localhost:3000/AdminHandle",
      data: {
        email: email,
        password: password,
      },
      success: function (data) {
        if (data != 0) {
          tip("欢迎你管理员:" + data);
          setTimeout(() => {
            sessionStorage.setItem("AdminName", data);
                window.location = "/AdMain";
          }, 1500);
        } else {
          tip("请输入正确的账号密码！");
        }
      },
      error: function () {
        tip("登录请求失败！");
      },
    });
  }
}
