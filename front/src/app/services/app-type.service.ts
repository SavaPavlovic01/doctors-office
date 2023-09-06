import { HttpClient } from '@angular/common/http';
import { HtmlParser } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppTypeService {

  constructor(private http:HttpClient) { }

  add(duration:number,price:number,spec:string,name:string){
    let data={
      duration:duration,
      price:price,
      spec:spec,
      name:name
    }
    return this.http.post('http://localhost:4000/appTypes/add',data)
  }

  getAll(spec:string){
    let data={
      name:spec
    }
    return this.http.post('http://localhost:4000/appTypes/getAll',data)
  }

  get(){
    return this.http.get('http://localhost:4000/appTypes/get')
  }

  delete(id:string){
    return this.http.post('http://localhost:4000/appTypes/delete',{id:id})
  }

  update(id:string,price:number,duration:number){
    return this.http.post('http://localhost:4000/appTypes/update',{id:id,price:price,duration:duration})
  }

}
