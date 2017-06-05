
//15:26---15:31
//1:判断用户是否登录
//2:动态加载header
//2.1: welome 欢迎回来
//3:动态加载footer
if(sessionStorage['loginUid']===undefined){
  location.href = 'productlist.html';
}
$("#header").load('header.html',function(){
  $("#welcome span").html("欢迎回来:"+sessionStorage['loginUname']);
});
$("#footer").load("footer.html");


/*
功能2:发送ajax请求
1:发送异步请求 my_order.php
2:参数uid
3:成功接收消息 拼字符串
4:拼6td
*/
$("#lmy-order").click(function(e){
   e.preventDefault();
   $.ajax({
     url:'data/my_order.php',
     data:{uid:sessionStorage['loginUid']},
     success:function(list){
       var html = '';
       $.each(list,function(i,order){
         html += `
         <tr>
            <td>***</td>
            <td>${order.reyName}</td>
            <td>${order.price}</td>
            <td>${order.orderTime}</td>
            <td class="payment">${order.payment}</td>
            <td>
               <a href="#">查看</a>
               <a href="#">评价</a>
               <a href="#">晒单</a>
               <a href="#">还要买</a>
            </td>
         </tr>

         `;
       });

       $("#table-order tbody").html(html);

       //16:45---16:50
       //替换表格中的支付方式
       $("#table-order .payment").each(function(i,obj){
           if(obj.innerHTML==='1'){
             obj.innerHTML = '货到付款';
           }else if(obj.innerHTML==='2'){
             obj.innerHTML = '京东支付';
           }else if(obj.innerHTML==='3'){
             obj.innerHTML = '在线支付';
           }else if(obj.innerHTML==='4'){
             obj.innerHTML = '手机支付';
           }
       });

     }
   });
});



//功能3：点击当前元素
$(".affix").on("click","li a",function(e){
  e.preventDefault();
  $(this).parent().addClass("active").siblings('.active').removeClass('active');
  //操作右侧
  var id = $(this).attr("href");
  $(id).addClass('active').siblings('.active').removeClass("active");
});



//功能4：消费统计图
$("#lbuy-stat").click(function(e){
  e.preventDefault();
  $.ajax({
    url:'data/buy_stat.php',
    success:function(data){
      //根据服务器返回数据绘制svg统计图

      var w = 800;//画布宽
      var h = 500;//画布高
      $("#svg-buy-stat")
        .attr("width",w).attr("height",h);

      var barWidth = w/(2*data.length+1);
      console.log(barWidth);
      var html = '';
      $.each(data,function(i,month){
        var bw = barWidth;
        var bh = month.value;
        var bx = (2*i+1)*barWidth;
        var by = h-bh;

        html += `
          <rect width="${bw}" height="${bh}"
          x="${bx}" y="${by}"></rect>
        `;
      });
      $("#svg-buy-stat g").html(html);
    }

  });

});




