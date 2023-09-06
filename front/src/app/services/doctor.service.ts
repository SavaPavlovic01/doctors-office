import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import types from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http:HttpClient) { }

  register(username:string,password:string,number:string,mail:string,name:string,surname:string,image:string,address:string,
    licence:string,spec:string,branch:string){
    
    const data={
      username:username,
      password:password,
      phone:number,
      mail:mail,
      name:name,
      surname:surname,
      image:image,
      admin:false,
      address:address,
      licence:licence,
      spec:spec,
      branch:branch

    }
    return this.http.post('http://localhost:4000/doctors/register',data)
  }

  update(username:string,number:string,name:string,surname:string,address:string,
    licence:string,spec:string){

      let data={
        username:username,
        phone:number,
        name:name,
        surname:surname,
        address:address,
        licence:licence,
        spec:spec
      }

      return this.http.post('http://localhost:4000/doctors/update',data)

  }

  getAll(){
    return this.http.get('http://localhost:4000/doctors/getAll')
  }

  setTypes(ty:types[],username:string){
    let data={
      username:username,
      types:ty
    }
    return this.http.post('http://localhost:4000/doctors/setTypes',data)
  }

  setSpec(username:string,spec:string){
    let data={
      username:username,
      spec:spec
    }

    return this.http.post('http://localhost:4000/doctors/setSpec',data)
  }
}
