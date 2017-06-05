const http=require('http');
const express=require('express');
const user=require('./user');
const uc=require('./usercenter');
var app=express();
http.createServer(app).listen(8080);
app.use(express.static('public'));

app.get('/',(req,res)=>{
   res.redirect(301, '/register.html')
});
app.post('/user/register',user.register);
app.post('/user/login',user.login);
app.get('/uc/myorder',uc.myOrders);
app.get('/uc/buystat',uc.buyStat);