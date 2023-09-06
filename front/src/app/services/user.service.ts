import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  register(username:string,password:string,number:string,mail:string,name:string,surname:string,image:string,address:string){
    
    const data={
      username:username,
      password:password,
      phone:number,
      mail:mail,
      name:name,
      surname:surname,
      image:image,
      admin:false,
      address:address
    }
    return this.http.post('http://localhost:4000/users/register',data)
  }

  login(username:string,password:string,isAdmin:boolean){
    const data={
      username:username,
      password:password,
      admin:isAdmin
    }

    return this.http.post('http://localhost:4000/users/login',data)
  }

  sendMail(mail:string){
    return this.http.post('http://localhost:4000/users/sendMail',{mail:mail})
  }

  resetPassword(password:string,token:string){
    return this.http.post('http://localhost:4000/users/resetPassword',{password:password,token:token})
  }

  updateImage(username:string,image:string){
    const data={
      username:username,
      image:image
    }

    return this.http.post('http://localhost:4000/users/updateImage',data);
  }

  updateUserInfo(username:string,name:string,lastName:string,number:string,email:string,address:string){
    const data={
      username:username,
      name:name,
      lastName:lastName,
      number:number,
      email:email,
      address:address
    }

    return this.http.post('http://localhost:4000/users/updateUserInfo',data)
  }

  get(username:string){
    return this.http.post('http://localhost:4000/users/get',{username:username})
  }

  makePdf(id:string,date:string,email:string,dijagnoza:string,therapy:string,nextAppDate:string,reason:string,doctorName:string,
    doctorLastName:string,spec:string,hours:number,minutes:number){
    let data={
      id:id,
      date:date,
      email:email,
      dijagnoza:dijagnoza,
      therapy:therapy,
      nextAppDate:nextAppDate,
      reason:reason,
      doctorName:doctorName,
      doctorLastName:doctorLastName,
      spec:spec,
      hours:hours,
      minutes:minutes
    }
    return this.http.post('http://localhost:4000/pdfs/makeNew',data)
  }

  makeAll(id:string,email:string){
    let data={
      id:id,
      email:email
    }

    return this.http.post('http://localhost:4000/pdfs/makeAll',data)
  }

  getAll(){
    return this.http.get('http://localhost:4000/users/getAll')
  }

  delete(id:string){
    return this.http.post('http://localhost:4000/users/delete',{id:id})
  }

  updateIsValid(valid:number,id:string){
    return this.http.post('http://localhost:4000/users/updateIsValid',{valid:valid,id:id})
  }

  updatePassword(id:string,password:string){
    let data={
      id:id,
      password:password
    }
    return this.http.post('http://localhost:4000/users/updatePassword',data)
  }
}
