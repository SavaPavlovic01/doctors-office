import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private userService:UserService,private router:Router) { }

  username:string
  password:string
  msg:string

  ngOnInit(): void {
  }

  login(){
    this.userService.login(this.username,this.password,true).subscribe((data:User)=>{
      localStorage.setItem('user',JSON.stringify(data))
      this.router.navigate(['adminAllUsers'])
    })
  }

}
