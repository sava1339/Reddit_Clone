import { ApiError } from "../apiError/apiError";
const {Comment} = require('../models/models');
import {Request, Response, NextFunction} from 'express';
import { filesRequest } from "../types/types";
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

class CommentController{
    async create(req:Request,res:Response,next:NextFunction){
        try {
            const {userId,communityId,content} = req.body;
            const files = (req as filesRequest).files;
            !userId || !communityId || !content && next(ApiError.bedRequest('Не все поля заполнены!'));

            const dataLink = uuid.v4();
            const dataLinkPath = path.resolve(__dirname,'..','static','CommentDataFolder',dataLink);
            const dataLinkImagePath = dataLinkPath + '\\' + 'media';

            if (!fs.existsSync(dataLinkPath)) {
                fs.mkdirSync(dataLinkPath);
                fs.mkdirSync(dataLinkImagePath);
            }
            fs.writeFileSync((dataLinkPath + '\\' + 'content') + '.txt', content);
            for(let i = 0;i < files.lenght;i++){
                await files[i].mv((dataLinkImagePath + '\\' + String(i)));
            }
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