import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from '../services/appointment.service';
import timeoutManager from '../models/timeoutManager';
import { Appointment } from '../models/appointment';
import { User } from '../models/user';
import { DoctorService } from '../services/doctor.service';
import { UserService } from '../services/user.service';
import {Toast} from 'bootstrap'

@Component({
  selector: 'app-patient-appointments',
  templateUrl: './patient-appointments.component.html',
  styleUrls: ['./patient-appointments.component.css']
})
export class PatientAppointmentsComponent implements OnInit {

  constructor(private router:Router,private appointmentService:AppointmentService,private doctorService:DoctorService,
    private userService:UserService) { }

  tm:timeoutManager
  curUser:User
  allAppointments:Appointment[]
  allDoctors:User[]=[]
  shownAppointments:Appointment[]=[]
  showing:string='appointments'

  changeOnClick(){
    
    this.shownAppointments=[]
    if(this.showing=='report'){
      for(let app of this.allAppointments){
        if(this.inPast(app)) this.shownAppointments.push(app)
      }
      this.sortAppointments(true)
    }else {
      for (let app of this.allAppointments){
        if(!this.inPast(app)) this.shownAppointments.push(app)
      }
      this.sortAppointments(true)
    }
  }

  sortAppointments(ascending:boolean){
    if(ascending){
      this.shownAppointments.sort((a,b)=>{

        if(ascending)return (new Date(a.date).getTime()+a.hours*60*60*1000+a.minutes*60*1000)-
          (new Date(b.date).getTime()+b.hours*60*60*1000+b.minutes*60*1000)
        else return -((new Date(a.date).getTime()+a.hours*60*60*1000+a.minutes*60*1000)-
        (new Date(b.date).getTime()+b.hours*60*60*1000+b.minutes*60*1000))
      })
    }
    
  }

  ngOnInit(): void {
    this.tm=timeoutManager.getInstance(this.router)
    this.curUser=JSON.parse(localStorage.getItem('user'))
    if(!this.curUser) this.router.navigate([''])
    if(this.curUser.type!='user') this.logout()
    this.appointmentService.getAll(this.curUser._id).subscribe((data:Appointment[])=>{
      this.allAppointments=data
      this.shownAppointments=data
      this.changeOnClick()
    })
    timeoutManager.logoutOnInit()
    timeoutManager.setInterval()
    timeoutManager.add_listeners()
    this.doctorService.getAll().subscribe((data:User[])=>{
      this.allDoctors=data
    })

  }

  get_doctor_name(id:string){
    for(let doctor of this.allDoctors){
      if(doctor._id==id) return doctor.name
    }
    return ''
  }

  get_doctor_lastname(id:string){
    for(let doctor of this.allDoctors){
      if(doctor._id==id) return doctor.surname
    }
    return ''
  }

  get_doctor_branch(id:string){
    for(let doctor of this.allDoctors){
      if(doctor._id==id) return doctor.branch
    }
    return ''
  }

  get_doctor_spec(id:string){
    for(let doctor of this.allDoctors){
      if(doctor._id==id) return doctor.spec
      
    }
    return ''
    
  }

  inPast(app:Appointment){
    let time=new Date(app.date).getTime()+app.hours*60*60*1000+app.minutes*60*1000
    let curTime=Date.now()+2*60*60*1000

    if(curTime>=time) return true
    else return false
  }

  logout(){
    localStorage.clear()
    timeoutManager.clear_listeners()
    this.router.navigate([''])
  }

  addReport(id:string){
    this.appointmentService.addReport(id,'Bradavica na stopalu','2 x Clavex dnevno','Neko cudo na stopalu','2023-08-16').subscribe((data)=>{

    })
  }

  cancel(id:string){
    this.appointmentService.cancel(id).subscribe((data)=>{
      this.appointmentService.getAll(this.curUser._id).subscribe((data:Appointment[])=>{
        this.allAppointments=data
        this.changeOnClick()
      })
    })
  }

  makePdf(app:Appointment){
    this.userService.makePdf(app._id,app.date,this.curUser.email,app.dijagnoza,app.therapy,
      app.nextAppDate,app.reason,this.get_doctor_name(app.idDoctor),this.get_doctor_lastname(app.idDoctor),
      this.get_doctor_spec(app.idDoctor),app.hours,app.minutes).subscribe((data)=>{
        const toastLiveExample = document.getElementById('liveToast')
        const toastBootstrap = Toast.getOrCreateInstance(toastLiveExample)
        toastBootstrap.show()
    })
  }
  makeAll(){
    this.userService.makeAll(this.curUser._id,this.curUser.email).subscribe((data)=>{
      const toastLiveExample = document.getElementById('liveToast')
      const toastBootstrap = Toast.getOrCreateInstance(toastLiveExample)
      toastBootstrap.show()
    })
  }

  get_time_left(){
    return timeoutManager.time_left
  }
}
