import express, { Response } from 'express'
import appTypeModel from '../models/appType'

export default class appTypeController{
    add=(req:express.Request,res:express.Response)=>{
        let price=req.body.price
        let duration=req.body.duration
        let spec=req.body.spec
        let name=req.body.name

        let nType=new appTypeModel()

        nType.price=price
        nType.duration=duration
        nType.spec=spec
        nType.name=name
        nType.save((err,resp)=>{
            if(err) console.log(err)
            res.json(resp)
        })
    }

    getAll=(req:express.Request,res:express.Response)=>{
        let name=req.body.name

        appTypeModel.find({spec:name},(err,resp)=>{
            if(err) console.log(err)
            res.json(resp)
        })
    }

    get=(req:express.Request,res:express.Response)=>{
        appTypeModel.find((err,resp)=>{
            if(err) console.log(err)
            res.json(resp)
        })
    }

    delete=(req:express.Request,res:express.Response)=>{
        appTypeModel.deleteOne({_id:req.body.id},(err,resp)=>{
            if(err) console.log(err)
            res.json(resp)
        })
    }
    
    update=(req:express.Request,res:express.Response)=>{
        let price=req.body.price
        let duration=req.body.duration
        let id=req.body.id

        appTypeModel.updateOne({_id:id},{$set:{price:price,duration:duration}},(err,resp)=>{
            if(err) console.log(err)
            res.json(resp)
        })
    }
}