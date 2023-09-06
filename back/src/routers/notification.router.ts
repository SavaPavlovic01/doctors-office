import express from 'express'
import notificationController from '../controllers/notification.controller';

let notificationRouter=express.Router();
notificationRouter.route('/addNew').post((req,res)=>new notificationController().addNew(req,res))
notificationRouter.route('/update').post((req,res)=>new notificationController().updateStatus(req,res))
notificationRouter.route('/getAll').post((req,res)=>new notificationController().getAll(req,res))

export default notificationRouter