import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import timeoutManager from '../models/timeoutManager';
import { Router } from '@angular/router';
import { AppTypeService } from '../services/app-type.service';
import requests from '../models/requests';

@Component({
  selector: 'app-register-doctor',
  templateUrl: './register-doctor.component.html',
  styleUrls: ['./register-doctor.component.css']
})
export class RegisterDoctorComponent implements OnInit {

  constructor(private doctorService:DoctorService,private router:Router,private appTypeService:AppTypeService) { }

  allTypes:requests[]=[]
  allSpec:string[]=[]
  ngOnInit(): void {
    this.appTypeService.get().subscribe((data:requests[])=>{
      this.allTypes=data

      for(let typ of this.allTypes){
        if(this.allSpec.includes(typ.spec))continue
        this.allSpec.push(typ.spec)
        this.spec=this.allSpec[0]
      }
    })
  }

  
  username:string=''
  password:string=''
  phone:string=''
  mail:string=''
  name:string=''
  lastname:string=''
  image:string=''

  address:string=''
  maticniBroj:string
  opis:string

  file:ArrayBuffer
  realFile:File
  fileData:string=''

  errorPic:boolean=false
  msgPic:string

  errorInfo:boolean
  msgInfo:string

  uploadFile(event){
    let curFile=event.target.files[0]
    //this.realFile=curFile
    let reader=new FileReader();
    console.log(curFile.type)
    if(!['image/jpeg','image/png'].includes(curFile.type)){
      this.errorPic=true
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
          this.errorPic=true;
          this.msgPic='Selected picture too big'
          ok=false
          this.realFile=null
          this.fileData=''
        }
        if(img.width<100 || img.height<100){
          this.errorPic=true;
          this.msgPic='Selected picture too small'
          ok=false;
          this.realFile=null
          this.fileData=''
        }
        if(ok){
          this.errorPic=false
          this.msgPic=''
          this.realFile=curFile
          this.fileData=evnt.target.result.toString();
        }
      }
    }
  }

  register(){
    
    if(this.username==''){this.errorInfo=true;this.msgInfo='The input fields below cannot be empty.';return}
    if(this.password==''){this.errorInfo=true;this.msgInfo='The input fields below cannot be empty.';return}
    if(this.phone==''){this.errorInfo=true;this.msgInfo='The input fields below cannot be empty.';return}
    if(this.mail==''){this.errorInfo=true;this.msgInfo='The input fields below cannot be empty.';return}
    
    const re=new RegExp(/^[a-zA-Z](?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).*$/,'g');
    const mailReg=new RegExp(/^.+@.+\..+$/,'g')
    const phoneReg=new RegExp(/^(\d{10})$|(\d{3}-\d{3}-\d{4})$|(\d{3}\/\d{3}\/\d{4})$/)
  
    if(!mailReg.test(this.mail)){
      this.msgInfo='email address is not valid'
      this.errorInfo=true;
      return
    }
    if(!phoneReg.test(this.phone)){
      this.msgInfo='Phone number is not valid'
      this.errorInfo=true;
      return
    }

    if(!re.test(this.password)){
      this.msgInfo='Password must contain at least one number, special character and one uppercase letter'
      this.errorInfo
      return
    }
    if(this.password.length>12){
      this.msgInfo='Password must not be longer than 12 characters'
      this.errorInfo=true
      return
    }
    if(this.password.length<8){
      this.msgInfo='Password must be longer than 8 characters'
      this.errorInfo=true
      return
    }
    let prevChar=this.password[0]
    for(let i=1;i<this.password.length;i++){
      if(prevChar==this.password[i]){
        this.msgInfo='You cannot have subsequent letters be the same'
        return
      }
      prevChar=this.password[i]
    }
    
    if(this.name==''){this.errorInfo=true;this.msgInfo='The input fields below cannot be empty.';return}
    if(this.lastname==''){this.errorInfo=true;this.msgInfo='The input fields below cannot be empty.';return}
    this.doctorService.register(this.username,this.password,this.phone,this.mail,this.name,this.lastname,this.fileData,this.address,
      this.licence,this.spec,this.branch).subscribe((data)=>{
      let status=JSON.parse(JSON.stringify(data)).status
      console.log(JSON.parse(JSON.stringify(data)).status)
      if(status=='username taken') {this.errorInfo=true;this.msgInfo='That username is already taken.';return}
      if(status=='mail taken') {this.errorInfo=true;this.msgInfo='That email is already in use.';return}
      this.msgInfo='Doctor added'
    })
    
      
  }

  licence:string
  spec:string
  branch:string

  logout(){
    localStorage.clear()
    timeoutManager.clear_listeners()
    this.router.navigate([''])
  }
}
