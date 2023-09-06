import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
  }

  username:string
  password:string
  msg:string

  login(){
    this.userService.login(this.username,this.password,false).subscribe((data:User)=>{
      if(data==null){
        this.msg='Wrong username or password'
        return
      }else {
        if(data.isValid==0){
          this.msg='Account is not yet vallid'
          return
        }
        if(data.isValid==2){
          this.msg='Account declined'
          return
        }
        data.last_active=Date.now()
        localStorage.setItem('user',JSON.stringify(data))
        if(data.type=='user') this.router.navigate(['userProfile'])
        else this.router.navigate(['doctorProfile'])
      }
    })
  }

}
