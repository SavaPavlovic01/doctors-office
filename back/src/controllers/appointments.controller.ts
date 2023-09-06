import appoinmtnetModel from '../models/appointment'
import express from 'express'

export class AppointmentController{
    add=(req:express.Request,res:express.Response)=>{
        let idDoctor=req.body.idDoctor
        let idPatient=req.body.idPatient
        let price=req.body.price
        let duration=req.body.duration
        let type=req.body.type
        let date=req.body.date
        let hours=req.body.hours
        let minutes=req.body.minutes

        let nApp=new appoinmtnetModel()
        nApp.idDoctor=idDoctor
        nApp.idPatient=idPatient
        nApp.hours=hours
        nApp.minutes=minutes
        nApp.duration=duration
        nApp.price=price
        nApp.date=date
        nApp.type=type
        nApp.dijagnoza=''
        nApp.therapy=''
        nApp.nextAppDate=''
        nApp.reason=''

        nApp.save((err,resp)=>{
            if(err) console.log(err)
            else res.json({status:'ok'})
        })
    }

    getAll=(req:express.Request,res:express.Response)=>{
        let id=req.body.id

        appoinmtnetModel.find({$or:[{idDoctor:id},{idPatient:id}]},(err,resp)=>{
            if(err) console.log(err)
            res.json(resp)
        })
    }

    addReport=(req:express.Request,res:express.Response)=>{
        let id=req.body.id

        let reason=req.body.reason
        let nextAppDate=req.body.nextAppDate
        let therapy=req.body.therapy
        let dijagnoza=req.body.dijagnoza

        appoinmtnetModel.updateOne({_id:id},{$set:{reason:reason,nextAppDate:nextAppDate,therapy:therapy,dijagnoza:dijagnoza}},(err,resp)=>{
            if(err) console.log(err)
            res.json(resp)
        })
    }

    cancel=(req:express.Request,res:express.Response)=>{
        let id=req.body.id
        appoinmtnetModel.deleteOne({_id:req.body.id},(err,resp)=>{
            if(err) console.log(err)
            res.json(resp)
        })
    }
}