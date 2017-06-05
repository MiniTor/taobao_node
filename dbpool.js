/***
 * 数据库连接池模块
 * 向外提供 pool 对象
 */
const mysql=require('mysql');
var pool=mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    database:'taobao',
    connectionLimit:10
});
module.exports=pool;
