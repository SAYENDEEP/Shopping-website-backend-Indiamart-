var ProductModel =require("../model/Product");
const ProductController={
    // Productroot: function(req,res)
    // {
    //     var strMsg="Server Running";
    //     console.log(strMsg);
    //     res.status(200).send(strMsg);
    // },
    getAllProduct: function(req,res)
    {
        return ProductModel.getAllProduct(req,res);
    }
}
module.exports=ProductController;