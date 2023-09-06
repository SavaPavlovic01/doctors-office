import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { User } from '../models/user';
import timeoutManager from '../models/timeoutManager';
import { Router } from '@angular/router';
import Notification from '../models/notification';

@Component({
  selector: 'app-patient-notifications',
  templateUrl: './patient-notifications.component.html',
  styleUrls: ['./patient-notifications.component.css']
})
export class PatientNotificationsComponent implements OnInit {

  constructor(private notificationService:NotificationService,private router:Router) { }

  curUser:User
  allNotis:Notification[]=[]
  tm:timeoutManager

  ngOnInit(): void {
    this.tm=timeoutManager.getInstance(this.router)
    
    this.curUser=JSON.parse(localStorage.getItem('user'))
    if(!this.curUser) this.router.navigate([''])
    if(this.curUser.type!='user') this.logout()
    
    this.notificationService.getAll(this.curUser._id).subscribe((data:Notification[])=>{
      this.allNotis=data;
      this.filterNotis()
      this.sortNotis()
      
    })

    timeoutManager.logoutOnInit()
    timeoutManager.setInterval()
    timeoutManager.add_listeners()
  }

  logout(){
    localStorage.clear()
    timeoutManager.clear_listeners()
    this.router.navigate([''])
  }

  get_time_left(){
    return timeoutManager.time_left
  }

  show(date:number){
    if(Date.now()>=date) return true
    return false
  }

  markRead(noti:Notification){
    noti.read=true
    this.sortNotis()
    this.notificationService.update(noti._id).subscribe((data)=>{
      noti.read=true
      this.sortNotis()
    })
    
  }

  sortNotis(){
    this.shownNotis.sort((a,b)=>{
      if(a.read==true && b.read==false) return 1
      if(a.read==false && b.read==true) return -1
      return 0
    })
  }

  shownNotis:Notification[]=[]

  filterNotis(){
    this.shownNotis=[]
    for(let noti of this.allNotis){
      if(noti.timeShown<Date.now()) this.shownNotis.push(noti)
    }
  }
}
