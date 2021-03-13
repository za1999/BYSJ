$(function(){
    // 返回首页
    $(".gohome").click(function(){
        window.location="/home"
    })

    $(".input").click(function(){

        var title = $("input").eq(0).val();
        var page= $("#test-editormd textarea").val();
        //sessionStorage.getItem('name')
        if(title.length<=0){
            tip("标题不能为空")
        }else{
            
            $.ajax({
                type: 'post',
                url: "http://localhost:3000/writeart",
                data:{
                    id:Date.parse(new Date()),
                    email:sessionStorage.getItem('email'),
                    author:sessionStorage.getItem('name'),
                    con:page,
                    title:title
                },
                success: function(data) {
                    console.log(data)
                   if(data==200){
                    tip("提交文章成功！")
                       setTimeout(() => {
                        $("input").eq(0).val('');
                        $("#test-editormd textarea").val('');
                       window.location="/home"
                       }, 2000);
                   }else{
                    tip("提交文章失败")
                   }
                },
                error: function() {
                    tip("提交发生错误")
                }
            });
            
        }
        console.log(title)


        
        
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