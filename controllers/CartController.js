var CartModel =require("../model/Cart");
const CartController={
    Cartroot:function(req,res){
        var strMsg="Server Running";
        console.log(strMsg);
        res.status(200).send(strMsg);
    },
    getCart:function(req,res){
        return CartModel.getCart(req,res);
    },
    insertCart:function (req,res) {
        return CartModel.insertCart(req,res);
    },
    deleteCart:function (req,res) {
        return CartModel.deleteCart(req,res);
    },
    updateCart:function (req,res) {
        return CartModel.updateCart(req,res);
    },
    deleteAllCart:function (req,res) {
        return CartModel.deleteAllCart(req,res);
    }
}
module.exports=CartController;
