var LoginRegisterModel =require("../model/LoginRegister");
const LoginRegisterController={
    loginregister:function(req,res){
        var strMsg="Server Running of login";
        console.log(strMsg);
        res.send(200).send(strMsg);
    },
    login:function(req,res){
        return LoginRegisterModel.login(req,res);
         
    },
    // sendMail:function(req,res){
    //     return LoginRegisterModel.sendMail(req,res);
    // },
    register:function(req,res){
        return LoginRegisterModel.register(req,res);
    },
    forget:function(req,res){
        return LoginRegisterModel.forget(req,res);
    },
    updatePassword:function(req,res){
        return LoginRegisterModel.updatePassword(req,res);
    }
}
module.exports=LoginRegisterController;
