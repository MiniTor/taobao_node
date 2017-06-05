/***
 * 用户中心相关功能模块
 * 向外提供
 *  myOrders()
 *  buyStat()
 *  lotteryStat()
 *  lotterySave()
 *  4个请求处理函数
 */
const pool = require('./dbpool');

module.exports = {
    /**
     * 从请求GET消息中读取客户端提交的uid，
     * 查询出该用户所有的订单信息，以JSON格式返回：
     * [{},{},...{}]
     * @param req
     * @param res
     */
    myOrders: (req, res)=>{
        //接收客户端GET请求中在URL后追加的请求数据
        //console.log(req);
        var uid = req.query.uid;
        //从连接池中获取连接对象，执行SELECT操作
        pool.getConnection((err,conn)=>{
            conn.query('SELECT * FROM jd_order WHERE userId=?',[uid],(err,result)=>{
                var progress=0;
                for(var i=0;i<result.length;i++){
                    var order=result[i];
                    var oid=order.oid;
                    //闭包陷阱
                    conn.query('SELECT * FROM jd_product WHERE pid  IN (SELECT productId FROM jd_order_detail WHERE orderId=?)',[oid],(function(o){
                        return function(err,productResult){
                            o.products=productResult;
                            progress++; //有一个订单已经查询完对应的产品
                            if(progress===result.length){
                                res.json(result);
                                conn.release();
                            }
                        }
                    })(order))
                }
//console.log(result);
            })
        })
    },
    buyStat: (req, res)=> {
        var output = [
            {label:'1月',value:4000},
            {label:'2月',value:2000},
            {label:'3月',value:5000},
            {label:'4月',value:3000},
            {label:'5月',value:0},
            {label:'6月',value:2000},
            {label:'7月',value:6000},
            {label:'8月',value:7000},
            {label:'9月',value:5300},
            {label:'10月',value:3000},
            {label:'11月',value:4000},
            {label:'12月',value:3500}
        ];
        res.json(output);
    }
}