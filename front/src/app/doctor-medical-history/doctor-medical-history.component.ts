import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import timeoutManager from '../models/timeoutManager';
import { Router } from '@angular/router';
import { Appointment } from '../models/appointment';
import { AppointmentService } from '../services/appointment.service';
import { DoctorService } from '../services/doctor.service';

@Component({
  selector: 'app-doctor-medical-history',
  templateUrl: './doctor-medical-history.component.html',
  styleUrls: ['./doctor-medical-history.component.css']
})
export class DoctorMedicalHistoryComponent implements OnInit {

  constructor(private patientService:UserService,private router:Router,private appointmentService:AppointmentService,
    private doctorService:DoctorService) { }

  curPatient:User
  tm:timeoutManager
  allAppointments:Appointment[]=[]
  allDoctors:User[]=[]
  shownApps:Appointment[]=[]
  
  ngOnInit(): void {
    
    this.tm=timeoutManager.getInstance(this.router)
    timeoutManager.logoutOnInit()
    timeoutManager.setInterval()
    timeoutManager.add_listeners()
    
    let id=JSON.parse(localStorage.getItem('patient'))
    this.patientService.get(id).subscribe((data:User)=>{
      this.curPatient=data
      this.appointmentService.getAll(this.curPatient._id).subscribe((dataA:Appointment[])=>{
        this.allAppointments=dataA
        for(let app of this.allAppointments){
          if(app.dijagnoza!=='') this.shownApps.push(app)
        }
      })
    })
    this.doctorService.getAll().subscribe((data:User[])=>{
      this.allDoctors=data
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

}
