const mongoose = require('mongoose');

mongoose.model("product",{
    type:{
        type : String,
        required : true,
    },
    name:{
        type : String,
        required : true,
        unique : true,
    },
    fromPrice:{
        type : Number,
        required : true, 
    },
    toPrice:{
        type : Number,
        required : true, 
    },
    img:[{
        type:String,
        required:true
    }],
    details: [{ 
        size: String, 
        price: Number,
        color: String
     }],
    desc:{
        type : String,
        required : true
    },
    comments: [{
        email:{
            type : String,
            required : true,
            unique : true,
            match : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        },
        rating:{
            type: Number,
            required : true
        },
        custName:{
            type: String,
            required : true
        },
        comment: {
            type: String,
            required : true
        },
        date:{
            type : Date, 
            default : Date.now 
        },
        time : { 
            type: Number, 
            default: (new Date()).getTime() 
        },
    }],
    date:{
        type : Date, 
        default : Date.now 
    },

})