import { ApiError } from "../apiError/apiError";
const {Post} = require('../models/models');
import {Request, Response, NextFunction} from 'express';

class PostController{
    async create(req:Request,res:Response,next:NextFunction){
        try {
            const {dataLink,userId,communityId} = req.body;
            !dataLink || !userId || !communityId && next(ApiError.bedRequest('Не все поля заполнены!'));
            const post = await  Post.create({dataLink,userId,communityId});
            return res.json(post);
        } catch (e) {
            next(ApiError.internal('Непредвидимая ошибка'));
        }
    }
    async delete(req:any,res:any,next:any){
        try {
            const {id} = req.params;
            !id && next(ApiError.bedRequest('Не введен айди'));
            const post = await Post.destroy({where:{id}});
            return res.json(post);
        } catch (e) {
            next(ApiError.internal('Непредвидимая ошибка'));
        }

    }
    async findAll(req:any,res:any,next:any){
        try {
            const {communityId} = req.params;
            !communityId && next(ApiError.bedRequest('Не введен айди'));
            const post = await Post.findOne({where:{communityId}});
            return res.json(post);
        } catch (e) {
            next(ApiError.internal('Непредвидимая ошибка'));
        }

    }
}
module.exports = new PostController();
export{}