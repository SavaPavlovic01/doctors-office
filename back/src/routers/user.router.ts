import express from 'express'
import { userController } from '../controllers/user.controller';

let userRouter=express.Router();

userRouter.route('/register').post((req:express.Request,res:express.Response)=> new userController().register(req,res))
userRouter.route('/login').post((req:express.Request,res:express.Response)=> new userController().login(req,res))
userRouter.route('/updateimage').post((req:express.Request,res:express.Response)=> new userController().updateImage(req,res))
userRouter.route('/updateUserInfo').post((req:express.Request,res:express.Response)=> new userController().updateUserInfo(req,res))
userRouter.route('/get').post((req:express.Request,res:express.Response)=> new userController().get(req,res))
userRouter.route('/getAll').get((req:express.Request,res:express.Response)=> new userController().getAll(req,res))
userRouter.route('/delete').post((req:express.Request,res:express.Response)=> new userController().delete(req,res))
userRouter.route('/updateIsValid').post((req:express.Request,res:express.Response)=> new userController().updateIsValid(req,res))
userRouter.route('/updatePassword').post((req:express.Request,res:express.Response)=> new userController().updatePassword(req,res))

export default userRouter