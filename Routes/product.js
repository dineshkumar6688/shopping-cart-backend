const express = require('express');
const app = express();
const mongoose = require('mongoose');

require("../Schemas/productSchema");


const Product = mongoose.model("product");

app.post("/",(req,res)=>{
    try{
        Product.find({name : req.body.name})
        .exec()
        .then(prod=>{
            if(prod.length>=1)
            {
                return res.status(409).json({
                    message : "Product exists"
                });
            }else{
                var newProd = {
                    type : req.body.type,
                    name : req.body.name,
                    fromPrice : req.body.fromPrice,
                    toPrice : req.body.toPrice,
                    img : req.body.img, 
                    desc : req.body.desc,
                }
                var product = new Product(newProd);
                        product.save()
                        .then(()=>{
                            return res.status(200).json({
                                message : "New Product has been created Successfully!!"
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
        catch(err){
            throw err;
        }
        
    })

    app.post('/details',(req,res)=>{
        try{
            if(req.query.name != undefined && req.query.name != null && req.query.name != ""){
                Product.updateOne({name:req.query.name},{$push: {details: {size: req.body.size,price :req.body.price,color :req.body.color}}})
                .then(()=>{
                    return res.status(200).json({
                        message : "Product has been updated Successfully!!"
                    });
                })
            }
        }catch(err){
            res.status(500).send("Internal Server Error");
        }
    })
    app.post('/images',(req,res)=>{
        try{
            if(req.query.name != undefined && req.query.name != null && req.query.name != ""){
                Product.updateOne({name:req.query.name},{$push: {img: req.body.img}})
                .then(()=>{
                    return res.status(200).json({
                        message : "Image has been added Successfully!!"
                    });
                })
            }
        }catch(err){
            res.status(500).send("Internal Server Error");
        }
    })

    app.post('/comments',(req,res)=>{
        try{
            if(req.query.name != undefined && req.query.name != null && req.query.name != ""){
                Product.updateOne({name:req.query.name},{$push: {comments: {email: req.body.email, rating:req.body.rating, custName :req.body.custName,comment: req.body.comment}}})
                .then(()=>{
                    return res.status(200).json({
                        message : "Comment has been added Successfully!!"
                    });
                })
            }
        }catch(err){
            res.status(500).send("Internal Server Error");
        }
    })

    

    app.get('/',(req,res)=>{
        try{
            if(req.query.limit != undefined && req.query.limit != null && req.query.limit != ""){
                Product.aggregate()
                    .limit(parseInt(req.query.limit))
                    .then((prod)=>{res.json(prod)});   
            }
            else if(req.query.id != undefined && req.query.id != null && req.query.id != ""){
                Product.findById(req.query.id).then((prod)=>{
                    if(prod){
                        res.json(prod);
                    }
                    else{
                        res.sendStatus(404);
                    } 
                });
            }
            else if(req.query.name != undefined && req.query.name != null && req.query.name != ""){
                Product.find({name:req.query.name}).then((prod)=>{
                    if(prod){
                        res.json(prod);
                    }
                    else{
                        res.sendStatus(404);
                    } 
                });
            }
            else if(req.query.type != undefined && req.query.type != null && req.query.type != ""){
                Product.find({type:req.query.type}).then((prod)=>{
                    if(prod){
                        res.json(prod);
                    }
                    else{
                        res.sendStatus(404);
                    } 
                });
            }
            else if(req.query.type != undefined && req.query.type != null && req.query.type != "" && req.query.name != undefined && req.query.name != null && req.query.name != ""){
                Product.find({name:req.query.name,type:req.query.type}).then((prod)=>{
                    if(prod){
                        res.json(prod);
                    }
                    else{
                        res.sendStatus(404);
                    } 
                });
            }
            else{
                Product.find().then((prod)=>{
                    res.json(prod);
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