import { ApiError } from '../apiError/apiError';
const jwt = require('jsonwebtoken');

module.exports = (req:any,res:any,next:any) => {
    req.method === "OPTIONS" && next();

    try {
        const token = req.headers.authorization;
        if(!token){
            return res.status(401).json({message:"Не авторизирован"});
        }

        jwt.verify(token,process.env.SECRET_KEY,(err:any,decoded:any)=>{
            if(err){
                return res.status(401).json({message:"Не авторизирован"});
            }
            req.user = decoded;
            next();
        })
    } catch (e) {
        return res.status(401).json({message:"Не авторизирован"});
    }
}