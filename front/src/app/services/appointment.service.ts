import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http:HttpClient) { }

  add(idDoctor:string,idPatient:string,date:string,hours:number,minutes:number,price:number,duration:number,type:string){
    let data={
      idDoctor:idDoctor,
      idPatient:idPatient,
      date:date,
      hours:hours,
      minutes:minutes,
      price:price,
      duration:duration,
      type:type
    }

    return this.http.post('http://localhost:4000/appointments/add',data)
  }

  getAll(id:string){
    return this.http.post('http://localhost:4000/appointments/getAll',{id:id})
  }

  addReport(id:string,dijagnoza:string,therapy:string,reason:string,nextAppDate:string){
    let data={
      id:id,
      dijagnoza:dijagnoza,
      therapy:therapy,
      reason:reason,
      nextAppDate:nextAppDate
    }
    return this.http.post('http://localhost:4000/appointments/addReport',data)
  }

  cancel(id:string){
    let data={id:id}
    return this.http.post('http://localhost:4000/appointments/cancel',data)
  }
}
