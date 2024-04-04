export class ApiError extends Error{
    constructor(name:any,message:string){
        super();
        this.name = name;
        this.message = message;
    }
    static bedRequest(message:string){
        return new ApiError(404,message);
    }
}