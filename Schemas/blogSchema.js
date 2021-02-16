const mongoose = require('mongoose');

mongoose.model("blog",{
    name:{
        type : String,
        required : true,
        unique : true
    },
    images:[{
        type : String,
        required : true 
    }],
    desc:[{
        type : String,
        required : true
    }],
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
    time : { 
        type: Number, 
        default: (new Date()).getTime() 
    }
})