require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
var register = require('./Routes/register')
var login = require('./Routes/login');
var product = require('./Routes/product');
var pages = require('./Routes/home');
var blog = require('./Routes/blog');
var cors = require('cors');

//body parser
app.use(bodyParser.json());
app.use(helmet());
app.use(loggingMiddleware);
app.use(cors());

app.use('/signup', register);
app.use('/login', login);
app.use('/product',product);
app.use('/blog', blog)
app.use('/home', pages);

var url = process.env.URL;
var port = process.env.PORT || 5000;

function loggingMiddleware(req, res, next) {
    console.log(`${new Date().toString()}:${req.url}`)
    next()
  }


  mongoose.connect(url,{useNewUrlParser: true,useUnifiedTopology: true},(err)=>{
    if(err){
        console.error(err);
    }else{
    console.log("Database has been successfully connected");}
}); 

app.listen(port,(req,res)=>{
console.log(`Listening on port : ${port}`)
})