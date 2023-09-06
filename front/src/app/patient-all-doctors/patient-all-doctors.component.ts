import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { DoctorService } from '../services/doctor.service';
import { Router } from '@angular/router';
import IntervalManager from '../models/intervalManager';
import timeoutManager from '../models/timeoutManager';

@Component({
  selector: 'app-patient-all-doctors',
  templateUrl: './patient-all-doctors.component.html',
  styleUrls: ['./patient-all-doctors.component.css']
})
export class PatientAllDoctorsComponent implements OnInit {

  constructor(private doctorService:DoctorService,private router:Router) { }

  

  tm:timeoutManager

  get_time_left(){
    return timeoutManager.time_left
  }

  ngOnInit(): void {
    this.tm=timeoutManager.getInstance(this.router)
    timeoutManager.clear_listeners()
    this.getAllCompanies()
    this.curUser=JSON.parse(localStorage.getItem('user'))
    if(!this.curUser) this.router.navigate([''])
    
    if(this.curUser.type!='user') this.logout()
    timeoutManager.logoutOnInit()
    timeoutManager.setInterval()
    timeoutManager.add_listeners()
    
  }


  allDoctors:User[]
  shownDoctors:User[]
  paramName:string='';
  paramLastName:string='';
  paramSpec:string='';
  paramBranch:string=''

  getAllCompanies(){
    this.doctorService.getAll().subscribe((data:User[])=>{
      this.allDoctors=data
      this.shownDoctors=data
    })
  }

  filter(){
    console.log(this.paramName)
    this.shownDoctors=this.allDoctors.filter((user:User,index,array)=>{
      if(this.paramName=='') return true
      return user.name.toLowerCase().includes(this.paramName.toLowerCase());
    })

    this.shownDoctors=this.shownDoctors.filter((user:User,index,array)=>{
      if(this.paramLastName=='') return true
      return user.surname.toLowerCase().includes(this.paramLastName.toLowerCase());
    })

    this.shownDoctors=this.shownDoctors.filter((user:User,index,array)=>{
      if(this.paramSpec=='') return true
      return user.spec.toLowerCase().includes(this.paramSpec.toLowerCase());
    })

    this.shownDoctors=this.shownDoctors.filter((user:User,index,array)=>{
      if(this.paramBranch=='') return true
      return user.branch.toLowerCase().includes(this.paramBranch.toLowerCase());
    })
  }

  sortArg:string
  ascending:boolean=false;

  sort(help:string){
    this.shownDoctors.sort((user1,user2)=>{
      if(help=='name'){
        if(this.ascending){
          return user1.name.localeCompare(user2.name)
        }else return user2.name.localeCompare(user1.name)
      }

      if(help=='lastname'){
        if(this.ascending){
          return user1.surname.localeCompare(user2.surname)
        }else return user2.surname.localeCompare(user1.surname)
      }

      if(help=='spec'){
        if(this.ascending){
          return user1.spec.localeCompare(user2.spec)
        }else return user2.spec.localeCompare(user1.spec)
      }

      if(help=='branch'){
        if(this.ascending){
          return user1.branch.localeCompare(user2.branch)
        }else return user2.branch.localeCompare(user1.branch)
      }

      return 0;
    })
    
  }

  changeSort(){
    this.ascending=!this.ascending
    this.sort(this.sortArg);
  }

  logout(){
    localStorage.clear();
    timeoutManager.clear_listeners()
    this.router.navigate([''])   
  }



  curUser:User
  

}
