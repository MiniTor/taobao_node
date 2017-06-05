/***
 * 用户中心相关功能模块
 * 向外提供
 *  myOrders()
 *  buyStat()
 *  lotteryStat()
 *  lotterySave()
 *  4个请求处理函数
 */

$("#header").load('header.html',function(){
  $("#welcome").html("欢迎回来:"+sessionStorage['loginName']);
});
$("#footer").load("footer.html");
//左侧导航点击切换效果
$('.affix').on('click', 'li a', function(e){
    e.preventDefault();
    //修改A的父元素LI的.active的位置
    $(this).parent().addClass('active').siblings('.active').removeClass('active');

    //根据A的HREF找到对应的右侧DIV，修改.active的位置
    var id = $(this).attr('href');

    $(id).addClass('active').siblings('.active').removeClass('active');
})


//功能点3：异步请求“我的订单”数据
//$("#lmy-order").click(function(e){
   //e.preventDefault();
   $.ajax({
     type:'GET',
     url:'/uc/myorder',
     data:{uid:sessionStorage['loginUid']},
     success:function(list){

       var html = '';
       for(var i=0;i<list.length;i++){
           var order=list[i];
         html += `
         <tr>
            <td colspan="6">订单编号：${order.oid}</td>
         </tr>
         <tr>
            <td>`;
           for(var j=0;j<order.products.length;j++){
               var p=order.products[j];
               html+=`<img src="${p.pic}" width="50">`;
           }
             html+=`</td>
            <td>${order.rcvName}</td>
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
       }
       $("#table-order tbody").html(html);

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
//});


//功能4：消费统计图
//Canvas
//$("#lbuy-stat").click(function(e){
 // e.preventDefault();
  $.ajax({
    url:'uc/buystat',
    success:function(data){
      //根据服务器返回数据绘制svg统计图
        console.log(data);
      var w = 800;//画布宽
      var h = 500;//画布高
      $("#svg-buy-stat").attr("width",w).attr("height",h);

      var barWidth = w/(2*data.length+1);

      var html = '';
      $.each(data,function(i,month){
          console.log(month);
        var bw = barWidth;
        var bh = month.value/20;
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



//fusioncharts

    $.ajax({
        type:'GET',
        url: 'uc/buystat',
        data:{uid:sessionStorage['loginUid']},
        success: function (list) {
            //根据服务器返回数据绘制svg统计图
            var c=new FusionCharts({
                type:'column3d',
                renderAt:'container-buystat-svg',
                width:'800',
                height:'600',
                dataSource:{data:list}
            });
            c.render();
        }
    })
//});

//功能5：抽奖
