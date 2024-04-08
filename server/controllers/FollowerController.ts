import { ApiError } from "../apiError/apiError";
const {Follower} = require('../models/models');
import {Request, Response, NextFunction} from 'express';


class FollowerController{
    async create(req:Request,res:Response,next:NextFunction){
        try {
            const {communityId,userId} = req.body;
            !communityId || !userId && next(ApiError.bedRequest('Не все поля заполнены!'));
            const follower = await Follower.create({communityId,userId});
            return res.json(follower);
        } catch (e) {
            next(ApiError.internal('Непредвидимая ошибка'));
        }
    }
    async delete(req:any,res:any,next:any){
        try {
            const {id} = req.params;
            !id && next(ApiError.bedRequest('Не введен айди!'));
            const follower = await Follower.destroy({where:{id}});
            return res.json(follower);
        } catch (e) {
            next(ApiError.internal('Непредвидимая ошибка'));
        }
    }
    async findByUser(req:any,res:any,next:any){
        try {
            const {userId} = req.params;
            !userId && next(ApiError.bedRequest('Не введен айди!'));
            const follower = await Follower.findOne({where:{userId}});
            return res.json(follower);
        } catch (e) {
            next(ApiError.internal('Непредвидимая ошибка'));
        }
    }
}
module.exports = new FollowerController();
export{};