import express from 'express'
//import companyModel from '../models/company'
import userModel from '../models/user'

export class doctorController{
    defImage='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQACWAJYAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wgALCADIAMgBAREA/8QAHAABAAIDAQEBAAAAAAAAAAAAAAYIAwUHAgEE/9oACAEBAAAAAO/gAAAAAAAAAAAAAAAAAAAAAAAAAD8PDIfMO5/uAAA81AgJPrf+gAAQumgXLmgAAIJTsLiTsAAGGmEVJVc/MAABoq8Q+YWH3oAAB8wZ/oAACH8I53rtj0Tu8wAADjdasIZrK9kAAOfVE8Ae7d9BAAU4g4BOLjgAaWjnkA+3k3QAIvXIALGygAAAAAAAAAAAAAAAAAAAAAAAAAH/xAA5EAABAgQCBgYIBgMAAAAAAAABAgMEBQYRAAcSFyExUWETQFSBlKEUFSAwQVJxsQgWImJwwXOR0f/aAAgBAQABPwD+IJvOICRS52YTKKbhoVoXU4s27hxPLFTfiLWHls03LEFsGwiYu91cwgbu84191z0un6VB6PyejJt/3FM/iLWXkM1JLEBsmxiYS908yg7+44lE4gJ7LmphLYpuJhXRdLiDfuPA8uqOOJabU4tQShIKlKO4AYzSzAia0qJ1DTqhKYVZRDNA7FW2aZ5n7exlbmBE0XUTSHXVGUxSwiJaJ2Jvs0xzH2w24h1tLiFBSFAKSobiD1PNmaOSjLOcxDSilxbQZSR8NMhP2J9rKaaOTfLOTRDqipxDRZUT8dAlI8gOp5xQC5hldOENglTSEvWHBKgT5X9rJ2AXL8rpOhwFKnUKeseClEjyt1OKhmoyFdhn0BbLqChaT8UkWIxmBRsXRVTPwDyFGFUSuFetscbO7vG4+xl/RsXWtTMQDKFCFSQuKetsbbG/vO4YhYZqDhWoZhIQ00gIQkbgkCwHVKqpKUVhKVS+bQ4Wje24nYtpXFJ+GKmyBqWWPLckym5pC70gKCHQOaTsPccas616Xo/y1MNL/Fs/3uxTOQNSzN5Dk5U3K4XeoFQW6RySNg7zilaSlFHylMvlMOEI3uOK2rdVxUfj1ZSkoF1EAcSbY9OhL29KYvw6QYSpKxdJBHEG/VayzJp+imimPieljSLohGLKcP1+UfXFSZ+VRNVrblQalUMdg6Mabluaj/QxH1HOpo4Vx02jYhR39I+o+V8dM5e/SLvx0jiAqOdytwOQM2jYdQ3dG+oeV8U3n5VEqWhuahqaww2HpBoOW5KH9jFG5k0/WrQTARPRRoF1wj9kuD6fMPp1LNnN8U6XJHIHErmhFnnxtEPyHFX2xFRT8bEuRMS8t59xWktxxV1KPEn2oWKfgoluJhnlsvtq0kONqspJ4g4ymzfFRFuRz9xKJoBZl87BEcjwV9+oZs14KLpgiFWPWkZduGHycV933w885EPLeeWpbi1FSlKNyoneT7hl5yHeQ8ytSHEKCkqSbFJG4jGU1eCtaYAilj1pB2biR8/Bff8Af327GbFUKqivY55KyqEhVGGhxfZopNie83Pusp6oVS9ewLy3CmEilCGiBfZoqNge42ON/vavmfqaj5vMQbKh4RxaT+7R2edsKUVqKlG5JuT7pKihQUk2INweBxSEz9c0fKJiTdT8I2tR/do7fO/vcxJRHz+hJpKpYhK4uJbCEJUoJB/UCdp5Y1EV52CG8UjGoivOwQ3ikY1EV52CG8UjGoivOwQ3ikY1EV52CG8UjGoivOwQ3ikY1EV52CG8UjGoivOwQ3ikY1EV52CG8UjGoivOwQ3ikY1EV52CG8UjGXcoj5BQkrlUzQlEXDNlC0pUFAfqJG0crfw7/9k='


    register=(req:express.Request,res:express.Response)=>{
        let mail=req.body.mail;
        let username=req.body.username
        let password=req.body.password
        let name=req.body.name;
        let address=req.body.address
        let spec=req.body.spec
        let licence=req.body.licence
        let image=req.body.image;
        let phone=req.body.phone;
        let admin=req.body.admin
        let branch=req.body.branch
        let surname=req.body.surname
        if(image=='') image=this.defImage        

        userModel.findOne({$or:[{email:mail},{username:username}]},(err,resp)=>{
            if(err) console.log(err)
            else {
                if(resp){
                    if(mail==resp.email) res.json({status:'mail taken'})
                    else res.json({status:'username taken'})
                }
                else {
                   let nUser=new userModel()
                   nUser.username=username
                   nUser.password=password
                   nUser.email=mail;
                   nUser.image=image;
                   nUser.phone=phone;
                   nUser.name=name;
                   nUser.licence=licence;
                   nUser.spec=spec;
                   nUser.isValid=1
                   nUser.address=address
                   nUser.type='doctor'
                   nUser.admin=admin
                   nUser.branch=branch
                   nUser.surname=surname
                   //console.log(image) 
                   nUser.save((err,respnse)=>{
                    if(err) console.log(err)
                    else res.json({status:'ok'})
                   })
                }
            }
        })
    }

    getAll=(req:express.Request,res:express.Response)=>{
        userModel.find({type:'doctor'},(err,data)=>{
            if(err) console.log(err)
            res.json(data);
        })
    }

    update=(req:express.Request,res:express.Response)=>{
        userModel.updateOne({username:req.body.username},{$set:{
            name:req.body.name,
            licence:req.body.licence,
            address:req.body.address,
            phone:req.body.phone,
            surname:req.body.surname,
            spec:req.body.spec
            
        }},(err,data)=>{
            if(err){console.log(err);res.json({status:'fail'})}
            else res.json({status:'ok'})
        })
    }

    setTypes=(req:express.Request,res:express.Response)=>{
        let username=req.body.username
        let types=req.body.types

        userModel.updateOne({username:username},{$set:{types:types}},(err,resp)=>{
            if(err) console.log(err)
            res.json(resp)
        })
    }

    setSpec=(req:express.Request,res:express.Response)=>{
        let username=req.body.username
        let spec=req.body.spec

        userModel.updateOne({username:username},{$set:{spec:spec}},(err,resp)=>{
            if(err) console.log(err)
            res.json(resp)
        })
    }
}
