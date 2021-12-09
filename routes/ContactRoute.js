var express =require("express");
var ContactController=require("../controllers/ContactController");
var router=express.Router();
router.use(express.json());
router.get("/",ContactController.contactroot);
router.post('/contact',ContactController.contact);
module.exports=router;
