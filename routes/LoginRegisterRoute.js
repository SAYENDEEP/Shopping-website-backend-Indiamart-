var express =require("express");
var LoginRegisterController=require("../controllers/LoginRegisterController");
var router=express.Router();
router.use(express.json());

router.get("/",LoginRegisterController.loginregister);
router.post('/register',LoginRegisterController.register);
router.post('/login',LoginRegisterController.login);
router.post('/forget',LoginRegisterController.forget)
// router.post('/sendMail',LoginRegisterController.sendMail);
router.put('/updatePassword',LoginRegisterController.updatePassword)
module.exports=router;