import express from 'express'
import { pdfController } from '../controllers/pdf.controller'

let pdfRouter=express.Router();
pdfRouter.route('/makeNew').post((req,res)=> new pdfController().makeNew(req,res,pdfRouter))
pdfRouter.route('/makeAll').post((req,res)=> new pdfController().makeAll(req,res,pdfRouter))
export default pdfRouter