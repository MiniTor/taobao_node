$('#bt-login').click(function(){
    var n=$('#userName').val();
    var p=$('#pwd').val();
    console.log(p);
    $.ajax({
        type:'POST',
        url:'/user/login',
        data:{userName:n,pwd:p},
        success:function(result){

            if(result.code>1){
                alert("登录失败,错误原因"+result.msg);
            }else{
                alert("登录成功!3s后将自动跳转用户中心"+result);
                setTimeout(function(){
                    location.href = 'usercenter.html';
                    sessionStorage['loginName']=n;
                    sessionStorage['loginUid']=result.uid;

                },3000);
            }
        }
    })
})