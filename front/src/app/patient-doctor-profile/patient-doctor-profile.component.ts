import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import IntervalManager from '../models/intervalManager';
import timeoutManager from '../models/timeoutManager';

@Component({
  selector: 'app-patient-doctor-profile',
  templateUrl: './patient-doctor-profile.component.html',
  styleUrls: ['./patient-doctor-profile.component.css']
})
export class PatientDoctorProfileComponent implements OnInit {

  constructor(private router:Router) { }

  curDoctor:User
  curUser:User

  tm:timeoutManager

  logout(){
    localStorage.clear()
    timeoutManager.clear_listeners()
    this.router.navigate([''])
  }

  
  ngOnInit(): void {
    
    this.tm=timeoutManager.getInstance(this.router)
    this.curDoctor=JSON.parse(localStorage.getItem('doctor'));
    this.curUser=JSON.parse(localStorage.getItem('user'))
    if(!this.curUser) this.router.navigate([''])
    if(this.curUser.type!='user') this.logout()
    timeoutManager.logoutOnInit()
    timeoutManager.setInterval()
    timeoutManager.add_listeners()
  }

  get_time_left(){
    return timeoutManager.time_left
  }


}
