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

let ProductTable=sequelize.define('ProductTable',{
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
     rating:Sequelize.STRING
},{
   timestamps:false,
   freezeTableName:true
});
const ProductData=
{
    getAllProduct: function(req,res)
    {
        ProductTable.findAll({raw:true}).then((data)=>{
            console.log("All Record in database");
            console.log(data);
            res.send(data);
        }).catch(err=>{
            console.log("Error in Creation");
            res.status(400),send(err);
        })
    }
}
module.exports=ProductData;