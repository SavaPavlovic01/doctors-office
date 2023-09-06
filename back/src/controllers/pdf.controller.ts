import express, { Router } from 'express'
import { PDFDocument, PDFFont, StandardFonts, rgb } from 'pdf-lib'
const { writeFileSync } = require("fs");
import fs from 'fs'
import * as path from 'path';
import appointmentModel from '../models/appointment'
import userModel from '../models/user'
import Appo from '../models/app';
import Usr from '../models/usr';

export class pdfController{
    makeNew=async (req:express.Request,res:express.Response,router:express.Router)=>{
        
        let dijagnoza=req.body.dijagnoza
        let therapy=req.body.therapy
        let nextAppDate=req.body.nextAppDate
        let reason=req.body.reason
        let name=req.body.id
        let date=req.body.date.slice(0,10)
        let email=req.body.email
        let doctorName=req.body.doctorName
        let doctorLastName=req.body.doctorLastName
        let spec=req.body.spec
        let hours=req.body.hours
        let minutes=req.body.minutes
        let pic=await this.makeQr('http://localhost:4000/pdfs/'+name+'.pdf')
        //dijagnoza='asdd dddd ddd ddddddd ddddddd ddddd ddd dddd dddd dsdgs dg sgsg sd sgs dgsdgs gsd sdgsdg sgsdgs dgsdgsdgsdgsdgsdgsdgs gsdgsdgsdgs dgsdgsd gsdgsdgsdg dgsdgs dgsgd sgsdgsdgsd gsdg sdg sdgs dgsdgs dgdd dddddd ddddda sfasg asg asg as hashas has'
        console.log(__dirname)
        let pdfPath=path.join(__dirname,"../../src/pdfs/")
        
        if (fs.existsSync(pdfPath+name+'.pdf')) {
            // File exists in path
        } else {
            // File doesn't exist in path
            const pdfDoc = await PDFDocument.create()
            const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

            const page = pdfDoc.addPage([595.28, 841.89])

            let dateText='Date: '+date+' '+hours+':'+minutes
            let dijagnozaText='Diagnosis: '+dijagnoza
            let nextAppDateText='Checkup appointment date: '+nextAppDate
            let therapyText='Therapy: '+therapy
            let reasonText='Reason for appointment: '+reason
            let doctor=doctorName+' '+doctorLastName+' '+spec

            

            let curY=page.getHeight();
        
            page.drawText(dateText, {
                x: page.getWidth()/2-timesRomanFont.widthOfTextAtSize(dateText,12)/2,
                y: page.getHeight()-15,
                size: 12,
                font: timesRomanFont,
                maxWidth:page.getWidth()-60,
                color: rgb(0, 0, 0),
            })
            curY-=15
            curY-=timesRomanFont.heightAtSize(12)
            curY-=5
            page.drawText(doctor, {
                x: page.getWidth()/2-timesRomanFont.widthOfTextAtSize(doctor,12)/2,
                y: curY,
                size: 12,
                font: timesRomanFont,
                maxWidth:page.getWidth()-60,
                color: rgb(0, 0, 0),
            })

            curY-=15
            curY-=timesRomanFont.heightAtSize(12)*2
            curY-=30

            dijagnozaText=this.wrapText(dijagnozaText,page.getWidth()-60,timesRomanFont,12)

            page.drawText(dijagnozaText, {
                x: 30,
                y: curY,
                size: 12,
                font: timesRomanFont,
                maxWidth:page.getWidth()-60,
                color: rgb(0, 0, 0),
            })

            curY-=timesRomanFont.heightAtSize(12)*this.cntLineBreaks(dijagnozaText)
            curY-=30

            page.drawLine({
                start:{x:30,y:curY+15},
                end:{x:page.getWidth()-30,y:curY+15},
                thickness: 2,
                color: rgb(0.75, 0.2, 0.2),
                opacity: 0.75,
            })

            nextAppDateText=this.wrapText(nextAppDateText,page.getWidth()-60,timesRomanFont,12)

            page.drawText(nextAppDateText, {
                x: 30,
                y: curY,
                size: 12,
                font: timesRomanFont,
                maxWidth:page.getWidth()-60,
                color: rgb(0, 0, 0),
            })

            curY-=timesRomanFont.heightAtSize(12)*this.cntLineBreaks(nextAppDateText)
            curY-=30

            page.drawLine({
                start:{x:30,y:curY+15},
                end:{x:page.getWidth()-30,y:curY+15},
                thickness: 2,
                color: rgb(0.75, 0.2, 0.2),
                opacity: 0.75,
            })



            therapyText=this.wrapText(therapyText,page.getWidth()-60,timesRomanFont,12)

            page.drawText(therapyText, {
                x: 30,
                y: curY,
                size: 12,
                font: timesRomanFont,
                maxWidth:page.getWidth()-60,
                color: rgb(0, 0, 0),
            })

            curY-=timesRomanFont.heightAtSize(12)*this.cntLineBreaks(therapyText)
            curY-=30

            page.drawLine({
                start:{x:30,y:curY+15},
                end:{x:page.getWidth()-30,y:curY+15},
                thickness: 2,
                color: rgb(0.75, 0.2, 0.2),
                opacity: 0.75,
            })

            reasonText=this.wrapText(reasonText,page.getWidth()-60,timesRomanFont,12)

            page.drawText(reasonText, {
                x: 30,
                y: curY,
                size: 12,
                font: timesRomanFont,
                maxWidth:page.getWidth()-60,
                color: rgb(0, 0, 0),
            })

            curY-=timesRomanFont.heightAtSize(12)*this.cntLineBreaks(reasonText)
            curY-=30

            page.drawLine({
                start:{x:30,y:curY+15},
                end:{x:page.getWidth()-30,y:curY+15},
                thickness: 2,
                color: rgb(0.75, 0.2, 0.2),
                opacity: 0.75,
            })

            writeFileSync(pdfPath+name+".pdf", await pdfDoc.save());
            router.get('/'+name+'.pdf', (req, res) => {
                res.sendFile(name+'.pdf',{root:'src/pdfs'});
            });
        }
        
        const nodemailer = require('nodemailer');

                // Generate SMTP service account from ethereal.email
        nodemailer.createTestAccount((err, account) => {
            if (err) {
                console.error('Failed to create a testing account. ' + err.message);
                res.json({status:'failed'})
                return process.exit(1);
            }

            console.log('Credentials obtained, sending message...');

            // Create a SMTP transporter object
            let transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });
            let crypto=require('crypto');
            let id=crypto.randomBytes(20).toString('hex')
            //console.log(pic)
            // Message object
            let message = {
                from: 'Sender Name <sender@example.com>',
                to: '<'+email+'>',//'Recipient <recipient@example.com>',
                subject: 'Password reset',
                text: 'http://localhost:4000/pdfs/'+name+'.pdf',
                html: '<a href=http://localhost:4000/pdfs/'+name+'.pdf'+'>Report</a>'+'<br/><img src='+pic+'>'
            };

            transporter.sendMail(message, (err, info) => {
                if (err) {
                    console.log('Error occurred. ' + err.message);
                    res.json({status:'failed'})
                    return process.exit(1);
                }

                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                        
                        
                       
            });
        });
        
        res.json({status:'ok'})
    

    }

    wrapText = (text:string, width:number, font:PDFFont, fontSize:number) => {
        const words = text.split(' ');
        let line = '';
        let result = '';
        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' ';
          const testWidth = font.widthOfTextAtSize(testLine, fontSize);
          if (testWidth > width) {
            result += line + '\n';
            line = words[n] + ' ';
          } else {
            line = testLine;
          }
        }
        result += line;
        return result;
    }

    cntLineBreaks(text:string){
        let cnt=1
        for(let char of text){
            if(char=='\n') cnt++
        }
        return cnt+1
    }

    async makeQr(qrUrl:string):Promise<string>{

        var QRCode = require('qrcode')
        let ret=''

        

        return new Promise((resolve,reject)=>{
            QRCode.toDataURL(qrUrl, function (err, url) {
                resolve(url)
            })
        })
    }

    makeAll=async(req:express.Request,res:express.Response,router:express.Router)=>{
        let id=req.body.id
        let email=req.body.email
        let name=req.body.id
        let allAppointments:Appo[]=[]
        let allDoctors:Usr[]=[]
        let pdfPath=path.join(__dirname,"../../src/pdfs/")
        let pic=await this.makeQr('http://localhost:4000/pdfs/'+name+'.pdf')
        const pdfDoc = await PDFDocument.create()
        if (fs.existsSync(pdfPath+name+'.pdf')) fs.unlinkSync(pdfPath+name+'.pdf')
        if (fs.existsSync(pdfPath+name+'.pdf')){
            router.get('/'+name+'.pdf', (req, res) => {
                res.sendFile(name+'.pdf',{root:'src/pdfs'});
            });
        }
        else {
        const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
        userModel.find({},(err,resp:Usr[])=>{
            allDoctors=resp
            appointmentModel.find({idPatient:id},async (err,res:Appo[])=>{
                allAppointments=res;
                for(let app of allAppointments){
                    if(new Date(app.date).getTime()+app.hours*60*60*1000+app.minutes*60*1000>Date.now()+2*60*60*1000) continue
                    this.makePage(app,pdfDoc,timesRomanFont,allDoctors)
                }
                writeFileSync(pdfPath+name+".pdf", await pdfDoc.save());
                
                router.get('/'+name+'.pdf', (req, res) => {
                res.sendFile(name+'.pdf',{root:'src/pdfs'});
            });
            })
        })}

        const nodemailer = require('nodemailer');

                // Generate SMTP service account from ethereal.email
        nodemailer.createTestAccount((err, account) => {
            if (err) {
                console.error('Failed to create a testing account. ' + err.message);
                res.json({status:'failed'})
                return process.exit(1);
            }

            console.log('Credentials obtained, sending message...');

            // Create a SMTP transporter object
            let transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });
            let crypto=require('crypto');
            let id=crypto.randomBytes(20).toString('hex')
            //console.log(pic)
            // Message object
            let message = {
                from: 'Sender Name <sender@example.com>',
                to: '<'+email+'>',//'Recipient <recipient@example.com>',
                subject: 'Password reset',
                text: 'http://localhost:4000/pdfs/'+name+'.pdf',
                html: '<a href=http://localhost:4000/pdfs/'+name+'.pdf'+'>Report</a>'+'<br/><img src='+pic+'>'
            };

            transporter.sendMail(message, (err, info) => {
                if (err) {
                    console.log('Error occurred. ' + err.message);
                    res.json({status:'failed'})
                    return process.exit(1);
                }

                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                        
                        
                       
            });
        });
        res.json({status:'ok'})
        
    }

    getName(allDoctors:Usr[],id:string):string{
        for(let doc of allDoctors){
            if(doc._id==id) return doc.name+' '+doc.surname+' '+doc.spec
        }
    }

    makePage(app:Appo,pdfDoc:PDFDocument,timesRomanFont,allDoctors){
        const page = pdfDoc.addPage([595.28, 841.89])
    
                    let dateText='Date: '+app.date.slice(0,10)+' '+app.hours+':'+app.minutes
                    let dijagnozaText='Diagnosis: '+app.dijagnoza
                    let nextAppDateText='Checkup appointment date: '+app.nextAppDate
                    let therapyText='Therapy: '+app.therapy
                    let reasonText='Reason for appointment: '+app.reason
                    let doctor=this.getName(allDoctors,app.idDoctor)
    
                
    
                    let curY=page.getHeight();
            
                    page.drawText(dateText, {
                        x: page.getWidth()/2-timesRomanFont.widthOfTextAtSize(dateText,12)/2,
                        y: page.getHeight()-15,
                        size: 12,
                        font: timesRomanFont,
                        maxWidth:page.getWidth()-60,
                        color: rgb(0, 0, 0),
                    })
                    curY-=15
                    curY-=timesRomanFont.heightAtSize(12)
                    curY-=5
                    page.drawText(doctor, {
                        x: page.getWidth()/2-timesRomanFont.widthOfTextAtSize(doctor,12)/2,
                        y: curY,
                        size: 12,
                        font: timesRomanFont,
                        maxWidth:page.getWidth()-60,
                        color: rgb(0, 0, 0),
                    })
    
                    curY-=15
                    curY-=timesRomanFont.heightAtSize(12)*2
                    curY-=30
                    
                    dijagnozaText=this.wrapText(dijagnozaText,page.getWidth()-60,timesRomanFont,12)
    
                    page.drawText(dijagnozaText, {
                        x: 30,
                        y: curY,
                        size: 12,
                        font: timesRomanFont,
                        maxWidth:page.getWidth()-60,
                        color: rgb(0, 0, 0),
                    })
    
                    curY-=timesRomanFont.heightAtSize(12)*this.cntLineBreaks(dijagnozaText)
                    curY-=30
    
                page.drawLine({
                    start:{x:30,y:curY+15},
                    end:{x:page.getWidth()-30,y:curY+15},
                    thickness: 2,
                    color: rgb(0.75, 0.2, 0.2),
                    opacity: 0.75,
                })
    
                nextAppDateText=this.wrapText(nextAppDateText,page.getWidth()-60,timesRomanFont,12)
    
                page.drawText(nextAppDateText, {
                    x: 30,
                    y: curY,
                    size: 12,
                    font: timesRomanFont,
                    maxWidth:page.getWidth()-60,
                    color: rgb(0, 0, 0),
                })
    
                curY-=timesRomanFont.heightAtSize(12)*this.cntLineBreaks(nextAppDateText)
                curY-=30
    
                page.drawLine({
                    start:{x:30,y:curY+15},
                    end:{x:page.getWidth()-30,y:curY+15},
                    thickness: 2,
                    color: rgb(0.75, 0.2, 0.2),
                    opacity: 0.75,
                })
    
    
    
                therapyText=this.wrapText(therapyText,page.getWidth()-60,timesRomanFont,12)
    
                page.drawText(therapyText, {
                    x: 30,
                    y: curY,
                    size: 12,
                    font: timesRomanFont,
                    maxWidth:page.getWidth()-60,
                    color: rgb(0, 0, 0),
                })
    
                curY-=timesRomanFont.heightAtSize(12)*this.cntLineBreaks(therapyText)
                curY-=30
    
                page.drawLine({
                    start:{x:30,y:curY+15},
                    end:{x:page.getWidth()-30,y:curY+15},
                    thickness: 2,
                    color: rgb(0.75, 0.2, 0.2),
                    opacity: 0.75,
                })
    
                reasonText=this.wrapText(reasonText,page.getWidth()-60,timesRomanFont,12)
    
                page.drawText(reasonText, {
                    x: 30,
                    y: curY,
                    size: 12,
                    font: timesRomanFont,
                    maxWidth:page.getWidth()-60,
                    color: rgb(0, 0, 0),
                })
    
                curY-=timesRomanFont.heightAtSize(12)*this.cntLineBreaks(reasonText)
                curY-=30
    
                page.drawLine({
                    start:{x:30,y:curY+15},
                    end:{x:page.getWidth()-30,y:curY+15},
                    thickness: 2,
                    color: rgb(0.75, 0.2, 0.2),
                    opacity: 0.75,
                })
    }

    

}