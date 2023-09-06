import notificationModel from '../models/notification'
import express from 'express'
export default class notificationController{
    addNew=(req:express.Request,res:express.Response)=>{
        let idUser=req.body.idUser
        let dateShown=req.body.date
        let text=req.body.text

        let nNoti=new notificationModel()
        nNoti.read=false
        nNoti.idUser=idUser
        nNoti.timeShown=dateShown
        nNoti.text=text
        
        nNoti.save((err,resp)=>{
            if(err) console.log(err)
            res.json(resp)
        })
    }

    updateStatus=(req:express.Request,res:express.Response)=>{
        let id=req.body.id

        notificationModel.updateOne({_id:id},{$set:{read:true}},(err,resp)=>{
            if(err) console.log(err)
            res.json(resp)
        })
    }

    getAll=(req:express.Request,res:express.Response)=>{
        let id=req.body.id
        notificationModel.find({idUser:id},(err,resp)=>{
            if(err) console.log(err)
            res.json(resp)
        })
    }
}