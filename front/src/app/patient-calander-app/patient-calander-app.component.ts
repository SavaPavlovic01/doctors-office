import { Component, OnInit } from '@angular/core';
import timeoutManager from '../models/timeoutManager';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Appointment } from '../models/appointment';
import { AppointmentService } from '../services/appointment.service';
import Week from '../models/week';
import { NotificationService } from '../services/notification.service';
import requests from '../models/requests';
import { AppTypeService } from '../services/app-type.service';
import types from '../models/types';

@Component({
  selector: 'app-patient-calander-app',
  templateUrl: './patient-calander-app.component.html',
  styleUrls: ['./patient-calander-app.component.css']
})
export class PatientCalanderAppComponent implements OnInit {

  constructor(private router:Router,private appointmentService:AppointmentService,
    private notificationService:NotificationService,private appTypeService:AppTypeService) { }

  tm:timeoutManager
  curDoctor:User
  curUser:User
  allAppointments:Appointment[]
  curTable:Week[]=[]
  newAppointment:Appointment=null
  drag:boolean=false;

  oldHours:number
  oldMinutes:number
  oldDate:string

  overlap:boolean=false;

  allTypes:requests[]=[]
  //sel:requests

  sel:types
  ngOnInit(): void {

    this.tm=timeoutManager.getInstance(this.router)
    this.curDoctor=JSON.parse(localStorage.getItem('doctor'));
    this.curUser=JSON.parse(localStorage.getItem('user'))
    if(!this.curUser) this.router.navigate([''])
    if(this.curUser.type!='user') this.logout()
    this.appointmentService.getAll(this.curDoctor._id).subscribe((data:Appointment[])=>{
      this.allAppointments=data
      this.changeDay()
      this.clearTable()
      this.updateTable()
    })

    this.appTypeService.getAll(this.curDoctor.spec).subscribe((data:requests[])=>{
      this.allTypes=data
      this.sel=this.curDoctor.types[0]
    })
    timeoutManager.logoutOnInit()
    timeoutManager.setInterval()
    timeoutManager.add_listeners()

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
    table.addEventListener('mousedown',(ev)=>{
      let cell=<HTMLTableCellElement>ev.target
      
      let row=<HTMLTableRowElement>cell.parentElement
      console.log(row.rowIndex)
      console.log(cell.cellIndex)
      if(row.rowIndex===undefined || cell.cellIndex===undefined) return
      this.mouseDown(row.rowIndex,cell.cellIndex)
    })

    table.addEventListener('mouseup',(ev)=>{
      let cell=<HTMLTableCellElement>ev.target
      
      let row=<HTMLTableRowElement>cell.parentElement
      //console.log(row.rowIndex)
      //console.log(cell.cellIndex)
      //this.mouseMove(row.rowIndex,cell.cellIndex)
      this.mouseUp(row.rowIndex,cell.cellIndex)
    })

    table.addEventListener('mousemove',(ev)=>{
      let cell=<HTMLTableCellElement>ev.target
      
      let row=<HTMLTableRowElement>cell.parentElement
      //console.log(row.rowIndex)
      //console.log(cell.cellIndex)
      this.mouseMove(row.rowIndex,cell.cellIndex)
    })
    table.addEventListener('mouseleave',(ev)=>{
      this.drag=false
      if(this.overlap){
        this.newAppointment.date=this.oldDate
        this.newAppointment.hours=this.oldHours
        this.newAppointment.minutes=this.oldMinutes
        this.overlap=false;
        this.clearTable()
        this.updateTable()
        console.log('overlap')
      }
    })
  }

  click(x:number,y:number){
    if(x==0||y==0) return
    if(this.sel==null) return
    if(this.newAppointment==null){
      this.newAppointment=new Appointment()
      this.newAppointment.duration=this.sel.duration
      let ok:boolean=true
      for(let i=0;i<this.newAppointment.duration/15;i++){
        try{

        
        switch(y){
          case 1:{
            if(this.curTable[x+i-1].monday==true) ok=false
            break
          }
          case 2:{
            if(this.curTable[x+i-1].tuesday==true) ok=false
            break
          }
          case 3:{
            if(this.curTable[x+i-1].wednesday==true) ok=false
            break
          }
          case 4:{
            if(this.curTable[x+i-1].thursday==true) ok=false
            break
          }
          case 5:{
            if(this.curTable[x+i-1].friday==true) ok=false
            break
          }
          case 6:{
            if(this.curTable[x+i-1].saturday==true) ok=false
            break
          }
          case 7:{
            if(this.curTable[x+i-1].sunday==true) ok=false
            break
          }
        }}catch(err){
          this.newAppointment=null
          return
        }

        if(!ok) break
      }

      if(!ok) {console.log('taken');this.newAppointment=null}
      else {
        this.newAppointment.date=new Date(this.weekStart.getTime()+(y-1)*24*60*60*1000).toISOString()
        this.newAppointment.hours=this.curTable[x-1].hours
        this.newAppointment.minutes=this.curTable[x-1].minutes

        if(Date.now()+2*60*60*1000>=(new Date(this.newAppointment.date).getTime()+this.newAppointment.hours*60*60*1000+this.newAppointment.minutes*60*1000)) {
          this.msg='invalid date'
          this.newAppointment=null
          return
        }

        this.newAppointment.idDoctor=this.curDoctor._id
        this.newAppointment.idPatient=this.curUser._id
        this.newAppointment.price=this.sel.price
        this.newAppointment.type=this.sel.name
        console.log(this.newAppointment)
        this.allAppointments.push(this.newAppointment);
        this.clearTable()
        this.updateTable()
      }
    }else{
      console.log('already added')
    }
  }

  mouseDown(x:number,y:number){
    if(this.newAppointment==null) return
    for(let i=0;i<this.newAppointment.duration/15;i++){
      let xAdded=(this.newAppointment.hours-8)*4+this.newAppointment.minutes/15+i+1
      let yAdded=new Date(this.newAppointment.date).getDay()
      if(yAdded==0) yAdded=7
      if(xAdded==x && yAdded==y) {
        this.drag=true;
        this.oldDate=this.newAppointment.date
        this.oldHours=this.newAppointment.hours
        this.oldMinutes=this.newAppointment.minutes
        this.overlap=false
      }
    }
  }

  mouseMove(x:number,y:number){
    if(!this.drag) return
    if(x==0 || y==0 ) return
    if(x===undefined || y===undefined) return
    let newDate=new Date(this.weekStart.getTime()+(y-1)*24*60*60*1000).toISOString()
    let newHours=this.curTable[x-1].hours
    let newMinutes=this.curTable[x-1].minutes
    if(newDate!=this.newAppointment.date || newHours!=this.newAppointment.hours || newMinutes!=this.newAppointment.minutes){
      
      
      let timeStart=(new Date(newDate).getTime())+newHours*60*60*1000+newMinutes*60*1000
      let timeEnd=timeStart+this.newAppointment.duration*60*1000//duration
      let ok=true
      for(let app of this.allAppointments){
        if(app==this.newAppointment) continue
        let timeStartApp=new Date(app.date).getTime()+app.hours*60*60*1000+app.minutes*60*1000
        let timeEndApp=timeStartApp+app.duration*60*1000
        if(new Date(app.date).getTime()!=new Date(newDate).getTime()) continue
      
        if(timeStart>=timeStartApp && timeStart<timeEndApp){
        
          ok=false
          break
        }
        if(timeEnd>timeStartApp && timeEnd<=timeEndApp){
        
          ok=false
          break
        }
        if(timeStart<=timeStartApp && timeEnd>=timeEndApp){
        
          ok=false
          break
        }
        if(timeStart>=timeStartApp && timeEnd<=timeEndApp){
        
          ok=false
          break
        }
    }
      if(!ok) this.overlap=true
      else this.overlap=false
      let index=(newHours-8)*4+newMinutes/15+this.newAppointment.duration/15-1
      if(index>=48) return
      
      
      //console.log(newDate,newHours,newMinutes)
      if(Date.now()+2*60*60*1000>(new Date(newDate).getTime()+newHours*60*60*1000+newMinutes*60*1000)) {
        this.msg='invalid date'
        return
      }

      this.newAppointment.date=new Date(this.weekStart.getTime()+(y-1)*24*60*60*1000).toISOString()
      this.newAppointment.hours=this.curTable[x-1].hours
      this.newAppointment.minutes=this.curTable[x-1].minutes
      this.clearTable()
      this.updateTable()
      
      
    }
  }

  mouseUp(x:number,y:number){
      this.drag=false
    
      
      
        if(this.overlap){
          this.newAppointment.date=this.oldDate
          this.newAppointment.hours=this.oldHours
          this.newAppointment.minutes=this.oldMinutes
          this.overlap=false;
          this.clearTable()
          this.updateTable()
          console.log('overlap')
        }
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
    let text='You have an appointment tomorrow '+this.newAppointment.date.slice(0,10)+' '+
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

  calcDate(inc:number){
    return new Date(this.weekStart.getTime()+inc*24*60*60*1000).getDate()
  }
}
