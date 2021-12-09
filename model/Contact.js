const Sequelize=require("sequelize");
const db1= require("../db.config");
var nodemailer=require("nodemailer");
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

let ContactTable=sequelize.define('ContactTable',{
    Firstname:{
       primaryKey:true,
       type:Sequelize.STRING
     },
   email:Sequelize.STRING,
   Message:Sequelize.STRING
},{
   timestamps:false,
   freezeTableName:true
});
const ContactData=
{
    contact: function(req,res){
        console.log(req.body);
   var Firstname =  req.body.Firstname;
   var email =  req.body.email;
    var Message =  req.body.Message;
   var UserObj=ContactTable.build({Firstname:Firstname,
       email:email,Message:Message});
   UserObj.save().then(()=>{
       console.log("Query Successfully Send");
       let user=req.body;
       sendMail(user,info=>
       {
         console.log("mail send successfully");
         res.status(201).send(info);
       })
       res.send("Query Successfully Send");
   }).catch((err)=>{
       console.log("Error Encountered"+err);
       res.send("Error Encountered");
     })  
   }

}
async function sendMail(user,callback)
 {     
   
  var transporter=nodemailer.createTransport({
    
      service:'gmail',
     
      auth:{
          user:'sayendeeep1999@gmail.com',
          pass:'Sayen@1999'
      }
  });
  var mailOptions={
      from:"sayendeep1999@gmail.com",
      to:user.email,
      subject:'Your query is send successfully.We will shortly get in touch with you',
      html:`<h1 style="color:coral;">
             Hi ${user.Firstname},</h1><br>
             <h4 style="color:aqua;">Thank you we have send your query to the required team
                  Our one of the excecutive will get back to you sortly <br>
              <h4 style="color:red;">Best wishes,</h4>
               <b style="color:red;">Team Indiamart</b>`

  };
  let info= await transporter.sendMail(mailOptions);
  callback(info);
}

module.exports=ContactData;