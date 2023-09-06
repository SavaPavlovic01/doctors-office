import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import timeoutManager from '../models/timeoutManager';

@Component({
  selector: 'app-admin-all-users',
  templateUrl: './admin-all-users.component.html',
  styleUrls: ['./admin-all-users.component.css']
})
export class AdminAllUsersComponent implements OnInit {

  constructor(private router:Router,private userService:UserService) { }

  allUsers:User[]=[]

  curUser:User
  tm:timeoutManager

  ngOnInit(): void {
    this.curUser=JSON.parse(localStorage.getItem('user'))
    if(!this.curUser) this.router.navigate([''])
    if(this.curUser.admin==false) this.logout()
    this.tm=timeoutManager.getInstance(this.router)
    timeoutManager.logoutOnInit()
    timeoutManager.setInterval()
    timeoutManager.add_listeners()
    
    this.userService.getAll().subscribe((data:User[])=>{
      this.allUsers=data
      let temp=[]
      for(let user of this.allUsers){
        if(user.isValid!=1) continue
        temp.push(user)
      }
      this.allUsers=temp
    })
  }

  logout(){
    localStorage.clear()
    timeoutManager.clear_listeners()
    this.router.navigate([''])
  }

  redirect(user:User){
    localStorage.setItem('usr',JSON.stringify(user))
    if(user.type=='user') this.router.navigate(['adminUserProfile'])
    else this.router.navigate(['adminDoctorProfile'])
  }

  get_time_left(){
    return timeoutManager.time_left
  }

}
