import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import timeoutManager from '../models/timeoutManager';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-register-request',
  templateUrl: './admin-register-request.component.html',
  styleUrls: ['./admin-register-request.component.css']
})
export class AdminRegisterRequestComponent implements OnInit {

  constructor(private router:Router,private userService:UserService) { }

  allUsers:User[]=[]
  realAllUsers:User[]=[]
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
      this.realAllUsers=data
      let temp=[]
      for(let usr of this.allUsers){
        if(usr.isValid==0) temp.push(usr)
      }
      this.allUsers=temp
    })
  }

  logout(){
    localStorage.clear()
    timeoutManager.clear_listeners()
    this.router.navigate([''])
  }

  accept(usr:User){
    usr.isValid=1
    this.userService.updateIsValid(1,usr._id).subscribe((data)=>{
      this.allUsers=[]
      for(let user of this.realAllUsers){
        if(user.isValid==0) this.allUsers.push(user)
      }
    })
  }

  decline(usr:User){
    usr.isValid=2
    this.userService.updateIsValid(2,usr._id).subscribe((data)=>{
      this.allUsers=[]
      for(let user of this.realAllUsers){
        if(user.isValid==0) this.allUsers.push(user)
      }
    })
  }

  get_time_left(){
    return timeoutManager.time_left
  }

}
