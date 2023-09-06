import mongoose, { Schema } from "mongoose";

let Appointment=new Schema({
    idDoctor:{
        type:String
    },
    idPatient:{
        type:String
    },
    date:{
        type:String
    },
    hours:{
        type:Number
    },
    minutes:{
        type:Number
    },
    type:{
        type:String
    },
    price:{
        type:Number
    },
    duration:{
        type:Number
    },
    reason:{
        type:String
    },
    dijagnoza:{
        type:String
    },
    therapy:{
        type:String
    },
    nextAppDate:{
        type:String
    }
})

export default mongoose.model('appointmentModel',Appointment,'appointments')