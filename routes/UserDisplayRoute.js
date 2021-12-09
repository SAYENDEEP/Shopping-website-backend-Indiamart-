var express =require("express");
var UserDisplayController=require("../controllers/UserDisplayController");
var router=express.Router();


router.use(express.json());
router.get("/",UserDisplayController.UserDisplayroot);
router.get('/getAllUser' ,UserDisplayController.getAllUser);
router.post('/newRecord',UserDisplayController.newRecord);
router.put('/updateRecord' ,UserDisplayController.updateRecord);
router.delete('/deleteUser/:Id',UserDisplayController.deleteUser);
module.exports=router;

