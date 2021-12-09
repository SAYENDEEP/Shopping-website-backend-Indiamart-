const Sequelize=require("sequelize");
const db2= require("../db.config");
const sequelize= new Sequelize(db2.DB,db2.USER,db2.PASSWORD,{
    host:db2.HOST,
    dialect:db2.dialect,
    pool:{
        max:db2.pool.max,
        min:db2.pool.min,
        acquire:db2.pool.acquire,
        idle:db2.pool.idle
    }
 });
 let UserDetailsTable= sequelize.define('UserDetailsTable',{
    id:{
        primaryKey:true,
        type:Sequelize.INTEGER
    },
    firstname:Sequelize.STRING,
    lastname:Sequelize.STRING,
    email:Sequelize.STRING,
    phoneno: Sequelize.STRING,
    location:Sequelize.STRING
},{
    timestamps:false,
    freezeTableName:true
});


const UserDisplayData=
{
    getAllUser: function(req,res)
    {
        UserDetailsTable.findAll({raw:true}).then((data)=>{
            console.log("All Record in database");
            console.log(data);
            res.send(data);
        }).catch(err=>{
            console.log("Error in Creation");
            res.status(400),send(err);
        })
    },
    newRecord: function(req,res){
         console.log(req.body);
    var id =  req.body.id;
    var firstname =  req.body.firstname;
    var lastname =  req.body.lastname;
    var email =  req.body.email;
    var phoneno =  req.body.phoneno;
    var location=req.body.location;
    var UserObj=UserDetailsTable.build({id:id,firstname:firstname,
        lastname:lastname,email:email,phoneno:phoneno,location:location});
    UserObj.save().then(()=>{
        console.log("Successfully inserted");
        res.send("Inserted Successfully");
    }).catch((err)=>{
        console.log("Error Encountered"+err);
        res.send("Error Encountered");
      })  
    },
    updateRecord:function(req,res){
        var id =req.body.id;
        var firstname =req.body.firstname;
        var lastname =  req.body.lastname;
        var email =  req.body.email;
        var phoneno =  req.body.phoneno;
        var location=req.body.location;
        
            UserDetailsTable.update(
               {firstname:firstname,lastname:lastname,email:email,phoneno:phoneno,location:location},
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
    deleteUser:function(req,res){
        var Id1 =req.params.Id;
        var Id=parseInt(Id1);
      console.log(Id);
      UserDetailsTable.destroy({where:{id:Id}}).then(()=>{
          console.log("Deleted Successfully");
          res.send("Deleted Successfully");
      }).catch((err)=>{
          console.log("Error Encountered");
          res.send(err);
      })
    }

}
module.exports=UserDisplayData;



