import { Blob } from "buffer";
import { BSONType, Binary } from "mongodb";
import mongoose, { Schema } from "mongoose";

let User=new Schema({
    username:{
        type:String
    },
    password:{
        type:String
    },
    name:{
        type:String
    },
    surname:{
        type:String
    },
    image:{
        type:String
    },
    phone:{
        type:String
    },
    email:{
        type:String
    },
    address:{
        type:String
    },
    licence:{
        type:String
    },
    spec:{
        type:String
    },
    branch:{
        type:String
    },
    type:{
        type:String
    },
    admin:{
        type:Boolean
    },
    types:[
        {
            name:String,
            price:Number,
            duration:Number
        }
    ],
    isValid:{
        type:Number
    }
})

export default mongoose.model('userModel',User,'users')