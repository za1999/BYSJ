$(function(){
    // 返回首页
    $(".gohome").click(function(){
        window.location="/home"
    })

    $(".input").click(function(){
        var x= $("#test-editormd textarea").val()
        console.log(x)
    })
})