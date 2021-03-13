var img='public/img/pkm.jpg';

$(function(){
 
    // 返回首页的点击
    $(".gohome").click(function(){
        window.location="/home"
    })






    // 这里是对提交帖子的处理
    $(".inputPost").click(function(){
        let title = $(".title").val();
        let wcon = $(".wcon").text()
        if(title.length<=0){
            tip("标题不可以为空！")
        }else{
           
            // 提交帖子的Ajax
            $.ajax({
                type: 'post',
                url: "http://localhost:3000/inputPost",
                data:{
                    id:Date.parse(new Date()),
                    email:sessionStorage.getItem('email'),
                    name:sessionStorage.getItem('name'),
                    con:wcon,
                    title:title,
                    img:img
                },
                success: function(data) {
                 if(data==200){
                     tip("发布帖子成功！")
                     $(".title").val('')
                     $(".wcon").text('')
                     $(".layui-upload-button").val('')
                     $("#base64Img").attr("src",'');
                     setTimeout(() => {
                         window.location = "/home"
                     }, 1000);
                 }
                },
                error: function() {
                    tip("提交发生错误")
                }
            });




        }
    })

})



// 转化为base64的函数

function toBase64(){
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        $("#base64Img").attr("style","display:inline-block");
        $("#base64Img").attr("src",reader.result);
        img = reader.result;
    }
    if (file) {
        reader.readAsDataURL(file);
    }

}


// 提示信息的函数
function tip(data){
    $('.ding').text(data)
    $('.ding').fadeIn(1000)
    setTimeout(() => {
        $('.ding').fadeOut(1000)
    }, 2000);

}