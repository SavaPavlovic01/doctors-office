import express from 'express'
import { AppointmentController } from '../controllers/appointments.controller'

let appointmentRouter=express.Router();
appointmentRouter.route('/add').post((req,res)=> new AppointmentController().add(req,res))
appointmentRouter.route('/getAll').post((req,res)=> new AppointmentController().getAll(req,res))
appointmentRouter.route('/addReport').post((req,res)=> new AppointmentController().addReport(req,res))
appointmentRouter.route('/cancel').post((req,res)=> new AppointmentController().cancel(req,res))


export default appointmentRouter