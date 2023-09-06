import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import IntervalManager from '../models/intervalManager';
import timeoutManager from '../models/timeoutManager';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  tm:timeoutManager

  constructor(private router:Router,private userService:UserService) { }

  allUsers:User[]=[]

  get_time_left(){
    return timeoutManager.time_left
  }

  ngOnInit(): void {
    this.tm=timeoutManager.getInstance(this.router)
    timeoutManager.clear_listeners()
    this.curUser=JSON.parse(localStorage.getItem('user'))
    if(!this.curUser) this.router.navigate([''])
    if(this.curUser.type!='user') this.logout() 
    timeoutManager.logoutOnInit()
    timeoutManager.setInterval()
    timeoutManager.add_listeners()

    this.userService.getAll().subscribe((data:User[])=>{
      this.allUsers=data
    })
  }


  curUser:User
  image:string=''
  msgPic:string=''

  file:ArrayBuffer
  realFile:File
  fileData:string=''

  updating:boolean=false

  msgUpdate:string=''


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

    for(let usr of this.allUsers){
      if(usr.username==this.curUser.username) continue
      if(usr.email==this.curUser.email){
        this.msgUpdate='That email is already taken'
        return
      }
    }

    this.updating=false;
    this.msgUpdate=''

    

    localStorage.setItem('user',JSON.stringify(this.curUser))
    this.userService.updateUserInfo(this.curUser.username,this.curUser.name,
      this.curUser.surname,this.curUser.phone,this.curUser.email,this.curUser.address).subscribe((data)=>{
        
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

  pass(){
    this.router.navigate(['userChangePassword'])
  }

}
