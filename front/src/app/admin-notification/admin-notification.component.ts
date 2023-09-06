import { Component, OnInit } from '@angular/core';
import timeoutManager from '../models/timeoutManager';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-admin-notification',
  templateUrl: './admin-notification.component.html',
  styleUrls: ['./admin-notification.component.css']
})
export class AdminNotificationComponent implements OnInit {

  constructor(private router:Router,private notificationService:NotificationService,
    private userService:UserService) { }

  tm:timeoutManager
  text:string
  msgSucces:string=''
    curUser:User
  ngOnInit(): void {
    this.curUser=JSON.parse(localStorage.getItem('user'))
    if(!this.curUser) this.router.navigate([''])
    if(this.curUser.admin==false) this.logout()
    this.tm=timeoutManager.getInstance(this.router)
    timeoutManager.logoutOnInit()
    timeoutManager.setInterval()
    timeoutManager.add_listeners()
  }

  get_time_left(){
    return timeoutManager.time_left
  }

  send(){
    this.msgSucces=''
    let allId=[]

    this.userService.getAll().subscribe((data:User[])=>{
      for(let user of data){
        if(user.type=='user' && user.isValid==1){
          this.notificationService.addNew(user._id,0,this.text).subscribe((data)=>{

          })
        }
      }
      this.msgSucces='Notification sent'
    })
  }

  logout(){
    localStorage.clear()
    timeoutManager.clear_listeners()
    this.router.navigate([''])
  }

}
