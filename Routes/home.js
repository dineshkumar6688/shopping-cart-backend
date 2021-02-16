require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
var bcrypt =  require('bcryptjs')
var verifyToken = require('../Middlewares/verifyToken')

require("../Schemas/registerSchema");

const Signup = mongoose.model("register");

app.get('/',verifyToken,(req,res)=>{
    res.send("Home Page!!")
})

module.exports = app; 