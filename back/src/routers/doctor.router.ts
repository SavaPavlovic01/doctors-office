import express from 'express'
import { doctorController } from '../controllers/doctor.controller';

let doctorRouter=express.Router();
doctorRouter.route('/register').post((req,res)=> new doctorController().register(req,res))
doctorRouter.route('/getAll').get((req,res)=> new doctorController().getAll(req,res));
doctorRouter.route('/update').post((req,res)=> new doctorController().update(req,res));
doctorRouter.route('/setTypes').post((req,res)=> new doctorController().setTypes(req,res));
doctorRouter.route('/setSpec').post((req,res)=> new doctorController().setSpec(req,res));
export default doctorRouter