import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http:HttpClient) { }

  add(name:string,spec:string,duration:number,price:number){
    let data={
      name:name,
      spec:spec,
      duration:duration,
      price:price
    }

    return this.http.post('http://localhost:4000/requests/add',data)
  }

  delete(id:string){
    return this.http.post('http://localhost:4000/requests/delete',{id:id})
  }

  getAll(){
    return this.http.get('http://localhost:4000/requests/getAll')
  }
}
