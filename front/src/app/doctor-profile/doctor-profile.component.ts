import { Component, OnInit } from '@angular/core';
import timeoutManager from '../models/timeoutManager';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { DoctorService } from '../services/doctor.service';
import { AppTypeService } from '../services/app-type.service';
import appType from '../models/appType';
import types from '../models/types';
import requests from '../models/requests';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit {

  tm:timeoutManager

  allSpec:string[]=[]

  novo:requests[]=[]

  constructor(private router:Router,private userService:UserService,private doctorService:DoctorService,
    private appTypeService:AppTypeService) { }

  get_time_left(){
    return timeoutManager.time_left
  }

  ngOnInit(): void {
    this.tm=timeoutManager.getInstance(this.router)
    timeoutManager.clear_listeners()
    this.curUser=JSON.parse(localStorage.getItem('user'))
    if(!this.curUser) this.router.navigate([''])
    if(this.curUser.type!='doctor') this.logout()
    timeoutManager.logoutOnInit()
    timeoutManager.setInterval()
    timeoutManager.add_listeners()

    this.appTypeService.getAll(this.curUser.spec).subscribe((data:appType[])=>{
      this.allTypes=data
      this.initCheck()

      
    })
    this.appTypeService.get().subscribe((data:requests[])=>{
      this.novo=data
      for(let typ of this.novo){
        if(this.allSpec.includes(typ.spec))continue
        this.allSpec.push(typ.spec)
        
      }
    })
  }
  selectedTypes:string[]=[]

  printTypes(){
    for(let ty of this.allTypes) console.log(ty.checked)
  }
  curUser:User
  image:string=''
  msgPic:string=''

  file:ArrayBuffer
  realFile:File
  fileData:string=''

  updating:boolean=false

  msgUpdate:string=''

  allTypes:appType[]=[]

  update(){this.updating=true}

  save(){

    const mailReg=new RegExp(/^.+@.+\..+$/,'g')
    const phoneReg=new RegExp(/^(\d{10})$|(\d{3}-\d{3}-\d{4})$|(\d{3}\/\d{3}\/\d{4})$/)

    if(!mailReg.test(this.curUser.email)){
      this.msgUpdate='Not a valid email address'
      return
    }
    if(!phoneReg.test(this.curUser.phone)){
      this.msgUpdate='Not a valid phone number'
      return
    }

    if(this.curUser.address==''){
      this.msgUpdate='Please fill out all fields'
      return;
    }

    if(this.curUser.name==''){
      this.msgUpdate='Please fill out all fields'
      return;
    }

    if(this.curUser.surname==''){
      this.msgUpdate='Please fill out all fields'
      return;
    }

    this.updating=false;
    this.msgUpdate=''

    

    localStorage.setItem('user',JSON.stringify(this.curUser))
    console.log(this.curUser.licence)
    
    this.doctorService.update(this.curUser.username,this.curUser.phone,this.curUser.name,this.curUser.surname,
      this.curUser.address,this.curUser.licence.toString(),this.curUser.spec).subscribe((data)=>{
        location.reload()
      })
  }

  logout(){
    localStorage.clear()
    timeoutManager.clear_listeners()
    this.router.navigate([''])
  }

  uploadFile(event){
    let curFile=event.target.files[0]
    //this.realFile=curFile
    let reader=new FileReader();
    console.log(curFile.type)
    if(!['image/jpeg','image/png'].includes(curFile.type)){
      
      this.msgPic='Image has to be png or jpg format'
      return
    }
    let ok=true
    reader.readAsDataURL(curFile)
    reader.onload=(evnt)=>{
      let img=new Image();
      
      //console.log(this.fileData)
      img.src=evnt.target.result.toString()
      img.onload=()=>{
        if(img.width>300 || img.height>300){
          this.msgPic='Selected picture too big'
          ok=false
          this.realFile=null
          this.fileData=''
        }
        if(img.width<100 || img.height<100){
          this.msgPic='Selected picture too small'
          ok=false;
          this.realFile=null
          this.fileData=''
        }
        if(ok){
          this.msgPic=''
          this.realFile=curFile
          this.fileData=evnt.target.result.toString();
          this.curUser.image=this.fileData
          localStorage.setItem('user',JSON.stringify(this.curUser))
          this.userService.updateImage(this.curUser.username,this.fileData).subscribe((data)=>{
            //alert(JSON.stringify(data))
          })
        }
      }
    }
  }

  placeholder(){
    this.appTypeService.add(15,4000,'ophthalmologist','vision correction').subscribe((data)=>{

    })
  }

  saveChanges(){
    let newTypes:types[]=[]

    for(let ty of this.allTypes){
      if(ty.checked){
        let n=new types()
        n.duration=ty.duration
        n.price=ty.price
        n.name=ty.name
        newTypes.push(n)
      }
    }
    this.curUser.types=newTypes
    localStorage.setItem('user',JSON.stringify(this.curUser))
    this.doctorService.setTypes(newTypes,this.curUser.username).subscribe((data)=>{

    })
  }


  initCheck(){
    for(let ty of this.allTypes){
      ty.checked=false
      for(let docType of this.curUser.types){
        if(docType.name==ty.name) ty.checked=true
      }
    }
  }
}
