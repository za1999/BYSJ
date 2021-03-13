$(function(){

// 开局获取名字
if(sessionStorage.getItem('name')){
    $(".hright ul li").eq(0).text(sessionStorage.getItem('name'))
}

 // 登陆页面开始请求所有文章
 $.ajax(
    {
        type:'post',
        url:'http://localhost:3000/allart',
        success:function(data){
            $(".art").remove()
            for(k in data) {
                var con = `
                <li class="art">
                <p>文章ID:<span style="margin-right: 10px;">${data[k].id}</span> ${data[k].title} <span class="author">作者:${data[k].author}</span></p>
                <div class="all" aid='${data[k].id}' onclick="look(this)">
                    详情
                </div>
            </li>`
                $(".articles").append(con)

            }

        },
        error:function(e){
            alert("接收数据错误！")
        }
    }
)






// 登陆注册的点击
$(".login").click(function(){
    window.location="/login"
})



// 登陆注册跳转
$(".hright ul li").eq(0).click(function(){
    if(sessionStorage.getItem('name')){
        window.location="/"
    }
    
})
// 写文章判断及跳转
$(".wart").click(function(){
    if(sessionStorage.getItem('name')){
        window.location="/writepage"
    }else{
        tip("您未登陆！")
    }
})
// 写帖子判断及跳转
$(".wpost").click(function(){
    if(sessionStorage.getItem('name')){
        window.location="/writepost"
    }else{
        tip("您未登陆！")
    }
})


// 用户中心跳转
$(".hright ul li").eq(1).click(function(){
    if(sessionStorage.getItem('name')){
        window.location="/usercenter"
    }else{
        tip("您未登陆！")
    }
    
})


    // 三种类型选择点击
    $(".hleft li").click(function(){
        for(var i=0;i<$(".hleft li").length;i++){
            $(".hleft li").eq(i).removeClass("choice")
            $(this).addClass("choice")
        }
    })

    $(".hleft li").eq(0).click(function(){
        for(var i=0;i<$(".con").length;i++){
            $(".con").eq(i).removeClass("show")
        }
        $(".con").eq(0).addClass("show")
       
    })
    $(".hleft li").eq(1).click(function(){
        for(var i=0;i<$(".con").length;i++){
            $(".con").eq(i).removeClass("show")
            $(this).addClass("show")
        }
        $(".con").eq(1).addClass("show")
        
    })
    $(".hleft li").eq(2).click(function(){
        for(var i=0;i<$(".con").length;i++){
            $(".con").eq(i).removeClass("show")
            $(this).addClass("show")
        }
        $(".con").eq(2).addClass("show")
        
    })





    // 这里是点击聊天发送
    $(".wr").click(function(){
       send();
    })
    // 监听enter
    $(".wl").keyup(function(e){
        if(e.keyCode ==13){
            send()
        }
    })



// 下面是帖子的一些js代码
$.ajax(
    {
        type:'post',
        url:'http://localhost:3000/allpost',
        success:function(data){
           $(".po").remove()
           for(k in data) {
            var con = `
            <li class="po" postid='${data[k].postid}' onclick="lookpost(this)">
            <!-- 帖子左部分 -->
            <div class="pl">
                <div class="label">
                    <span>发布者:</span>${data[k].name}
                </div>
                <p class="title"><a href="javascript:;">${data[k].title}</a></p>
                <p class="text">
                ${data[k].con}
                </p>
            </div>

            <!-- 帖子右部分 -->
            <div class="pr">
                    <img src="${data[k].img}" alt="">
            </div>
        </li>`
            $(".posts").append(con)

        }
        },
        error:function(e){
            alert("接收数据错误！")
        }
    }
)





















})

// 提示信息的函数
function tip(data){
    $('.ding').text(data)
    $('.ding').fadeIn(1000)
    setTimeout(() => {
        $('.ding').fadeOut(1000)
    }, 2000);

}


// 发送聊天的函数
function send(){
    let con = $(".wl").text()
    let talk = ` <div class="tr">
    <div class="yourName">我</div>
    <div class="yourText">${con}</div>
</div>`
    if(con.length==0){
        tip("发送内容不能为空")
    }else{
            $(".cbox").append(talk)
            $(".wl").text("")
            var scrollHeight = $('.cbox').prop("scrollHeight");
            $('.cbox').scrollTop(scrollHeight,200);
    }

}

//看文章的函数
function look(e){
    var id = $(e).attr("aid")
    sessionStorage.setItem("artid",id);
    window.location = "/showart"
}

// 看帖子的函数
function lookpost(e){
    var id = $(e).attr("postid")
    sessionStorage.setItem("postid",id);
     window.location = "/showpost"
}