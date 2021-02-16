require('dotenv').config();
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
require("../Schemas/registerSchema");

const Signup = mongoose.model("register");


module.exports = (req,res,next) => {

    if (!req.headers.authorization) {
        return res.status(401).send({ error: 'TokenMissing' });
      }
      var token = req.headers.authorization.split(' ')[1];

      try{
        var decode = jwt.verify(token, process.env.JWT_KEY);
        Signup.findOne({mailid:decode.mailid,tokens: token})
        .then((response)=>{
          if(response == null){
            return res.status(400).send("Token does not exist!");
          }
          else{
            Signup.findOne({mailid:decode.mailid})
            .then((result)=>{
              if(result != null){
                next();
              }
              else
              {
                return res.status(404).send("User does not exists!");
              }
            })
            .catch(()=>{
              return res.status(404).send("User does not exists!");
            });
          }
        })
        }
        catch(e){
          return res.status(404).send("Not a valid token!");
        }
       
};
