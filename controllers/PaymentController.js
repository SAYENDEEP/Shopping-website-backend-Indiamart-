// var connection = require('../Modal/connection');
// var stripe = require('stripe')('var connection = require('../Modal/connection');
var stripe = require('stripe')('sk_test_51K4WvDSD54SloB46dNzyJDKDspu4zs2nBL3zBMoq5ZnHGQPrIf7rRizcxXJVgRbL4LHTYGWHi8DwcCirSOlpDrHZ00p47zGYqu');

exports.PaymentConfirm = (req,res) =>{
    console.log(req.body);
   
    stripe.charges.create({
        amount:req.body.price*100,
        currency:'INR',
        description:"One Time Payment",
        source : req.body.result.token.id,
    },
    (err)=>{
        if(err){
            console.log(err);
        }
        res.status(200).send("Payment Sucessfull")
    })
}


