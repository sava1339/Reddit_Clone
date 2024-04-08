import { ApiError } from "../apiError/apiError";
const {Saved} = require('../models/models');
import {Request, Response, NextFunction} from 'express';

class SavedController{
    async create(req:Request,res:Response,next:NextFunction){
        try {
            const {userId} = req.body;
            !userId && next(ApiError.bedRequest('Не все поля заполнены!'));
            const saved = await Saved.create({userId});
            return res.json(saved);
        } catch (e) {
            next(ApiError.internal('Непредвидимая ошибка'));
        }
    }
    async delete(req:any,res:any,next:any){
        try {
            const {id} = req.params;
            !id && next(ApiError.bedRequest('Не введен айди!'));
            const saved = await Saved.destroy({where:{id}});
            return res.json(saved);
        } catch (e) {
            next(ApiError.internal('Непредвидимая ошибка'));
        }
    }
    async findByUser(req:any,res:any,next:any){
        try {
            const {userId} = req.params;
            !userId && next(ApiError.bedRequest('Не введен айди!'));
            const saved = Saved.findOne({where:{userId}});
            return res.json(saved);
        } catch (e) {
            next(ApiError.internal('Непредвидимая ошибка'));
        }
    }
}
module.exports = new SavedController();
export{};