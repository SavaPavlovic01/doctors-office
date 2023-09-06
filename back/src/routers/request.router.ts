import express from 'express'
import requestContorller from '../controllers/requests.controller';

let requestRouter=express.Router();

requestRouter.route('/add').post((req,res)=>new requestContorller().add(req,res));
requestRouter.route('/delete').post((req,res)=>new requestContorller().remove(req,res));
requestRouter.route('/getAll').get((req,res)=>new requestContorller().getAll(req,res));

export default requestRouter