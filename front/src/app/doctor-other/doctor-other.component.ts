import { Component, OnInit } from '@angular/core';
import timeoutManager from '../models/timeoutManager';
import { Router } from '@angular/router';
import { Appointment } from '../models/appointment';
import { AppointmentService } from '../services/appointment.service';
import { User } from '../models/user';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-doctor-other',
  templateUrl: './doctor-other.component.html',
  styleUrls: ['./doctor-other.component.css']
})
export class DoctorOtherComponent implements OnInit {

  constructor(private router:Router,private appointmentService:AppointmentService,
    private requestService:RequestService) { }

  tm:timeoutManager

  select:string

  curUser:User

  appName:string=''
  duration:number=30
  price:number

  startDate:string=new Date(Date.now()).toISOString().slice(0,10)
  endDate:string=new Date(Date.now()).toISOString().slice(0,10)

  dayOff:string=new Date(Date.now()).toISOString().slice(0,10)

  allAppointments:Appointment[]=[]

  msgDay:string=''
  msgVacation:string=''

  ngOnInit(): void {
    this.curUser=JSON.parse(localStorage.getItem('user'))
    if(!this.curUser) this.router.navigate([''])
    if(this.curUser.type!='doctor') this.logout()
    this.tm=timeoutManager.getInstance(this.router)
    timeoutManager.logoutOnInit()
    timeoutManager.setInterval()
    timeoutManager.add_listeners()

    this.appointmentService.getAll(this.curUser._id).subscribe((data:Appointment[])=>{
      this.allAppointments=data
    })
  }

  logout(){
    localStorage.clear()
    timeoutManager.clear_listeners()
    this.router.navigate([''])
  }

  get_time_left(){
    return timeoutManager.time_left
  }

  isDayFree(date:string){
    for(let app of this.allAppointments){
      if(app.date.slice(0,10)==date)return false
    }
    return true
  }

  scheduleFreeDay(){
    if(new Date(this.dayOff).getTime()<Date.now()+2*60*60*1000) {this.msgDay='Invalid date'; return}
    
    if(!this.isDayFree(this.dayOff)){
      this.msgDay='You have an appointment on that day'
      return
    }
    this.appointmentService.add(this.curUser._id,this.curUser._id,this.dayOff,8,0,0,12*60,'day off').subscribe((data)=>{
      this.msgDay='Success'
    })
  }

  scheduleVacation(){
    if(new Date(this.startDate).getTime()<Date.now()+2*60*60*1000){
      this.msgVacation='Invalid date'
      return
    }
    if(new Date(this.startDate).getTime()>new Date(this.endDate).getTime()){
      this.msgVacation='Invalid date'
      return
    }

    
    let sDate=new Date(this.startDate)
    let eDate=new Date(this.endDate)

    while(true){
      
      console.log(sDate.toISOString().slice(0,10))
      if(!this.isDayFree(sDate.toISOString().slice(0,10))){
        this.msgVacation='Invalid date'
        return
      }

      sDate.setTime(sDate.getTime()+24*60*60*1000)
      if(sDate.getTime()>eDate.getTime()) break
    }

    sDate=new Date(this.startDate)
    eDate=new Date(this.endDate)
    while(true){
      

      this.appointmentService.add(this.curUser._id,this.curUser._id,sDate.toISOString(),8,0,0,12*60,'vacation').subscribe((data)=>{
        this.msgVacation='Success'
      })

      sDate.setTime(sDate.getTime()+24*60*60*1000)
      if(sDate.getTime()>eDate.getTime()) break
    }
  }

  msgReq:string=''
  makeRequest(){
    if(this.appName=='' || this.duration==undefined || this.price==undefined){
      this.msgReq='Fill all fields'
      return
    }
    if(this.duration<=0 || this.price<=0){
      this.msgReq='Ivalid values'
      return
    }

    this.requestService.add(this.appName,this.curUser.spec,this.duration,this.price).subscribe((data)=>{
      this.msgReq='Success'
    })
  }

}
