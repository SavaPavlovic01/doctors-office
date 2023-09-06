import { Component, OnInit } from '@angular/core';
import { AppTypeService } from '../services/app-type.service';
import requests from '../models/requests';
import timeoutManager from '../models/timeoutManager';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { DoctorService } from '../services/doctor.service';

@Component({
  selector: 'app-admin-all-types',
  templateUrl: './admin-all-types.component.html',
  styleUrls: ['./admin-all-types.component.css']
})
export class AdminAllTypesComponent implements OnInit {

  constructor(private appTypeService:AppTypeService,private router:Router,
    private userService:DoctorService) { }

  allTypes:requests[]=[]
  tm:timeoutManager
  allDoctors:User[]=[]

  selectedType:requests=null
    curUser:User
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
      this.selectedType=data[0]
    })

    this.userService.getAll().subscribe((data:User[])=>{
      this.allDoctors=data
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

  delete(request:requests){
    this.appTypeService.delete(request._id).subscribe((data)=>{
      let temp=[]
      for(let type of this.allTypes){
        if(type==request) continue
        temp.push(type)
      }

      this.allTypes=temp
    })
  }

  update(type:requests){
    this.selectedType=type
  }

  saveChanges(){

    if(this.selectedType.price<=0 || this.selectedType.duration<=0){
      return
    }
    
    this.appTypeService.update(this.selectedType._id,this.selectedType.price,this.selectedType.duration).subscribe((data)=>{
      document.getElementById('idk').click()
    })

    for(let doc of this.allDoctors){
      for(let typ of doc.types){
        if(typ.name==this.selectedType.name && doc.spec==this.selectedType.spec){
          typ.duration=this.selectedType.duration
          typ.price=this.selectedType.price
          this.userService.setTypes(doc.types,doc.username).subscribe((data)=>{

          })
        }
      }
    }
  }

  
}
