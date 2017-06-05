/***
 * 用户相关功能模块
 * 向外提供 login()和register()两个请求处理函数
 */
const pool=require('./dbpool');
const qs=require('querystring');
module.exports={
    register:(req,res)=>{
        req.on('data',(buf)=>{
            var obj=qs.parse(buf.toString());
            pool.getConnection((err,conn)=>{
                conn.query('INSERT INTO t_login VALUES(null,?,?)',[obj.userName,obj.pwd],(err,result)=>{
                    var stu={code:1,msg:'注册成功',uid:result.insertId};
                    res.json(stu);
                    conn.release();
                })
            })
        })
    },
    login:(req,res)=>{
        req.on('data',(buf)=>{
            var obj=qs.parse(buf.toString());
            console.log(obj);
            pool.getConnection((err,conn)=>{
                conn.query('SELECT id FROM t_login WHERE uname=? AND upwd=?',[obj.userName,obj.pwd],(err,result)=>{
                        if(result.length>0){
                            var stu = {code: 1, msg: '登录成功', uid: result[0].id};
                        }else{
                            var stu={code:2,msg:'登录失败'}
                        }
                        res.json(stu);
                        conn.release();
                         }
                    )
                })
            })
        }
    }
