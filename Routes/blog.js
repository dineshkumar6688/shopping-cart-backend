const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('../Schemas/blogSchema');

const Blog = mongoose.model("blog");

app.post("/",(req,res)=>{
    try{
        Blog.find({name : req.body.name})
        .exec()
        .then(blog=>{
            if(blog.length>=1)
            {
                return res.status(409).json({
                    message : "Blog with this name exists"
                });
            }else{
                var newBlog = {
                    name : req.body.name,
                    images : req.body.images,
                    desc : req.body.desc
                }
                var blog = new Blog(newBlog);
                        blog.save()
                        .then(()=>{
                            return res.status(200).json({
                                message : "New Blog has been created Successfully!!"
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

    app.post('/image',(req,res)=>{
        try{
            if(req.query.name != undefined && req.query.name != null && req.query.name != ""){
                Blog.updateOne({name:req.query.name},{$push: {images: req.body.images}})
                .then(()=>{
                    return res.status(200).json({
                        message : "Blog images has been added Successfully!!"
                    });
                })
            }
        }catch(err){
            res.status(500).send("Internal Server Error");
        }
    })

    app.post('/desc',(req,res)=>{
        try{
            if(req.query.name != undefined && req.query.name != null && req.query.name != ""){
                Blog.updateOne({name:req.query.name},{$push: {desc: req.body.desc}})
                .then(()=>{
                    return res.status(200).json({
                        message : "Blog description has been added Successfully!!"
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
                Blog.aggregate()
                    .limit(parseInt(req.query.limit))
                    .then((blogs)=>{res.json(blogs)});   
            }
            else if(req.query.id != undefined && req.query.id != null && req.query.id != ""){
                Blog.findById(req.query.id).then((blogs)=>{
                    if(blogs){
                        res.json(blogs);
                    }
                    else{
                        res.sendStatus(404);
                    } 
                });
            }
            else if(req.query.name != undefined && req.query.name != null && req.query.name != ""){
                Blog.find({name:req.query.name}).then((blogs)=>{
                    if(blogs){
                        res.json(blogs);
                    }
                    else{
                        res.sendStatus(404);
                    } 
                });
            }
            // else if(req.query.type != undefined && req.query.type != null && req.query.type != ""){
            //     Product.find({type:req.query.type}).then((prod)=>{
            //         if(prod){
            //             res.json(prod);
            //         }
            //         else{
            //             res.sendStatus(404);
            //         } 
            //     });
            // }
            // else if(req.query.type != undefined && req.query.type != null && req.query.type != "" && req.query.name != undefined && req.query.name != null && req.query.name != ""){
            //     Product.find({name:req.query.name,type:req.query.type}).then((prod)=>{
            //         if(prod){
            //             res.json(prod);
            //         }
            //         else{
            //             res.sendStatus(404);
            //         } 
            //     });
            // }
            else{
                Blog.find().then((blogs)=>{
                    res.json(blogs);
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