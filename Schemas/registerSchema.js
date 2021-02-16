const mongoose = require('mongoose');

mongoose.model("register",{

    name:{
        type : String,
        required : true
    },
    mailid:{
        type : String,
        required : true,
        unique : true,
        match : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    phoneno:{
        type : Number,
    },
    password:{
        type : String,
    },
    tokens:[{
        type :String
    }],
    login:false,
    liked:[],
    cart:[{
        quantity : Number,
        data : []
    }],
    liked:[{
        quantity : Number,
        data : []
    }],

})