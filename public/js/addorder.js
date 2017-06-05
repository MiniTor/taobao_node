//功能一:根据用户id异步请求购物车内容
//11:36--11:46
var uid = sessionStorage['loginUid'];
/*
1:发送ajax请求
2:cart_detail_list.php
3:接收返回数据
4:创建变量拼接字符串      var html = '';
5:创建变量所有购物产品合计 var sum = 0;
6:循环 拼字符串 addorder.html 78-92
7:.goods-items
8:合计 隐藏域
*/
$.ajax({
  type:'POST',
  url:'data/cart_detail_list.php',
  data:{uid:uid},
  success:function(list){
    var html = '';  //拼接字符串 div
    var sum = 0;    //所有商品总金额
    $.each(list,function(i,obj){
        sum += obj.price * obj.count;
        html += `
        <div class="goods-item">
            <div class="p-img">
                <a target="_blank" href=""><img src="${obj.pic}" alt=""></a>
            </div>
            <div class="p-name">
                <a href="" target="_blank">
                    ${obj.pname}
                </a>
            </div>
            <div class="p-price">
                <strong class="jd-price">￥${obj.price}</strong>
                <span class="p-num">x${obj.count}</span>
                <span class="p-state">有货</span>
            </div>
        </div>
        `;
    });//each end

    $(".goods-items").html(html);
    $("#warePriceId").html("￥"+sum);
    $(".price-num").html("￥"+sum);
    $("#price").val(sum);

  }
});

//功能二:为"提交订单"绑定事件监听
//14:15---14:27
//1:收集用户所的输入--
//2:多收集用户id
//3:异步请求 data/order_add.php
//4:在成功处理方法success
//5:依据返回对象判断是否创建订单成功
//6:obj.code < 0
//7:alert 订单生成失败
//8:否则
//9:订单创建成功
//10:保存订单id -->sessionStorage
//11:自动跳转----->addorder_succ.html
//12:返回错误  提示订单提交失败

$(".checkout-submit").click(function(){
  //1:收集参数
  var data = $("#form-order").serialize();
  data += "&userId="+sessionStorage['loginUid'];

  $.ajax({
    type:'POST',
    url:'data/order_add.php',
    data:data,
    success:function(obj){
      if(obj.code<0){
        alert("订单生成失败,错误消息:"+obj.msg);
      }else{
        sessionStorage['oid']=obj.oid;
        location.href = "addorder_succ.html";
      }
    },
    error:function(){
       alert("订单提交失败!请查看响应消息");
    }
  });
});



