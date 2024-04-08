import { ApiError } from "../apiError/apiError";
const {Comment} = require('../models/models');
import {Request, Response, NextFunction} from 'express';

class CommentController{
    async create(req:Request,res:Response,next:NextFunction){
        try {
            const {userId,communityId,dataLink} = req.body;
            !userId || !communityId || !dataLink && next(ApiError.bedRequest('Не все поля заполнены!'));
            const comment = await Comment.create({userId,communityId,dataLink});
            return res.json({comment});
        } catch (e) {
            next(ApiError.internal('Непредвидимая ошибка'))
        }
    }
    async delete(req:any,res:any,next:any){
        try {
            const {id} = req.params;
            !id && next(ApiError.bedRequest('Не введён айди!'));
            const comment = await Comment.destroy({where:{id}});
            return res.json(comment);
        } catch (e) {
            next(ApiError.internal('Непредвидимая ошибка'))
        }
    }
    async findAll(req:any,res:any,next:any){
        try {
            let {limit,page} = req.query;
            page = page || 1;
            limit = limit || 10;
            const offset = page*limit-limit;
            const comment = await Comment.findAndCountAll({limit,offset});
            return res.json(comment);
        } catch (e) {
            next(ApiError.internal('Непредвидимая ошибка'))
        }
    }
}
module.exports = new CommentController();
export{};