import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { DoctorService } from '../services/doctor.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private doctorService:DoctorService) { }

  ngOnInit(): void {
    this.getAllCompanies()
    
  }


  allDoctors:User[]
  shownDoctors:User[]
  paramName:string='';
  paramLastName:string='';
  paramSpec:string='';

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

      return 0;
    })
  }

  changeSort(){
    this.ascending=!this.ascending
    this.sort(this.sortArg);
  }
}
