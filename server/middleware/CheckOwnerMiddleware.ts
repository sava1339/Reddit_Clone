import { ApiError } from "../apiError/apiError";
const {Community} = require('../models/models');

module.exports = async(req:any,res:any,next:any)=>{
    req.method === "OPTIONS" && next();
    try {
        const {id} = req.params;
        if(id != req.user.id){
            return res.status(401).json({message: 'Не подтверженн создатель сообщества!'});
        }
        next();
    } catch (e) {
        return res.status(401).json({message: 'Не подтверженн создатель сообщества!'});
    }
}