import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http:HttpClient) { }

  addNew(idUser:string,date:number,text:string){
    let data={
      idUser:idUser,
      date:date,
      text:text
    }
    return this.http.post('http://localhost:4000/notifications/addNew',data)
  }

  update(_id:string){
    return this.http.post('http://localhost:4000/notifications/update',{id:_id})
  }

  getAll(id:string){
    return this.http.post('http://localhost:4000/notifications/getAll',{id:id})
  }
}
