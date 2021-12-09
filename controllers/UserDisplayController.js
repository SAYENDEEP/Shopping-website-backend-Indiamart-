var UserDisplayModel =require("../model/UserDisplay");
const UserDisplayController={
    UserDisplayroot: function(req,res)
    {
        var strMsg="Server Running";
        console.log(strMsg);
        res.status(200).send(strMsg);
    },
    getAllUser: function(req,res)
    {
        return UserDisplayModel.getAllUser(req,res);
    },
    newRecord: function(req,res){
        return UserDisplayModel.newRecord(req,res);
    },
    updateRecord:function(req,res){
        return UserDisplayModel.updateRecord(req,res);
    },
    deleteUser:function(req,res){  
        return UserDisplayModel. deleteUser(req,res);
    }
    
}
module.exports=UserDisplayController;