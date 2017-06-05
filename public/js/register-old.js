/**
 * Created by bjwsl-001 on 2017/3/22.
 */

//1:为提交按钮绑定点击事件
//2:发起异步ajax请求
//3:参数
//4:如果请求成功
//   4.1 判断 obj.code > 1 正确
//   4.2:注册失败
$(".bt-submit").click(function(){
  var url = "data/register.php";
  //参数一:
  //var data = {"uname":uname.value,"upwd":upwd.value};
  //参数二:
  //var data = "uname="+uname.value+"&upwd="+upwd.value;
  //参数三:
  var data = $("#form-register").serialize();
  $.ajax({
    type:"POST",
    url:url,
    data:data,
    success:function(obj){
      if(obj.code<0){
        alert("注册失败,错误原因"+obj.msg);
      }else{
        alert("注册成功!3s后将自动跳转登录页面");
        setTimeout(function(){
          location.href = 'productlist.html';
        },3000);
      }
    },
    error:function(){
    }
  });
});
