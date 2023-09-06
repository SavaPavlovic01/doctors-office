import mongoose, { Schema } from "mongoose";

let Notification=new Schema({
    idUser:{
        type:String
    },
    read:{
        type:Boolean
    },
    timeShown:{
        type:Number
    },
    text:{
        type:String
    }
})

export default mongoose.model('notificationModel',Notification,'notifications')