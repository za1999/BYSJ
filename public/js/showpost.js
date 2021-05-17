$(function(){
 // 开始请求帖子
 $.ajax(
    {
        type:'post',
        url:'http://localhost:3000/showpost',
        data:{
            id:sessionStorage.getItem('postid')
        },
        success:function(data){
            console.log(data)
            let time = timeTrans(data.postid)
            $(".title").text(data.title)
            $(".head .name span").eq(0).text(data.name)
            $(".head .name span").eq(1).text(time)
           if(data.con.length>0){
            $(".maincon").text(data.con)
           }
           if(data.img){
               $(".img").attr("src",data.img)
           }

        },
        error:function(e){
            alert("接收数据错误！")
        }
    }
)


// 这里是请求评论的函数调用
allpcom();

        // 关闭评论框
        $(".pcom span").click(function(){
            $(".icom").text('')
            $(".layui-upload-img").attr("src",'');
            $(".pcom").hide(1000)
        })
        // 开启评论框
        $(".join").click(function(){
            $(".icom").text('')   
            $(".layui-upload-img").attr("src", "");
            if(sessionStorage.getItem('name')){
                $(".pcom").show(1000)
            }else{
                tip("请登录")
            }
        })


// 监听一下enter
$(".icom").keyup(function(e){
    if(e.keyCode ==13){
        send()
    }
})
// 发送评论的点击
$(".input").click(function(){
    send()
})

})


// 转换时间戳的函数

function timeTrans(date){
    var date = new Date(date*1000);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y+M+D+h+m+s;
}



// 发送聊天的函数
function send(){
    let con = $(".icom").text()
    let imgsrc = $(".layui-upload-img").attr("src");
    if(con.length==0){
        tip("发送内容不能为空")
    }else{
            $.ajax({
                type: 'post',
                url: "http://localhost:3000/addpmon",
                data:{
                    postid:sessionStorage.getItem('postid'),
                    name:sessionStorage.getItem('name'),
                    con:con,
                    img:imgsrc,
                    time:new Date()
                },
                success: function(data) {
                    console.log(data)
                   if(data==200){
                    $(".icom").text('')
                    tip("提交评论成功！")
                    $(".pcom").hide(1000)
                    allpcom()
                   }else{
                    tip("提交评论失败")
                   }
                },
                error: function() {
                    tip("提交发生错误")
                }
            });
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


// 请求评论的函数
function allpcom(){
    $.ajax(
        {
            type:'post',
            url:'http://localhost:3000/allpcom',
            data:{
                postid:sessionStorage.getItem('postid')
            },
            success:function(data){
                 if(data.length>=1){
                     console.log(data)
                    $(".com").remove()
                    for(k in data) {
                        if(data[k].img){
                 var con = `
                       <div class="com">
            <p class="name">
                <span>${data[k].name}</span>（<span>${data[k].time}</span>）
            </p>
            <div class="con">

            ${data[k].con}
            <div class="plimg">
            <img src=${data[k].img} ></img>
            </div>
            
            </div>
        </div>`;
        $(".post").append(con);
                        }else{
                                     var con = `
                       <div class="com">
            <p class="name">
                <span>${data[k].name}</span>（<span>${data[k].time}</span>）
            </p>
            <div class="con">

            ${data[k].con}

            
            </div>
        </div>`;
        $(".post").append(con);
                        }
      
                       
       
                   }
                 }
                 
    
            },
            error:function(e){
                alert("接收数据错误！")
            }
        }
    )
}