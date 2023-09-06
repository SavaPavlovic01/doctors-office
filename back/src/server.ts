import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import userRouter from './routers/user.router'
import doctorRouter from './routers/doctor.router'
import appointmentRouter from './routers/appointment.router';
import pdfRouter from './routers/pdf.router';
import notificationRouter from './routers/notification.router';
import appTypeRouter from './routers/appType.router';
import requestRouter from './routers/request.router';

const app = express();
app.use(cors())
app.use(express.json({limit:'50mb'}))


mongoose.connect('mongodb://127.0.0.1:27017/projekat');
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("connected");
})
const router=express.Router();
router.use('/users',userRouter);
router.use('/doctors',doctorRouter)
router.use('/appointments',appointmentRouter)
router.use('/pdfs',pdfRouter)
router.use('/notifications',notificationRouter)
router.use('/appTypes',appTypeRouter)
router.use('/requests',requestRouter)
router.get("/sendPDF", (req, res) => {
    res.sendFile("cv.pdf",{root:'src/pdfs'});
});

app.use('/',router)
app.listen(4000, () => console.log(`Express server running on port 4000`));