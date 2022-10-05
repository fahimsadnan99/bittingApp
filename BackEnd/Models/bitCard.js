const mongoose = require('mongoose');

const BitCard = mongoose.Schema({
    // photo :{
    //     type : String,
    //     required : true
    // },
   
    bitList : [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref : "User" 
            },
            biddingPrice : {
                type : Number,
                required : true
            },
            dAddress :{ 
                type : String,
                required : true
            },
            msg : {
                type : String,
                required : true
            }
        }
    ],

    title : {
        type : String,
        required : true
    },
    details : {
        type : String,
        required : true
    },
    maxPrice : {
        type : Number,
        required : true
    },
    minPrice : {
        type : Number,
        required : true
    },
    weight : {
        type : Number,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    time : {
      type : Number,
      default : new Date()
    }
}, { timestamps: true })


module.exports = mongoose.model("BitCard", BitCard);