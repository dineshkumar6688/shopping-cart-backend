require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
var bcrypt =  require('bcryptjs')
var jwt = require('jsonwebtoken');

var verifyToken = require('../Middlewares/verifyToken')


require("../Schemas/registerSchema");

const Signup = mongoose.model("register");

app.post('/',(req,res,next)=>{
    Signup.find({mailid : req.body.mailid})
    .exec()
    .then(user=>{
        if(user.length<1)
        {
            return res.status(401).json({
                message : "User does not exist!"
            });
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(err)
            {
                return res.status(401).json({
                    message : "Password doesn't match"
                });
            }
            if(result)
            {
                const token = jwt.sign({
                    mailid : user[0].mailid
                },
                process.env.JWT_KEY,
                {
                    expiresIn : "1hr"
                }
                );
                Signup.updateOne({"mailid" : req.body.mailid},{$push : {tokens : token}})
                .then(()=>{
                    Signup.updateOne({"mailid" : req.body.mailid},{login:true})
                    .then(()=>{
                        return res.status(200).json({
                            message : "Successfully logged in!!",
                            tokens : [token]
                        });
                    })
                })  
            }
            else
            {
                res.status(401).json({
                    message : "Password doesn't match"
                });
            }
          
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
});

app.post('/logout',verifyToken,(req,res)=>{
    try{
        var token = req.headers.authorization.split(' ')[1];
        var decode = jwt.verify(token, process.env.JWT_KEY);
        if(decode.mailid != undefined && decode.mailid != null && decode.mailid != ""){
            Signup.updateOne({mailid:decode.mailid},{$pull:{tokens: token}})
            .then(()=>{
                Signup.updateOne({mailid:decode.mailid},{login:false})
                .then(()=>{
                    return res.status(200).json({
                        message : "Successfully logged out!!"
                    });
                })
            })
            
        }
    }catch(err){
        res.status(500).send("Internal Server Error");
    }
})

app.get('/userDetails',verifyToken,(req,res)=>{
    try{
        var token = req.headers.authorization.split(' ')[1];
        var decode = jwt.verify(token, process.env.JWT_KEY);
        if(decode.mailid != undefined && decode.mailid != null && decode.mailid != ""){
            Signup.findOne({mailid:decode.mailid})
            .then((result)=>{
                res.json(result)
            })
            
        }
    }catch(err){
        res.status(500).send("Internal Server Error");
    }
})


app.post('/addToCart',verifyToken,(req,res)=>{
    try{
        var token = req.headers.authorization.split(' ')[1];
        var decode = jwt.verify(token, process.env.JWT_KEY);
        if(decode.mailid != undefined && decode.mailid != null && decode.mailid != ""){
            Signup.updateOne({mailid:decode.mailid},{$push: {cart: {quantity:req.body.quantity,data:req.body.data}}})
            .then(()=>{
                return res.status(200).json({
                    message : "Product has been added to cart Successfully!!"
                });
            })
            
        }
    }catch(err){
        res.status(500).send("Internal Server Error");
    }
})

app.post('/addToLiked',verifyToken,(req,res)=>{
    try{
        var token = req.headers.authorization.split(' ')[1];
        var decode = jwt.verify(token, process.env.JWT_KEY);
        if(decode.mailid != undefined && decode.mailid != null && decode.mailid != ""){
            Signup.updateOne({mailid:decode.mailid},{$push: {liked: {quantity:req.body.quantity,data:req.body.data}}})
            .then(()=>{
                return res.status(200).json({
                    message : "Product has been added to liked Successfully!!"
                });
            })
        }
    }catch(err){
        res.status(500).send("Internal Server Error");
    }
})

module.exports = app; 