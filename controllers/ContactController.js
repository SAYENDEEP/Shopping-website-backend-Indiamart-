var ContactModel =require("../model/Contact");
const ContactController={
    contactroot:function(req,res){
        var strMsg="Server Running";
        console.log(strMsg);
        res.status(200).send(strMsg);
    },
    contact:function(req,res){
        return ContactModel.contact(req,res);
    }
}
module.exports=ContactController;