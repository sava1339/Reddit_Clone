import { ApiError } from "../apiError/apiError";
import {Request, Response, NextFunction} from 'express';

const {ChatFollower} = require('../models/models');

class ChatFollowerController{
    async create(req:Request,res:Response,next:NextFunction){
        try {
            const {userId,chatGroupId} = req.body;
            !userId || !chatGroupId && next(ApiError.bedRequest('Не все поля заполнены!'))
            const chatFollower = await ChatFollower.create({userId,chatGroupId});
            return res.json(chatFollower);
        } catch (e) {
            next(ApiError.internal('Непредвидимая ошибка!'));
        }
    }
    async delete(req:any,res:any,next:any){
        try {
            const {id} = req.params;
            !id && next(ApiError.bedRequest('Не введен айди'));
            const chatFollower = await ChatFollower.destroy({where:{id}});
            return res.json(chatFollower);
        } catch (e) {
            next(ApiError.internal('Непредвидимая ошибка!'));
        }
    }
    async findAll(req:any,res:any,next:any){
        try {
            const {userId} = req.params;
            !userId && next(ApiError.bedRequest('Не введен айди'));
            const chatFollower = await ChatFollower.findAll({where:{userId}});
            return res.json(chatFollower);
        } catch (e) {
            next(ApiError.internal('Непредвидимая ошибка!'));
        }
    }
}
module.exports = new ChatFollowerController();
export{}