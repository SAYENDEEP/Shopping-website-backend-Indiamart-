const Sequelize=require("sequelize");
const db2= require("../db.config");
var nodemailer=require("nodemailer");
var sequelize= new Sequelize(db2.DB,db2.USER,db2.PASSWORD,{
    host:db2.HOST,
    dialect:db2.dialect,
    pool:{
        max:db2.pool.max,
        min:db2.pool.min,
        acquire:db2.pool.acquire,
        idle:db2.pool.idle
    }
 });
 let LoginRegisterTable= sequelize.define('LoginRegisterTable',{
         Firstname :{
             primaryKey:true,
             type:Sequelize.STRING
         },
         Lastname:Sequelize.STRING,
         Phoneno:Sequelize.STRING,
         Emailno:Sequelize.STRING,
         Password:Sequelize.STRING,
         Location:Sequelize.STRING
        
     },{
         timestamps:false,
         freezeTableName:true
 });
 
 const LoginRegisterData=
 {
 
    login:function(req,res){
        var Emailno=req.body.Emailno;
        var Password=req.body.Password;
        console.log(Emailno,Password);
        const Op=Sequelize.Op;
        LoginRegisterTable.findAll({raw:true}).then((data)=>{
           var flag=0;
           var firstname="";
        //    console.log(data.length);
            for(var i=0;i<data.length;i++){
                // console.log(data[i]);
                if(data[i].Emailno==Emailno || data[i].Password==Password )
                  {
                      if(data[i].Emailno==Emailno && data[i].Password==Password){
                        flag=1;
                        // console.log("First Name"+data[i].Firstname+JSON.stringify(data));
                        firstname=data[i].Firstname;
                        break;
                      }
                      else if(data[i].Emailno==Emailno && data[i].Password!=Password){
                          flag=2;
                      }
                  }
            }
            if(flag==1){
                console.log(firstname);
                res.status(201).send(firstname);
            }
            else if(flag==2){
                console.log("User Password is Incorrect");
                res.status(201).send("User Name Correct .Please check your Password");
            }
            else{
               console.log("User Login UnSuccessful");
               res.status(201).send("User Login UnSuccessful");  
            }
           }).catch((err)=>{
               console.log("Error Encountered");
               res.status(400).send("Error Occured");
           })
    },
    register:function(req,res){
        console.log(req.body.Location);
        var Firstname=req.body.Firstname;
        var  Lastname=req.body.Lastname;
        var Phoneno =req.body.Phoneno;
        var Emailno=req.body.Emailno;
        var Password=req.body.Password;
        var Location=req.body.Location;
        // console.log(Firstname,Lastname,Phoneno);
       
         var UserObj=LoginRegisterTable.build({Firstname:Firstname,Lastname:Lastname,Phoneno:Phoneno,Emailno:Emailno,Password:Password,Location:Location})
         UserObj.save().then(()=>{
             console.log("User Register Successfully");
            //  sendMail:function(req,res)
            //  {
              let user=req.body;
              sendMail1(user,info=>
              {
                console.log("mail send successfully");
                res.status(201).send(info);
              })
            //  }
             res.status(201).send("User Registered Successfully");
         }).catch((err)=>{
             console.log(err);
             res.status(400).send("User Not Registered Successfully");
         })
    },
    forget:function(req,res){
        console.log(req.body.Emailno);
        LoginRegisterTable.findOne({
            where: {
                Emailno: req.body.Emailno
            }
        }).then(user => {
            console.log("hello");
            if (!user) {
              console.log("user not found");
                return res.status(201).send({
                message: "User Not Found",
              });
            }
          
            else{
                 var otp = Math.floor(100000 + Math.random() * 900000);
                sendMail(user,otp,info=>
                    {
           
                    if(!user){
                             
                              return res.status(201).send({
                                message: "try later, unable to send mail."
                                });
                            } 
                         
                     else{
                     console.log("email sent with otp : "+otp+"\ninfo : "+info.response);
                     return res.status(201).send({
                         message: "OTP sent on this mail id.",
                          flag : true,
                         Emailno : user.Emailno,
                        otp : otp
                       });
                     }
                 })
                 }
          })
          .catch(err => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                message: "Server error"
                });
              }
           
          });
    },

   updatePassword:function(req,res){
      
    LoginRegisterTable.update({Password : req.body.Password},
        {where : { Emailno: req.body.Emailno}}).then(user => {
        sendMail2(req.body.Emailno,info=>{
            res.status(201).send({
                message: "Password updated successfully."
            });
         })
      }).catch(err => {
        res.status(201).send({
          message: "Error updating Password with email=" + email
        });
    });
   }
       
}
 async function sendMail(user,otp,callback)
 {     
     console.log(user);
    //  console.log(typeof user) 
      
    console.log(user.Emailno);
   
  var transporter=nodemailer.createTransport({
    
      service:'gmail',
     
      auth:{
          user:'sayendeeep1999@gmail.com',
          pass:'Sayen@1999'
      }
  });
  var mailOptions={
      from:"sayendeep1999@gmail.com",
      to:user.Emailno,
      subject:'Password Reset',
      html:`<h1 style="color:coral;">Hello ${user.Firstname} ${user.Lastname},</h1><br>
             <h4 style="color:aqua;">You are receiving this email beacuse we recieved
              a password reset request to your account <br> Your One time Password is :-<h4>`+otp+
        `<h4 style="color:red;">Best wishes,</h4>
               <b style="color:red;">Team Indiamart</b>`

  };
  let info= await transporter.sendMail(mailOptions);
  callback(info);
}
async function sendMail1(user,callback)
 {     console.log(user);
     console.log(typeof user) 
      
    console.log(user.email);
   
  var transporter=nodemailer.createTransport({
    
      service:'gmail',
     
      auth:{
          user:'sayendeeep1999@gmail.com',
          pass:'Sayen@1999'
      }
  });
  var mailOptions={
      from:"sayendeep1999@gmail.com",
      to:user.Emailno,
      subject:'Welcome to Indiamart!! India  New Electronic Digital Market',
      html:`<h1 style="color:coral;">Hi ${user.Firstname} ${user.Lastname},</h1><br>
             <h4 style="color:aqua;">Thank you for joining Indiamart India growing
              digital Electronics Market. <br> We will keep you posted with new offer and deal.<h4>
              <h4 style="color:red;">Best wishes,</h4>
               <b style="color:red;">Team Indiamart</b>`

  };
  let info= await transporter.sendMail(mailOptions);
  callback(info);
}

async function sendMail2(user,callback)
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
      to:user,
      subject:'Password Successfully updated',
      html:`<h1 style="color:coral;">Hi ${user.Firstname} ${user.Lastname},</h1><br>
             <h4 style="color:aqua;">Your Password is Successfully Changed 
             You can  login using the new password
              <h4 style="color:red;">Best wishes,</h4>
               <b style="color:red;">Team Indiamart</b>`

  };
  let info= await transporter.sendMail(mailOptions);
  callback(info);
}

 module.exports=LoginRegisterData;
 


