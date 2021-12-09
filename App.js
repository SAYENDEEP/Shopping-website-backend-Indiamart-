const express =require("express");
var UserDisplay=require('./routes/UserDisplayRoute');
var LoginRegister=require('./routes/LoginRegisterRoute');
var contact=require('./routes/ContactRoute')
var Products=require('./routes/ProductRoute')
var Cart=require('./routes/CartRoute')
var Payment=require('./routes/PaymentRoute')
// var Cart1=require('./routes/Cart1Route')
// var Forget=require('./routes/Forget')
var app=express();
var cors=require("cors");
app.use(cors());
app.use("/UserDisplay",UserDisplay);
app.use("/LoginRegister",LoginRegister);
app.use("/ContactUser",contact);
app.use("/Products",Products);
app.use("/Cart",Cart);
app.use("/payment",Payment);
// app.use("/Cart1",Cart1);
// app.use("/Forget",Forget)
app.listen(8001,function(){
   console.log("Server is listening");
})