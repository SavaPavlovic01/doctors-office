import mongoose, { Schema } from "mongoose";

let appType=new Schema({
    name:{
        type:String
    },
    spec:{
        type:String
    },
    price:{
        type:Number
    },
    duration:{
        type:Number
    }
})

export default mongoose.model('appTypeModel',appType,'appointmentTypes')