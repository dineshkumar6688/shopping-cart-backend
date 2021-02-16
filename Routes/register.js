const express = require('express');
const app = express();
const mongoose = require('mongoose');
var bcrypt =  require('bcryptjs')

require("../Schemas/registerSchema");

const Signup = mongoose.model("register");

app.post("/",(req,res)=>{
    try{
        Signup.find({mailid : req.body.mailid})
        .exec()
        .then(user=>{
            if(user.length>=1)
            {
                return res.status(409).json({
                    message : "Mail exists"
                });
            }else{
                bcrypt.hash(req.body.password,10,(err,hash)=>{
                    if(err)
                    {
                        return res.status(500).json({
                            error : err
                        });
                    }
                    else{
                        var newUser = {
                            name : req.body.name,
                            mailid : req.body.mailid,
                            phoneno : req.body.phoneno,
                            password : hash
                        }
                    
                        var user = new Signup(newUser);

                        user.save()
                            .then(()=>{
                                return res.status(200).json({
                                    message : "New User has been created Successfully!!"
                                });
                            })
                            .catch((err)=>{
                                if(err){
                                    throw err;
                                }
                            })
                        }
                        
                    })
                }
                    
            })
        
        }
        catch(err){
            throw err;
        }
        
    })

    app.get('/users',(req,res)=>{
        try{
            if(req.query.limit != undefined && req.query.limit != null && req.query.limit != ""){
                Signup.aggregate()
                    .limit(parseInt(req.query.limit))
                    .then((book)=>{res.json(book)});   
            }
            else if(req.query.id != undefined && req.query.id != null && req.query.id != ""){
                Signup.findById(req.query.id).then((book)=>{
                    if(book){
                        res.json(book);
                    }
                    else{
                        res.sendStatus(404);
                    } 
                });
            }
            else if(req.query.mailid != undefined && req.query.mailid != null && req.query.mailid != ""){
                Signup.findOne({mailid:req.query.mailid}).then((book)=>{
                    if(book){
                        res.json(book);
                    }
                    else{
                        res.sendStatus(404);
                    } 
                });
            }
            else{
                Signup.find().then((users)=>{
                    res.json(users);
                }).catch(err => {
                    if(err){
                        throw err;
                    }
                })
            }
        }catch(e){
            res.status(500).send("Internal Server Error");
        }
        
    })


module.exports = app; 