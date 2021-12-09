var express =require("express");
var CartController=require("../controllers/CartController");
var router=express.Router();
router.use(express.json());
router.get("/",CartController.Cartroot);
router.get('/getCart' ,CartController.getCart);
router.post('/insertCart' ,CartController.insertCart);
router.delete('/deleteCart/:Id' ,CartController.deleteCart);
router.put('/updateCart' ,CartController.updateCart);
router.delete('/deleteAllCart',CartController.deleteAllCart)
module.exports=router;