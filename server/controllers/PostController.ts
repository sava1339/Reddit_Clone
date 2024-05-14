import { ApiError } from "../apiError/apiError";
const {Post} = require('../models/models');
import {Request, Response, NextFunction} from 'express';
import { filesRequest, userRequest } from "../types/types";
const fs = require('fs');
const uuid = require('uuid');
const path = require('path');

class PostController{
    async create(req:Request,res:Response,next:NextFunction){
        try {
            const {communityId,title,description} = req.body;
            const files = (req as filesRequest).files;
            !title || !description || !communityId && next(ApiError.bedRequest('Не все поля заполнены!'));
            const dataLink = uuid.v4();
            const dataLinkPath = path.resolve(__dirname,'..','static','PostDataFolder',dataLink);
            const dataLinkImagePath = dataLinkPath + '\\' + 'media';

            if (!fs.existsSync(dataLinkPath)) {
                fs.mkdirSync(dataLinkPath);
                fs.mkdirSync(dataLinkImagePath);
            }
            fs.writeFileSync((dataLinkPath + '\\' + 'tittle') + '.txt', title);
            fs.writeFileSync((dataLinkPath + '\\' + 'description') + '.txt', description);
            for(let key in files){
                await files[key].mv((dataLinkImagePath + '\\' + String(key) + ".png"));
            }
            const post = await  Post.create({dataLink,userId:(req as userRequest).user.id,communityId,karma:1});
            return res.json(post);
        } catch (e) {
            console.error(e);
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
            const post = await Post.findAll({where:{communityId}});
            return res.json(post);
        } catch (e) {
            next(ApiError.internal('Непредвидимая ошибка'));
        }

    }
}
module.exports = new PostController();
export{}