//模块五:页面加载完成后,异步请求登录用户购物车中商品
//
//!!!!加入一个判断如果sessionStorage没有uid
//没登录   shopping.js
//alert("ok111");
//console.log(sessionStorage['loginUid']);


var uid1 = sessionStorage['loginUid'];
$(function(){

//ajax start
$.ajax({
  url:"data/cart_detail_list.php",
  data:{uid:uid1},
  success:function(data){
    var html = '';
		$.each(data,function(i,obj){
		  html += `
<tr>
<td>
<input type="checkbox"/>
<input type="hidden" value="1" />
<div><img src="${obj.pic}" alt=""/></div>
</td>
<td><a href="">${obj.pname}</a></td>
<td>${obj.price}</td>
<td>
<button class='subCount'>-</button>
<input type="text" value="${obj.count}" class="ccount"/>
<button class='addCount' id="${obj.did}">+</button>
</td>
<td><span>￥${obj.price*obj.count}</span></td>
<td><a href="${obj.did}">删除</a></td>
</tr>			
			`;
		});

$("#cart tbody").html(html);

	},
});
//ajax end





//删除购物车项
//1:绑定点击事件
$("#cart").on('click','a',function(e){
 e.preventDefault();
 //2:获取当前元素a href did
 var did = $(this).attr("href");
 //console.log(did);
 //3:发送ajax请求
 var a = this;
 //console.log(a);
 $.get("data/delete_cart_detail.php?did="+did,
	 function(data){
	 //4:如果删除成功
	 console.dir(data);
	 if(data.code>0){
		 $(a).parents("tr").remove();
		 //console.log(this);

	 }
	 //5:将当前行删除 tr
 });
});



//第五个模块:更新数量+
//1:选择器绑定点击事件
//17:50---18:00 完成练习 下课
$("#cart").on('click','.addCount',function(e){
     var id = $(this).attr("id");
		 var self = this;
     $.get("data/update_add_cart_detail.php?did="+id,
			 function(data){
			  //数据库增加成功
		 var input = $(self).parent().find('.ccount');
		 var v = parseInt(input.val())+1;
		 input.val(v);
		 });
});
//2:发送ajax

});

//第六个模块:更新数量-
//1:选择器绑定点击事件
//17:50---18:00 完成练习 下课
$("#cart").on('click','.subCount',function(e){
	var id = $(this).attr("id");
	var self = this;
	$.get("data/update_sub_cart_detail.php?did="+id,
		function(data){
			//数据库增加成功
			var input = $(self).parent().find('.ccount');
			var v = parseInt(input.val())-1;
			input.val(v);
		});
});

$("#addOrder").click(function(){
	location.href = 'addorder.html';
});