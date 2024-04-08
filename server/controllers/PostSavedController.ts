import { ApiError } from "../apiError/apiError";
const {PostSaved} = require('../models/models');
import {Request, Response, NextFunction} from 'express';

class PostSavedController{
    async create(req:Request,res:Response,next:NextFunction){
        try {
            const {postId,savedId} = req.body;
            !postId || !savedId && next(ApiError.bedRequest('Не все поля заполнены!')); 
            const postSaved = await PostSaved.create({postId,savedId});
            return res.json(postSaved);
        } catch (e) {
            next(ApiError.internal('Непредвидимая ошибка'));
        }
    }
    async delete(req:any,res:any,next:any){
        try {
            const {id} = req.params;
            !id && next(ApiError.bedRequest('Не введен айди!'));
            const postSaved = await PostSaved.destroy({where:{id}});
            return res.json(postSaved);
        } catch (e) {
            next(ApiError.internal('Непредвидимая ошибка'));
        }
    }
    async findAll(req:any,res:any,next:any){
        try {
            const {savedId} = req.params;
            !savedId && next(ApiError.bedRequest('Не введен айди!'));
            const postSaved = await PostSaved.findAll({where:{savedId}});
            return res.json(postSaved);
        } catch (e) {
            next(ApiError.internal('Непредвидимая ошибка'));
        }
    }
}
module.exports = new PostSavedController();
export{}