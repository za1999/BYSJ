$(function(){
    console.log(sessionStorage.getItem('artid'))




    // 开始请求文章
    $.ajax(
        {
            type:'post',
            url:'http://localhost:3000/showart',
            data:{
                id:sessionStorage.getItem('artid')
            },
            success:function(data){
                console.log(data)
                $(".author").text(data.author)
                $(".title").text(data.title)
                $(".content").empty()
                if(data.content){
                    $(".content").append(data.content)
                }
                
    
            },
            error:function(e){
                alert("接收数据错误！")
            }
        }
    )


    // 开始请求该文章的评论
allcom()





        // 关闭评论框
        $(".wcom span").click(function(){
            $(".com").text('')
            $(".wcom").hide(1000)
        })

    // 点击出现评论框
    $(".incom").click(function(){
        if(sessionStorage.getItem('name')){
            $(".wcom").show(1000)
        }else{
            tip("请登录")
        }
        
    })

    // 监听一下enter
    $(".com").keyup(function(e){
        if(e.keyCode ==13){
            send()
        }
    })
    // 发送评论的点击
    $(".input").click(function(){
        send()
    })

    // 评论

})

// 发送聊天的函数
function send(){
    let con = $(".com").text()

    if(con.length==0){
        tip("发送内容不能为空")
        $(".com").text("")
    }else{
            $(".com").text("")
            $.ajax({
                type: 'post',
                url: "http://localhost:3000/addmon",
                data:{
                    artid:sessionStorage.getItem('artid'),
                    name:sessionStorage.getItem('name'),
                    con:con
                },
                success: function(data) {
                    console.log(data)
                   if(data==200){
                    $(".com").text('')
                    tip("提交评论成功！")
                    $(".wcom").hide(1000)
                    allcom()
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
function allcom(){
    $.ajax(
        {
            type:'post',
            url:'http://localhost:3000/allcom',
            data:{
                artid:sessionStorage.getItem('artid')
            },
            success:function(data){
                 if(data.length>=1){
                    $(".comment ul li").remove()
                    for(k in data) {
                       var con = `
                       <li>
                       <span class="cleft">${data[k].con}</span>
                       <span class="cright">${data[k].name}</span>
                   </li>`
                       $(".comment ul").append(con)
       
                   }
                 }
                 
    
            },
            error:function(e){
                alert("接收数据错误！")
            }
        }
    )
}