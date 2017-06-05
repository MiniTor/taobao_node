
$(".bt-register").click(function(){

  var n=$('#userName').val();
  var p=$('#pwd').val();
  console.log(n);
  $.ajax({
    type:"POST",
    url:'/user/register',
    data:{userName:n,pwd:p},
    success:function(result){
      console.log(result);
      if(result.code<0){
        alert("注册失败,错误原因"+result.msg);
      }else{
        alert("注册成功!3s后将自动跳转登录页面");
        setTimeout(function(){
          location.href = 'login.html';
        },3000);
      }
    },
    error:function(){
    }
  });
});
