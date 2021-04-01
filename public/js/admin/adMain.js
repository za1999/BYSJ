$(function () {
  $(".listOne").click(function () {
    $(".menu").slideUp();
    $(".active").removeClass("active");
    $(this).addClass("active");
  });

  $(".menu li").click(function (event) {
    event.stopPropagation();
    $(".menuActive").removeClass("menuActive");
    $(this).addClass("menuActive");
  });

  $(".list .listOne")
    .eq(3)
    .click(function () {
      $(".menu").slideToggle();
      $(".menuActive").removeClass("menuActive");
      $(this).find(".menu li").eq(0).addClass("menuActive");
    });



    // 给管理员名字赋值
    $(".badge").text(sessionStorage.getItem("AdminName"));
});
