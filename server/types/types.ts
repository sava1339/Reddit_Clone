import {Request} from 'express';
export interface userRequest extends Request{
    user:{
        id:number,
        karma:number,
        avatarLink:string,
        password:string,
        login:string,
        username:string
    }
}
export interface filesRequest extends Request{
    files:any
}