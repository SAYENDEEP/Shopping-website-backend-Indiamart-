const Sequelize=require("sequelize");
const db1= require("../db.config");
var sequelize = new Sequelize(db1.DB,db1.USER,db1.PASSWORD,{
    host:db1.HOST,
    dialect:db1.dialect,
    pool:{
        min:db1.pool.min,
        max:db1.pool.max,
        acquire:db1.pool.acquire,
        idle:db1.pool.idle
    }
});

let CartTable=sequelize.define('CartTable',{
    id:{
       primaryKey:true,
       type:Sequelize.INTEGER
     },
     productId:Sequelize.INTEGER,
     productName:Sequelize.STRING,
     cost:Sequelize.INTEGER,
     description:Sequelize.STRING,
     image:Sequelize.STRING,
     category:Sequelize.STRING,
     rating:Sequelize.STRING,
     quantity:Sequelize.INTEGER
},{
   timestamps:false,
   freezeTableName:true
});

const CartData=
{
   getCart:function (req,res) {
    CartTable.findAll({raw:true}).then((data)=>{
        console.log("All Record in database");
        console.log(data);
        res.send(data);
    }).catch(err=>{
        console.log("Error in Creation");
        res.status(400),send(err);
    })
   },
   insertCart:function (req,res) {
    var id =  req.body.id;
    var productId=req.body.productId
    var productName =  req.body.productName;
    var cost =  req.body.cost;
    var description =  req.body.description;
    var image =  req.body.image;
    var category=req.body.category;  
    var rating=req.body.rating;
    var quantity=req.body.quantity;

    var CartObj=CartTable.build({id:id,productId:productId,productName:productName,
        cost: cost, description: description,image:image,
        category:category,rating:rating,quantity:quantity});
    CartObj.save().then(()=>{
        console.log("Successfully inserted");
        res.send("Inserted Successfully");
    }).catch((err)=>{
        console.log("Error Encountered"+err);
        res.send("Error Encountered");
      })  
   },
   deleteCart:function(req,res){
    var Id1 =req.params.Id;
    var Id=parseInt(Id1);
  console.log(Id);
  CartTable.destroy({where:{id:Id}}).then(()=>{
      console.log("Deleted Successfully");
      res.send("Deleted Successfully");
   }).catch((err)=>{
      console.log("Error Encountered");
      res.send(err);
  })
 },
 updateCart:function(req,res){
    var id =req.body.id;
    var quantity =  req.body.quantity;
   
    
    CartTable.update(
           {quantity:quantity},
           {where:{id:id}}
       ).then(data=>{
           console.log(data);
           var str ="Record updated successfully";
           console.log(str);
           res.status(201).send(str);
       }).catch(err =>{
           console.log("there is a error in updating the table");
           res.status(400).send(err);
       })
},
deleteAllCart:function(req,res){
//     var Id1 =req.params.Id;
//     var Id=parseInt(Id1);
//   console.log(Id);
  console.log(req.body);
  CartTable.destroy({
    where: {},
    truncate: true
  }).then(()=>{
      console.log("Delete All product");
      res.send("Cart Empty");
   }).catch((err)=>{
      console.log("Error Encountered"+err);
      res.send(err);
  })
 } 
}
module.exports=CartData;
