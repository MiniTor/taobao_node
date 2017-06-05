
// 14:50---14:56 一行一分钟
//功能一:若用户未登录，则跳转登录页面 productlist.html
// 1:判断sessionStorage[loginUid]
// 2:跳转productlist.html
//功能二:异步请求页头和页尾
// 1：异步加载 header.php
// <div id="header"></div>
// 2：异步加载 footer.php
//<div id="footer"></div>
//功能三:显示成创建订单编号 oid
// 1:显示订单
// 2:从sessionStorage把oid删除
if(sessionStorage['loginUid']===undefined){
   location.href = 'productlist.html';
}

$("#header").load('data/header.php',function(){
   $("#welcome span").html("欢迎回来:"+sessionStorage['loginUname']);
});

$("#footer").load("data/footer.php");

$("#oid").html(sessionStorage['oid']);
sessionStorage.removeItem('oid');
