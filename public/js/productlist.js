//当网页加载完成自动发送请求
//data/header.php  <div id="header"></div>
//data/footer.php  <div id="footer"></div>
$(function(){
  $("#header").load("data/header.php");
	$("#footer").load("data/footer.php");
});
console.log(sessionStorage['loginUid']);
if(sessionStorage['loginUid']!==undefined){
	$(".modal").hide();
}
 


var loginUid = 0;
var loginUname = "";
//1:用户登录
//1.1 为提交按钮添加点击事件
$("#bt-login").click(function(){
//1.2 获取用户名密码
var n = $("#uname");
var p  = $("#upwd");
//1.3 发送ajax
$.ajax({
   type:"POST",
	 url:"data/user_login.php",
	 data:{uname:n.val(),upwd:p.val()},
   success:function(data){
		if(data.code<0){
		  $("p.alert").html(data.msg);
		}else{
		  $(".modal").hide();
			$("#welcome>span").html("欢迎回来:"+data.uname)
      //loginUid = data.uid;
			//loginUname = data.uname;
			//console.log("...."+loginUid);
			//console.dir(data);
			sessionStorage['loginUid'] = data.uid;
			sessionStorage['LoginUname'] = data.uname;
		}
	 },
	 error:function(data){
	  //console.log("响应消息失败!");
		//$(".modal").hide();
	 }
});
//1.4 返回错误: 在错误提示框 
//    用户名或密码不正确
//1.5 返回正确: 将当前登录框隐藏
//1.6 欢迎回来: xxx
});
//2:浏览商品

//3:浏览商品(分页)
//a:发起GET异步请求 data/product_list.php
$(function(){
  loadProduct(1);
});

//#将分页功能封装到函数中
function loadProduct(pno){
$.ajax({
   url:"data/product_list.php?pageNum="+pno,
	 success:function(pager){
		 //b:page.data
     //c:循环所有数组元素
     //console.dir(pager.data);
		 var html = "";
		 $.each(pager.data,function(i,obj){
			 //d:拼字符串
			   html += `
<li>
<a href="#"><img src="${obj.pic}" alt=""/></a>
<p>￥${obj.price}</p>
<h1><a href="">${obj.pname}</a></h1>
<div>
<a href="" class="contrast"><i></i>对比</a>
<a href="" class="p-operate"><i></i>关注</a>
<a href="${obj.pid}" class="addcart"><i></i>加入购物车</a>
</div>
</li>					 
				 
				 `;

		 });

//e:#plist ul
$("#plist ul").html(html);

//根据数组创建 页数列表 [1][2][3][4][5]
var html = "";
var size = pager.pageCount;
for(var i=1;i<=size;i++){
	 if(i==pno){
	 html += `<li class="active"><a href="#">${i}</a></li>`; 
	 }else{
    html += `<li><a href="#">${i}</a></li>`;
	 }
}

$("ol.pager").html(html);

	 }
});

}


//3:分页中添加点击事件
$("ol.pager").on("click","li a",function(e){
	//0:阻止默认事件行为
	e.preventDefault();
  //1:获得当前页数
	var pno = $(this).html();
	//2:调用函数 loadProduct
	loadProduct(pno);
});

//4:添加购物车
/**功能点5：为每个商品下面的“添加到购物车”绑定监听——事件代理**/
$('#plist').on('click','a.addcart', function(e){
  e.preventDefault();
  var pid = $(this).attr('href');
  //把当前登录用户编号+商品编号提交给服务器，执行购物车条目添加
  $.ajax({
    type: 'POST',  
    url: 'data/cart_detail_add.php',
    //data: {'uid': loginUid, 'pid': pid},
    data: {'uid': sessionStorage['loginUid'], 'pid': pid},
    success: function(data){
      if(data.code<0){
        alert('添加失败！错误原因：'+data.msg);
      }else {
        alert('添加成功！该商品已购买：'+data.count);
      }
    },
    error: function(){
      alert('添加购物车商品出错！请检查响应消息！');
    }
  });
});

/**功能点6：为“去购物车结算”绑定事件监听**/
//下面的做法错误！异步请求来的页头中的内容都是后添加到DOM上！
/*$('#settle_up').click(function(){
  alert(999999);
});*/

//5:查看购物车
$(document.body).on('click', '#settle_up', function(){
  //把当前登录用户名和编号保存入Cookie
  //document.cookie = 'loginUname='+loginUname;
  //document.cookie = 'loginUid='+loginUid;
  //跳转到购物车详情页面
	//alert("ok");
  location.href = 'shoppingcart.html';
});

//
$(document.body).on('click','#reguser',function(){
	location.href = 'register.html';
});