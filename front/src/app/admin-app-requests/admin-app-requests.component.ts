import { Component, OnInit } from '@angular/core';
import timeoutManager from '../models/timeoutManager';
import { Router } from '@angular/router';
import { User } from '../models/user';
import requests from '../models/requests';
import { RequestService } from '../services/request.service';
import { AppTypeService } from '../services/app-type.service';

@Component({
  selector: 'app-admin-app-requests',
  templateUrl: './admin-app-requests.component.html',
  styleUrls: ['./admin-app-requests.component.css']
})
export class AdminAppRequestsComponent implements OnInit {

  constructor(private router:Router,private requestService:RequestService,private appTypeService:AppTypeService) { }

  tm:timeoutManager

  curUser:User

  allReqs:requests[]=[]

  ngOnInit(): void {
    this.tm=timeoutManager.getInstance(this.router)
    timeoutManager.clear_listeners()
    this.curUser=JSON.parse(localStorage.getItem('user'))
    if(!this.curUser) this.router.navigate([''])
    if(this.curUser.admin==false) this.logout()
    timeoutManager.logoutOnInit()
    timeoutManager.setInterval()
    timeoutManager.add_listeners()

    this.requestService.getAll().subscribe((data:requests[])=>{
      this.allReqs=data
      console.log(this.allReqs.length)
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

  accept(request:requests){
    this.appTypeService.add(request.duration,request.price,request.spec,request.name).subscribe((data)=>{
      let temp=[]
      for(let req of this.allReqs){
        if(req==request) continue
        temp.push(req)
      }
      this.allReqs=temp
    })
  }

  decline(request:requests){
    this.requestService.delete(request._id).subscribe((data)=>{
      let temp=[]
      for(let req of this.allReqs){
        if(req==request) continue
        temp.push(req)
      }
      this.allReqs=temp
    })
  }

}
