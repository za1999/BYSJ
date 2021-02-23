$(function(){

// 开局获取名字
if(sessionStorage.getItem('name')){
    $(".hright ul li").eq(0).text(sessionStorage.getItem('name'))
}




// 登陆注册跳转
$(".hright ul li").eq(0).click(function(){
    if(sessionStorage.getItem('name')){
        window.location="/"
    }
    
})
// 写文章判断及跳转
$(".wart").click(function(){
    alert("你好")
    if(sessionStorage.getItem('name')){
        window.location="/writepage"
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