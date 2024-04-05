export class ApiError extends Error{
    constructor(name:any,message:string){
        super();
        this.name = name;
        this.message = message;
    }
    static bedRequest(message:string){
        return new ApiError(400,message);
    }
    static internal(message:string){
        return new ApiError(500,message);
    }
}