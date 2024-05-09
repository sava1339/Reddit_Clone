import { ApiError } from "../apiError/apiError";
const {Post} = require('../models/models');
import {Request, Response, NextFunction} from 'express';
import { filesRequest } from "../types/types";
const fs = require('fs');
const uuid = require('uuid');
const path = require('path');

class PostController{
    async create(req:Request,res:Response,next:NextFunction){
        try {
            const {userId,communityId,tittle,description} = req.body;
            const files = (req as filesRequest).files;
            !tittle || !description || !userId || !communityId && next(ApiError.bedRequest('Не все поля заполнены!'));
            const dataLink = uuid.v4();
            const dataLinkPath = path.resolve(__dirname,'..','static','PostDataFolder',dataLink);
            const dataLinkImagePath = dataLinkPath + '\\' + 'media';

            if (!fs.existsSync(dataLinkPath)) {
                fs.mkdirSync(dataLinkPath);
                fs.mkdirSync(dataLinkImagePath);
            }
            fs.writeFileSync((dataLinkPath + '\\' + 'tittle') + '.txt', tittle);
            fs.writeFileSync((dataLinkPath + '\\' + 'description') + '.txt', description);
            for(let i = 0;i < files.lenght;i++){
                await files[i].mv((dataLinkImagePath + '\\' + String(i)));
            }
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