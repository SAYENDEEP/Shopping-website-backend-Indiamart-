var express =require("express");
var ProductController=require("../controllers/ProductController");
var router=express.Router();
router.use(express.json());
// router.get("/",ProductController.Productroot);
router.get('/Products' ,ProductController.getAllProduct);
module.exports=router;