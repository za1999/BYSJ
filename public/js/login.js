$(function(){
    // 一开始清除所有的session阿
    sessionStorage.clear();
    /************************************这里是登陆的地方 ********************/
    var lo = this.getElementById("login");
    // 登陆的判断
    lo.onclick = function(){
        // 这里是邮箱的检验
        var yx = $("#lyx").val()
        var mm = $("#lmm").val()
        var yxpd = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
          if(yxpd.test(yx)==false){
             tip("邮箱格式不正确！")
              return 0
          }
        //这里是密码的检验
        
                
                    if(mm.length<3||mm.length>16){
                        tip("密码不符合规范！")
                        return 0;
                    }else{
                        if(mm.length != mm.replace(/\s+/g,"").length){
                            tip("密码不能使用空格！")
                        }else{
                            tip("登陆成功")


                               $.ajax({
            type: 'post',
            url: "http://localhost:3000/login",
            data:{
                email:yx,
                password:mm
            },
            success: function(data) {
               if(data.code==200){
                   sessionStorage.setItem("email",data.email);
                   sessionStorage.setItem("name",data.name);
          window.location="/home"
               }else{
                tip("请输入正确的账号密码！")
               }
            },
            error: function() {
                tip("登录请求失败！")
            }
        });




                        }
                    }
                  
    }



    /*********************这里是注册的地方代码**************************************/
    var zc = this.getElementById("zc");
    zc.onclick = function(){
        //用户名的验证
        var zyhm = $("#zyhm").val()
        if(zyhm.length<2||zyhm.length>6){
            tip("用户名长度不符合规范！")
            return 0;
        }else{
            if(zyhm.length != zyhm.replace(/\s+/g,"").length){
                tip("用户名不能带有空格！")
                return 0;
            }
        }
        // 邮箱的验证
        var zyx = $("#zyx").val()
        console.log(zyx)
        var zcs = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
          if(zcs.test(zyx)==false){
             tip("邮箱格式不正确！")
              return 0
          }
          //密码的验证
          var zmm = $("#zmm").val()
          
          if(zmm.length<3||zmm.length>16){
            tip("密码不符合规范！")
            return 0;
        }else{
            if(zmm.length != zmm.replace(/\s+/g,"").length){
                tip("密码不能使用空格！")
            }
        }
        $.ajax({
            type: 'post',
            url: "http://localhost:3000/register",
            data:{
                name:zyhm,
                password:zmm,
                email:zyx
            },
            success: function(data) {
          if(data==200){
              tip("注册成功请前往登陆吧！")
              $("#zyhm").val("")
              $("#zyx").val("")
              $("#zmm").val("")
          }else{
              tip("用户名或者邮箱已经被注册，请更改！")
              $("#zyhm").val("")
              $("#zyx").val("")
              $("#zmm").val("")
          }

            },
            error: function() {
                tip("登录请求失败！")
            }
        });

    }

  //游客登陆
  var youke = this.getElementById("youke");
  youke.onclick = function(){
    // sessionStorage.removeItem('username');
    window.location="/home"

  }


})



// 提示信息的函数
function tip(data){
    $('.ding').text(data)
    $('.ding').fadeIn(1000)
    setTimeout(() => {
        $('.ding').fadeOut(1000)
    }, 2000);

}