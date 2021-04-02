$(function(){

// 改用户名和邮箱
$(".infos span").eq(1).text(sessionStorage.getItem("name"));
$(".infos span").eq(4).text(sessionStorage.getItem("email"));

     // 开始请求你的帖子
 $.ajax(
    {
        type:'post',
        url:'http://localhost:3000/yourpost',
        data:{
            email:sessionStorage.getItem('email')
        },
        success:function(data){
            for(k in data) {
                var con = `
                <li id=${data[k].postid} onclick="post(this)">${data[k].title}</li>

                `
                $(".left ul").append(con)
    
            }
           
        },
        error:function(e){
            alert("接收数据错误！")
        }
    }
)

// 开始请求你的文章
$.ajax(
    {
        type:'post',
        url:'http://localhost:3000/yourart',
        data:{
            email:sessionStorage.getItem('email')
        },
        success:function(data){
            for(k in data) {
                var con = `
                <li id=${data[k].id} onclick="art(this)">${data[k].title}</li>

                `
                $(".right ul").append(con)
    
            }         
        },
        error:function(e){
            alert("接收数据错误！")
        }
    }
)


})

// 去帖子的函数
function post(e){
    var id = $(e).attr("id")
    sessionStorage.setItem("postid",id);
    window.location = "/showpost"
}
// 去文章的函数
function art(e){
    var id = $(e).attr("id")
    sessionStorage.setItem("artid",id);
    window.location = "/showart"
}