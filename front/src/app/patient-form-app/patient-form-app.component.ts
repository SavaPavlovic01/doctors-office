import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import timeoutManager from '../models/timeoutManager';
import { User } from '../models/user';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../models/appointment';
import { NotificationService } from '../services/notification.service';
import requests from '../models/requests';
import { AppTypeService } from '../services/app-type.service';
import types from '../models/types';

@Component({
  selector: 'app-patient-form-app',
  templateUrl: './patient-form-app.component.html',
  styleUrls: ['./patient-form-app.component.css']
})
export class PatientFormAppComponent implements OnInit {

  constructor(private router:Router,private appointmentService:AppointmentService,private notificationService:NotificationService,
    private appTypeService:AppTypeService) { }

  tm:timeoutManager

  curUser:User
  curDoctor:User

  hours:number=8
  minutes:number=0
  edit:boolean=false

  type:string

  date:string

  //sel:requests
  sel:types
  allAppointments:Appointment[]

  get_edit(){return this.edit}

  hours_click(){
    this.edit=!this.edit
    setTimeout(()=>{
      if(this.edit){document.getElementById("hrs").focus()}
    })
  }

  toggle(){
    this.edit=false;
    if(this.hours>20)this.hours=20
    else if(this.hours<8) this.hours=8
    if(this.minutes<15 ){this.minutes=0;return}
    if(this.minutes<30){this.minutes=15;return}
    if(this.minutes<45){this.minutes=30;return}
    if(this.minutes<60){this.minutes=45;return}
    if(this.minutes>=60){this.minutes=45;return}
  }

  get_hours(){
    if(this.hours<10) return ('0'+this.hours.toString())
    else return this.hours.toString()
  }

  get_minutes(){
    if(this.minutes==0) return '00'
    else return this.minutes.toString();
  }

  hours_up(){
    if(this.hours==19) this.hours=8
    else this.hours++;
  }

  minutes_up(){
    if(this.minutes==45) this.minutes=0;
    else this.minutes+=15;
  }

  hours_down(){
    if(this.hours==8) this.hours=19
    else this.hours--;
  }

  minutes_down(){
    if(this.minutes==0) this.minutes=45
    else this.minutes-=15;
  }

  ngOnInit(): void {
    this.tm=timeoutManager.getInstance(this.router)
    timeoutManager.clear_listeners()
    this.curUser=JSON.parse(localStorage.getItem('user'))
    this.curDoctor=JSON.parse(localStorage.getItem('doctor'))
    if(!this.curUser) this.router.navigate([''])
    if(this.curUser.type!='user') this.logout()
    this.appointmentService.getAll(this.curDoctor._id).subscribe((data:Appointment[])=>{
      this.allAppointments=data
    })
    timeoutManager.logoutOnInit()
    timeoutManager.setInterval()
    timeoutManager.add_listeners()

    this.appTypeService.getAll(this.curDoctor.spec).subscribe((data:requests[])=>{
      this.allTypes=data
      this.sel=this.curDoctor.types[0]
    })

    document.addEventListener('keydown',(ev)=>{
      if(ev.key=='Enter'){
        if(this.edit){
          this.toggle()
        }
      }
    })
  }

  allTypes:requests[]=[]
  logout(){
    localStorage.clear();
    timeoutManager.clear_listeners()
    this.router.navigate([''])
  }

  get_time_left(){
    return timeoutManager.time_left
  }

  submit(){

    if(this.date==null || this.date==''){
      this.msg='Please fill all fields'
      return
    }

    if(((new Date(this.date).getTime())+this.hours*60*60*1000+this.minutes*60*1000)<=(Date.now())){
      this.msg='Invalid date'
      return
    }

    let timeStart=(new Date(this.date).getTime())+this.hours*60*60*1000+this.minutes*60*1000
    console.log(new Date(timeStart))
    let timeEnd=timeStart+this.sel.duration*60*1000//duration
    if(new Date(timeEnd).getHours()-1>20){
      console.log(new Date(timeEnd).getHours())
      this.msg='Invalid date'
      return
    }
    
    for(let app of this.allAppointments){
      let timeStartApp=new Date(app.date).getTime()+app.hours*60*60*1000+app.minutes*60*1000
      let timeEndApp=timeStartApp+app.duration*60*1000
      if(app.date!==this.date) continue
      
      if(timeStart>=timeStartApp && timeStart<timeEndApp){
        
        this.msg='Time slot already taken'
        return
      }
      if(timeEnd>timeStartApp && timeEnd<=timeEndApp){
        
        this.msg='Time slot already taken'
        return
      }
      if(timeStart<=timeStartApp && timeEnd>=timeEndApp){
        
        this.msg='Time slot already taken'
        return
      }
      if(timeStart>=timeStartApp && timeEnd<=timeEndApp){
        
        this.msg='Time slot already taken'
        return
      }
    }
    let timeShown=new Date(this.date).getTime()+this.hours*60*60*1000+this.minutes*60*1000-1*24*60*60*1000
    let text='You have an appointment tomorrow '+this.date.slice(0,10)+' '+this.hours+':'+this.minutes
    this.notificationService.addNew(this.curDoctor._id,timeShown,text).subscribe((data)=>{
      
    })

    this.appointmentService.add(this.curDoctor._id,this.curUser._id,this.date,this.hours,this.minutes,this.sel.price
      ,this.sel.duration,this.sel.name).subscribe((data)=>{
        let status=JSON.parse(JSON.stringify(data)).status
        console.log(JSON.parse(JSON.stringify(data)).status)
        this.appointmentService.getAll(this.curDoctor._id).subscribe((data:Appointment[])=>{
          this.allAppointments=data
        })
      })
    this.msg='Appointment scheduled'
  }

  msg:string=''

}
