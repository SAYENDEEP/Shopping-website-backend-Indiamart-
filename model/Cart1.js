// var Sequelize = require("sequelize");
// const dbConfig = require("../db.config");
// const nodemailer=require('nodemailer');
// const productModel=require('./Product');
// const userModel=require('./LoginRegister');



// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   dialect: dbConfig.dialect,
//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle,
//   },
// });
// let Cart = sequelize.define(
//     "Cart",
//     {
//       cartId: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//       },
      
//       quantity: Sequelize.INTEGER
      
//     },
//     {
//       timestamps: false,
//       freezeTableName: true,
//     }
//   );

//   userModel.LoginRegisterTable.hasMany(Cart);
//   productModel.ProductTable.hasMany(Cart);
//   Cart.belongsTo(userModel.LoginRegisterTable);
//   Cart.belongsTo(productModel.ProductTable);

//     Cart.sync().then(()=>{
//             console.log("Table is created successfully");
//             }).catch((err)=>{
//                 console.log("Error occurred"+err)
//             })   
    
//     const cartData={
//         insertCart: function (req, res) {
            
//             var quantity1=req.body.quantity;
//             var CustomerCustomerId1=req.body.CustomerCustomerId;
//             var ProductProductId1=req.body.ProductProductId;
            
//             const Op=Sequelize.Op;
//            Cart.findAndCountAll({where:{ [Op.and]:[{CustomerCustomerId:CustomerCustomerId1},{ProductProductId:ProductProductId1}]},row:true}).then((data)=>
//           {console.log("Number of record are :"+data.count);
//             console.log(data);
//              if(data.count==0)
//              {
//                var cartObj = Cart.build({
               
//                  quantity:quantity1,
//                 CustomerCustomerId : CustomerCustomerId1,
//                 ProductProductId:ProductProductId1 });
//                 cartObj
//                 .save({where:{CustomerCustomerId:CustomerCustomerId1}})
//                 .then((ele) => {
//                   var string = "Record inserted successfully";
                      
//                   res.status(201).send(string);
//                 })
//                 .catch((err) => {
//                   console.log("Error is :" + err);
//                   res.status(400).send(err);
//                 });
//               }
//               else{ var quantity2;
//                     var quantity3;
                  
//                    Cart.findOne({attributes:['quantity'],where:{CustomerCustomerId:CustomerCustomerId1,ProductProductId:ProductProductId1},raw:true}).then((data)=>
//                       {  console.log(data);
//                          quantity2=data.quantity;
//                          console.log(typeof quantity1);
//                          console.log(typeof quantity2);
//                           quantity3=quantity1+quantity2;
//                           console.log(quantity3);
//                           Cart.update(
//                      {
//                       quantity:quantity3,
//                     CustomerCustomerId: CustomerCustomerId1,
//                     ProductProductId:ProductProductId1
//                      },
//                   { where: { CustomerCustomerId: CustomerCustomerId1} }
//                 ).then((data) => {
//                     console.log(data);
//                     var string = "Record updated successfully...";
//                     res.status(201).send(string);
//                   })
//                   .catch((err) => {
//                     console.log("There is an error updating table:Reason: " + err);
//                     res.status(400).send(err);
//                   });
              
             


          

//           }).catch((err)=>{
//             console.error("Error is :"+err);
//              });
//             }
//             }).catch((err)=>{
//               console.error("Error is :"+err);
//                });
//               },
            
          
           
//             // var cartObj = Cart.build({
               
//             //     quantity:quantity,
//             //     CustomerCustomerId : CustomerCustomerId,
//             //     ProductProductId:ProductProductId
             
//             // });

            


//           //   cartObj
//           //     .save({where:{CustomerCustomerId:CustomerCustomerId}})
//           //     .then((data) => {
//           //       var string = "Record inserted successfully";
                    
//           //       res.status(201).send(string);
//           //     })
//           //     .catch((err) => {
//           //       console.log("Error is :" + err);
//           //       res.status(400).send(err);
//           //     });
          
//           getAllCart: function (req, res) {
//             var customerId=Number(req.params.customerId);

//             Cart.findAll({
//                 where: {CustomerCustomerId:customerId},
//                 include: [{
//                   model: productModel.product
//                 //   where: [" productModel.product.productId=Cart.ProductProductId"]
//                  }]
//               }).then(data => {
//                   res.status(200).send(data);
//               }).catch(err=>
//                 {
//                     console.log("Error is :" + err);
//                     res.status(400).send(err);
//                 })




//             // cartData.findAll({where:{CustomerId:customerId}},{ raw: true })
//             //   .then((data) => {
//             //     console.log(data);
//             //     res.status(200).send(data);
//             //   })
//             //   .catch((err) => {
//             //     console.error("There is an error getting data from db:" + err);
//             //     res.status(400).send(err);
//             //   });
//           },
//           updateCart: function (req, res) {
//             var cartId = req.body.cartId;
//             var quantity = req.body.quantity;
//             var CustomerCustomerId = req.body.CustomerCustomerId;
//             var  ProductProductId = req.body.ProductProductId;
            
        
//            Cart.update(
//               {
//                 cartId: cartId,
//                 quantity: quantity,
//                 CustomerCustomerId: CustomerCustomerId,
//                 ProductProductId: ProductProductId
             
//               },
//               { where: { cartId: cartId } }
//             )
//               .then((data) => {
//                 console.log(data);
//                 var string = "Record updated successfully...";
//                 res.status(201).send(string);
//               })
//               .catch((err) => {
//                 console.log("There is an error updating table:Reason: " + err);
//                 res.status(400).send(err);
//               });
//           },

//           deleteCart:function(req,res)
//         {
//          console.log("Entering id to delete");
//          var id=req.params.cartId;
//          console.log("Given id is"+id);
//         Cart.destroy({where:{cartId:id}}).then(data=>
//         {
//             console.log(data);
//             var str="Record deleted successfully";
//             res.status(200).send(str);
//         }).catch(err=>{
//             console.error("There is an error while deleting record:"+err);
//             res.status(400).send(err);
//         })
//   },
//     }
//   module.exports={Cart,cartData}