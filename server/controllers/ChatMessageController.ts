import { ApiError } from "../apiError/apiError";
import {Request, Response, NextFunction} from 'express';
import { filesRequest } from "../types/types";
const fs = require('fs');
const uuid = require('uuid');
const path = require('path');

const {ChatMessage} = require('../models/models');
class ChatMessageController{
    async create(req:Request,res:Response,next:NextFunction){
        try {
            const {userId, chatGroupId, content} = req.body;
            const files = (req as filesRequest).files;
            !userId || !chatGroupId || !content && next(ApiError.bedRequest('Не все поля заполнены!'));
            const dataLink = uuid.v4();
            const dataLinkPath = path.resolve(__dirname,'..','static','ChatMessageDataFolder',dataLink);
            const dataLinkImagePath = dataLinkPath + '\\' + 'media';

            if (!fs.existsSync(dataLinkPath)) {
                fs.mkdirSync(dataLinkPath);
                fs.mkdirSync(dataLinkImagePath);
            }

            fs.writeFileSync((dataLinkPath + '\\' + 'content') + '.txt', content);
            for(let i = 0;i < files.lenght;i++){
                await files[i].mv((dataLinkImagePath + '\\' + String(i)));
            }
            const chatMessage = await  ChatMessage.create({userId,chatGroupId,dataLink});
            return res.json(chatMessage);
        } catch (e) {
            next(ApiError.internal('Непредвидимая ошибка'));
        }
    }
    async delete(req:any,res:any,next:any){
        try {
            const {id} = req.params;
            !id && next(ApiError.bedRequest('Не введен айди'));
            const chatMessage = await ChatMessage.destroy({where:{id}});
            return res.json(chatMessage);
        } catch (e) {
            next(ApiError.internal('Непредвидимая ошибка'));
        }

    }
    async findAll(req:any,res:any,next:any){
        try {
            const {chatGroupId} = req.params;
            let {limit,page} = req.query;
            limit = limit || 100;
            page = page || 1;
            const offset = page*limit-limit;
            !chatGroupId && next(ApiError.bedRequest('Не введен айди'));
            const chatMessage = await ChatMessage.findAndCountAll({where:{chatGroupId},limit,offset});
            return res.json(chatMessage);
        } catch (e) {
            next(ApiError.internal('Непредвидимая ошибка'));
        }

    }
}
module.exports = new ChatMessageController();
export{};