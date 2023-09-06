import { Component, OnInit } from '@angular/core';
import timeoutManager from '../models/timeoutManager';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.css']
})
export class UserChangePasswordComponent implements OnInit {

  constructor(private router:Router,private userService:UserService) { }
  tm:timeoutManager
  curUser:User

  ngOnInit(): void {
    this.tm=timeoutManager.getInstance(this.router)
    timeoutManager.clear_listeners()
    this.curUser=JSON.parse(localStorage.getItem('user'))
    if(!this.curUser) this.router.navigate([''])
    if(this.curUser.type!='user') this.logout()
    timeoutManager.logoutOnInit()
    timeoutManager.setInterval()
    timeoutManager.add_listeners()
  }

  logout(){
    localStorage.clear();
    timeoutManager.clear_listeners()
    this.router.navigate(['']) 
  }

  get_time_left(){
    return timeoutManager.time_left
  } 

  pass:string
  newPass:string
  retype:string
  msg:string=''

  submit(){
    this.msg=''
    if(this.pass!=this.curUser.password){
      this.msg='Wrong password'
      return
    }
    if(this.newPass!=this.retype){
      this.msg='Passwords dont match'
      return
    }
    if(this.newPass==this.pass){
      this.msg='New password cannot match old'
      return
    }

    const re=new RegExp(/^[a-zA-Z](?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).*$/,'g');

    if(!re.test(this.newPass)){
      this.msg='Password must contain at least one number, special character and one uppercase letter'
      return
    }
    if(this.newPass.length>12){
      this.msg='Password must not be longer than 12 characters'
      return
    }
    if(this.newPass.length<8){
      this.msg='Password must be longer than 8 characters'
      return
    }
    let oldChar=this.newPass[0]
    for(let i=1;i<this.newPass.length;i++){
      if(oldChar==this.newPass[i]) {this.msg='You cannot have subsequent letters be the same';return}
      oldChar=this.newPass[i]
    }
    this.userService.updatePassword(this.curUser._id,this.newPass).subscribe((data)=>{
      this.logout()
    })
  }

}
