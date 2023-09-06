import express from 'express'
import appTypeController from '../controllers/appType.controller';

let appTypeRouter=express.Router();
appTypeRouter.route('/add').post((req,res)=> new appTypeController().add(req,res))
appTypeRouter.route('/getAll').post((req,res)=> new appTypeController().getAll(req,res))
appTypeRouter.route('/get').get((req,res)=>new appTypeController().get(req,res))
appTypeRouter.route('/delete').post((req,res)=>new appTypeController().delete(req,res))
appTypeRouter.route('/update').post((req,res)=>new appTypeController().update(req,res))
export default appTypeRouter