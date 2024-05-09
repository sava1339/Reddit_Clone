import path from "path";
import { ApiError } from "../apiError/apiError";
const {ChatGroup} = require('../models/models');
import {Request, Response, NextFunction} from 'express';
import { filesRequest } from "../types/types";
const uuid = require('uuid');
const fs = require('fs');

class ChatGroupController{
    async create(req:Request,res:Response,next:NextFunction){
        try {
            let {name,description,chatGroupUser,userId} = req.body;
            const {groupAvatar} = (req as filesRequest).files;

            if(typeof userId == "string"){
                userId = +userId;
            }
            !name || !groupAvatar || !description || !chatGroupUser && next(ApiError.bedRequest('Не все поля заполнены!'));
            const dataLink = uuid.v4();

            const dataLinkPath = path.resolve(__dirname,'..','static','ChatGroupDataFolder',dataLink);

            if (!fs.existsSync(dataLinkPath)) {
                fs.mkdirSync(dataLinkPath);
            }
            fs.writeFileSync((dataLinkPath + '\\' + 'name') + '.txt', name);
            fs.writeFileSync((dataLinkPath + '\\' + 'description') + '.txt', description);
            if(groupAvatar){
                let imageGroupAvatarName = 'GroupAvatar.png';
                await groupAvatar.mv((dataLinkPath + '\\' + imageGroupAvatarName));
            }

            const chatGroup = await ChatGroup.create({dataLink,chatGroupUser,userId});
            return res.json(chatGroup);
        } catch (e) {
            next(ApiError.bedRequest('Непредвидимая ошибка!'));
        }

    }
    async delete(req:any,res:any,next:any){
        try {
            const {id} = req.params;
            !id && next(ApiError.bedRequest('Не введен айди!'));
            const chatGroup = await ChatGroup.destroy({where:{id}});
            return res.json(chatGroup);
        } catch (e) {
            next(ApiError.bedRequest('Непредвидимая ошибка!'));
        }

    }
    async findOne(req:any,res:any,next:any){
        try {
            const {id} = req.params;
            !id && next(ApiError.bedRequest('Не введен айди!'));
            const chatGroup = await ChatGroup.findOne({where:{id}});
            return res.json(chatGroup);
        } catch (e) {
            next(ApiError.bedRequest('Непредвидимая ошибка!'));
        }

    }
}
module.exports = new ChatGroupController();
export{}