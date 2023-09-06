import express from 'express'
import requestModel from '../models/requests'


export default class requestContorller{

    add=(req:express.Request,res:express.Response)=>{
        let nReq=new requestModel()
        nReq.name=req.body.name
        nReq.duration=req.body.duration
        nReq.price=req.body.price
        nReq.spec=req.body.spec

        nReq.save((err,resp)=>{
            if(err) console.log(err)
            res.json(resp)
        })
    }

    remove=(req:express.Request,res:express.Response)=>{
        requestModel.deleteOne({_id:req.body.id},(err,resp)=>{
            if(err) console.log(err)
            res.json(resp)
        })
    }

    getAll=(req:express.Request,res:express.Response)=>{
        requestModel.find((err,resp)=>{
            if(err) console.log(err)
            res.json(resp)
        })
    }
}