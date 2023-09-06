import { Component, OnInit } from '@angular/core';
import timeoutManager from '../models/timeoutManager';
import { Appointment } from '../models/appointment';
import Week from '../models/week';
import { Router } from '@angular/router';
import { AppointmentService } from '../services/appointment.service';
import { NotificationService } from '../services/notification.service';
import { User } from '../models/user';

@Component({
  selector: 'app-doctor-appointments',
  templateUrl: './doctor-appointments.component.html',
  styleUrls: ['./doctor-appointments.component.css']
})
export class DoctorAppointmentsComponent implements OnInit {

  constructor(private router:Router,private appointmentService:AppointmentService,
    private notificationService:NotificationService) { }

  tm:timeoutManager
  curDoctor:User
  curUser:User
  allAppointments:Appointment[]=[]
  curTable:Week[]=[]
  newAppointment:Appointment=null
  drag:boolean=false;
  curApp:Appointment=null
  oldHours:number
  oldMinutes:number
  oldDate:string

  overlap:boolean=false;

  isActive:boolean=false

  threeApps:Appointment[]=[]

  ngOnInit(): void {

    this.tm=timeoutManager.getInstance(this.router)
    this.curDoctor=JSON.parse(localStorage.getItem('user'));
    this.curUser=JSON.parse(localStorage.getItem('user'))
    if(!this.curUser) this.router.navigate([''])
    if(this.curUser.type!='doctor') this.logout()
    let hrs=8;
    let min=0;
    for(let i=0;i<48;i++){
      this.curTable.push(new Week())
      this.curTable[i].hours=hrs
      this.curTable[i].minutes=min;

      if(min==45){
        min=0
        hrs++;
      }else min+=15
    }

    this.appointmentService.getAll(this.curDoctor._id).subscribe((data:Appointment[])=>{
      this.allAppointments=data
      this.changeDay()
      this.clearTable()
      this.updateTable()
      this.sortApps()
      let i=0
      for(let app of this.allAppointments){
        console.log(app)
        if(!this.isInPast(app)) continue
        if(app.idDoctor==app.idPatient) continue
        if(i==3) break
        i++
        this.threeApps.push(app)
      }
      //console.log(this.day,this.weekStart,this.weekEnd)
    })
    timeoutManager.logoutOnInit()
    timeoutManager.setInterval()
    timeoutManager.add_listeners()

    
    

    //document.getElementById('calandar').addEventListener('change',this.changeDay)
    let table=<HTMLTableElement>document.getElementById('table')
    table.addEventListener('click',(ev)=>{
      let cell=<HTMLTableCellElement>ev.target
      
      let row=<HTMLTableRowElement>cell.parentElement
      console.log(row.rowIndex)
      console.log(cell.cellIndex)
      if(row.rowIndex===undefined || cell.cellIndex===undefined) return
      this.click(row.rowIndex,cell.cellIndex)
    })
    this.curApp=this.allAppointments[0]

    
    
  }

  updateThreeApps(){
    let i=0
    this.threeApps=[]
    for(let app of this.allAppointments){
      if(!this.isInPast(app)) continue
      if(app.idDoctor==app.idPatient) continue
      if(i==3) break
      i++
      this.threeApps.push(app)
    }
  }

  sortApps(){
    this.allAppointments.sort((a,b)=>{
      return new Date(a.date).getTime()+a.hours*60*60*1000+a.minutes*60*1000-new Date(b.date).getTime()-b.hours*60*60*1000-b.minutes*60*1000
    })
  }

  click(x:number,y:number){
    if(x==0||y==0) return
    let minutes=((x-1)%4)*15
    let hours=8+Math.floor((x-1)/4)

    let date=this.weekStart.getTime()+(y-1)*24*60*60*1000
    console.log(new Date(date).toISOString(),hours,minutes)

    for(let app of this.allAppointments){
      if(app.idDoctor==app.idPatient) continue
      if(new Date(app.date).getTime()==date){
        for(let i=0;i<app.duration/15;i++){
          let min=app.minutes+i*15
          let hrs=app.hours+Math.floor(min/60)
          if(min>=60) min=min%60
          //console.log('testing',hrs,min)
          if(min==minutes && hrs==hours) {
            console.log('click',hrs,min)
            this.curApp=app
            this.msg=''
            if(!this.isActive){
              document.getElementById('klik').click()
              this.isActive=true
            }
            return
          }
        }
        
      }
    }
    if(this.isActive) document.getElementById('klik').click()
    this.isActive=false
  }

  
  changeIsActive(){
    this.isActive=false
  }
  

  
  logout(){
    localStorage.clear()
    timeoutManager.clear_listeners()
    this.router.navigate([''])
  }

  get_time_left(){
    return timeoutManager.time_left
  }

  day:string=new Date(Date.now()+2*60*60*1000).toISOString().slice(0,10)
  weekStart:Date=new Date(Date.now())
  weekEnd:Date=new Date(Date.now()+6*24*60*60*1000)
  

  changeDay(){
    if(new Date(this.day).getDay()!=1){
      let sub=1
      let myDate=new Date(this.day)
      myDate.setTime
      while(myDate.getDay()!=1){ 
        myDate.setTime(myDate.getTime()-sub*24*60*60*1000)
      }
      this.weekStart=myDate
      this.weekEnd=new Date(this.weekStart.getTime()+6*24*60*60*1000)
    }else {
      this.weekStart=new Date(this.day)
      this.weekEnd=new Date(this.weekStart.getTime()+6*24*60*60*1000)
    }
  }

  updateTable(){
    for(let app of this.allAppointments){
      let appDate=new Date(app.date)
      if(appDate.getTime()>=this.weekStart.getTime() && appDate.getTime()<=this.weekEnd.getTime()){
        let index=(app.hours-8)*4+app.minutes/15
        switch(appDate.getDay()){
          case 0:{
            this.curTable[index].sundayText=app.type
            let i=0
            for(;i<app.duration/15;i++) this.curTable[index+i].sunday=true;
            //this.curTable[index+i].sundayLast=true;
            break
          }
          case 1:{
            this.curTable[index].mondayText=app.type
            let i=0
            for(;i<app.duration/15;i++) this.curTable[index+i].monday=true;
            //this.curTable[index+i].mondayLast=true;
            break
          }
          case 2:{
            this.curTable[index].tuesdayText=app.type
            let i=0
            for(;i<app.duration/15;i++) this.curTable[index+i].tuesday=true;
            //this.curTable[index+i].tuesdayLast=true;
            break
          }
          case 3:{
            this.curTable[index].wednesdayText=app.type
            let i=0
            for(;i<app.duration/15;i++) this.curTable[index+i].wednesday=true;
            //this.curTable[index+i].wednesdayLast=true;
            break
          }
          case 4:{
            this.curTable[index].thursdayText=app.type
            let i=0
            for(;i<app.duration/15;i++) this.curTable[index+i].thursday=true;
            //this.curTable[index+i].thursdayLast=true;
            break
          }
          case 5:{
            this.curTable[index].fridayText=app.type
            let i=0
            for(;i<app.duration/15;i++) this.curTable[index+i].friday=true;
            //this.curTable[index+i].fridayLast=true;
            break
          }
          case 6:{
            this.curTable[index].saturdayText=app.type
            let i=0;
            for(;i<app.duration/15;i++) this.curTable[index+i].saturday=true;
            //this.curTable[index+i].saturdayLast=true;
            break
          }
        }
      }
    }
  }


  updateAll(){
    this.changeDay()
    this.clearTable()
    this.updateTable()
  }

  clearTable(){
    for(let i of this.curTable){
      i.friday=false
      i.monday=false;
      i.tuesday=false;
      i.wednesday=false;
      i.thursday=false;
      i.sunday=false;
      i.saturday=false;

      i.mondayText=''
      i.tuesdayText=''
      i.wednesdayText=''
      i.thursdayText=''
      i.fridayText=''
      i.saturdayText=''
      i.sundayText=''

      i.fridayLast=false
      i.mondayLast=false;
      i.tuesdayLast=false;
      i.wednesdayLast=false;
      i.thursdayLast=false;
      i.sundayLast=false;
      i.saturdayLast=false;
    }
  }

  submit(){
    if(this.newAppointment==null){
      this.msg='No appointment added'
      return
    }

    let timeShown=new Date(this.newAppointment.date).getTime()+this.newAppointment.hours*60*60*1000+
      this.newAppointment.minutes*60*1000-1*24*60*60*1000
    let text='You have an appointment tomorrow '+this.newAppointment.date+' '+
      this.newAppointment.hours+':'+this.newAppointment.minutes
    this.notificationService.addNew(this.curUser._id,timeShown,text).subscribe((data)=>{
      
    })

    this.appointmentService.add(this.newAppointment.idDoctor,this.newAppointment.idPatient,this.newAppointment.date,
      this.newAppointment.hours,this.newAppointment.minutes,this.newAppointment.price,this.newAppointment.duration,
      this.newAppointment.type).subscribe((data)=>{
        this.newAppointment=null
    })
  }

  clear(){
    if(this.newAppointment==null) return
    this.allAppointments.pop()
    this.newAppointment=null
    this.clearTable()
    this.updateTable()
  }
  msg:string=''

  addZero(num:number){
    if(num<10) return '0'+num
    else return num
  }

  get_app_date(){
    if(this.curApp!=null) return (this.curApp.date.slice(0,10)+' '+this.curApp.hours+':'+this.curApp.minutes)
    else return ''
  }

  isinPast(){
    if(this.curApp==null) return false
    if(Date.now()+2*60*60*1000>=new Date(this.curApp.date).getTime()+this.curApp.hours*60*60*1000+this.curApp.minutes*60*1000) return false
    return true
  }

  isInPast(app:Appointment){
    if(app==null) return false
    if(Date.now()+2*60*60*1000>=new Date(app.date).getTime()+app.hours*60*60*1000+app.minutes*60*1000) return false
    return true
  }

  therapy:string=''
  dijagnoza:string=''
  nextAppDate:string=''
  reason:string=''

  addReport(){
    this.msg=''
    if(this.curApp.dijagnoza!=''){
      this.msg='Report already added'
      return
    }
    if(this.therapy=='' || this.dijagnoza=='' || this.nextAppDate=='' || this.reason==''){
      this.msg='Fill all fields'
      return
    }
    if(new Date(this.nextAppDate).getTime()<=Date.now()){
      this.msg='Invalid date'
      return
    }
    this.appointmentService.addReport(this.curApp._id,this.dijagnoza,this.therapy,this.reason,this.nextAppDate).subscribe((data)=>{
      this.curApp.dijagnoza=this.dijagnoza
      this.curApp.therapy=this.therapy
      this.curApp.nextAppDate=this.nextAppDate
      this.reason=this.reason

      this.dijagnoza=''
      this.therapy=''
      this.nextAppDate=''
      this.reason=''

      console.log(this.curApp.dijagnoza)
      document.getElementById('cc').click()
    })
  }

  cancelReason:string=''
  cancelThree(app:Appointment){
    if(this.isActive) {
      document.getElementById('klik').click()
      this.isActive=false
    }

    document.getElementById('cancer').click()
    this.curApp=app
  }

  cancel(){
    if(this.cancelReason==='') return
    this.appointmentService.cancel(this.curApp._id).subscribe((data)=>{
      let temp:Appointment[]=[]

      for(let app of this.allAppointments){
        if(app==this.curApp) continue
        else temp.push(app)
      }

      this.allAppointments=temp
      this.clearTable()
      this.updateTable()
      
      if(this.isActive==true) {
        document.getElementById('klik').click()
        this.isActive=false
      }
      
      

      this.notificationService.addNew(this.curApp.idPatient,0,'An appointment has been cancelled. Reason:'+this.cancelReason).subscribe((data)=>{
        this.cancelReason=''
        document.getElementById('cc25').click()
        this.updateThreeApps()
        this.curApp=null
      })
    })
  }

  karton(){
    localStorage.setItem('patient',JSON.stringify(this.curApp.idPatient))
    this.router.navigate(['doctorMedicalHistory'])
  }

  Karton(app:Appointment){
    localStorage.setItem('patient',JSON.stringify(app.idPatient))
    this.router.navigate(['doctorMedicalHistory'])
  }

}
