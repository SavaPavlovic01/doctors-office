import { Component, OnInit } from '@angular/core';
import timeoutManager from '../models/timeoutManager';
import { User } from '../models/user';
import requests from '../models/requests';
import { Router } from '@angular/router';
import { AppTypeService } from '../services/app-type.service';

@Component({
  selector: 'app-admin-add-type',
  templateUrl: './admin-add-type.component.html',
  styleUrls: ['./admin-add-type.component.css']
})
export class AdminAddTypeComponent implements OnInit {

  constructor(private router:Router,private appTypeService:AppTypeService) { }

  spec:string=''
  name:string=''
  price:number=2000
  duration:number=30

  tm:timeoutManager

  curUser:User
  allTypes:requests[]=[]

  allSpec:string[]=[]

  msg:string=''
  msgSucces:string=''

  ngOnInit(): void {
    this.curUser=JSON.parse(localStorage.getItem('user'))
    if(!this.curUser) this.router.navigate([''])
    if(this.curUser.admin==false) this.logout()
    this.tm=timeoutManager.getInstance(this.router)
    timeoutManager.logoutOnInit()
    timeoutManager.setInterval()
    timeoutManager.add_listeners()
    
    this.appTypeService.get().subscribe((data:requests[])=>{
      this.allTypes=data

      for(let typ of this.allTypes){
        if(this.allSpec.includes(typ.spec))continue
        this.allSpec.push(typ.spec)
      }
    })

  }

  saveChanges(){
    this.msgSucces=''
    if(this.spec=='' || this.name==''){
      this.msg='Fill all fields'
      return
    }
    if(this.price<=0 || this.duration<=0){
      this.msg='Invalid value'
      return
    }

    this.appTypeService.add(this.duration,this.price,this.spec,this.name).subscribe((data)=>{
      this.msgSucces='Appointment type added'
      this.msg=''
    })
  }

  get_time_left(){
    return timeoutManager.time_left
  }

  logout(){
    localStorage.clear()
    timeoutManager.clear_listeners()
    this.router.navigate([''])
  }
}
