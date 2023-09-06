import mongoose, { Schema } from "mongoose";

let Requests=new Schema({
    name:{
        type:String
    },
    duration:{
        type:Number
    },
    price:{
        type:Number
    },
    spec:{
        type:String
    }
})

export default mongoose.model('requestModel',Requests,'requests')