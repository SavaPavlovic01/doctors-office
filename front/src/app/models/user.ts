import types from "./types"

export class User{
    name:string
    surname:string
    username:string
    email:string
    type:string
    licence:string
    address:string
    phone:string
    image:string  
    spec:string
    branch:string
    password:string
    last_active:number
    _id:string
    types:types[]=[]
    isValid:number
    admin:boolean
}