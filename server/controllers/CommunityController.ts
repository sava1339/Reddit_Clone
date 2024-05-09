import { ApiError } from "../apiError/apiError";
const {Community} = require('../models/models');
const fs = require('fs');
const uuid = require('uuid');
const path = require('path');
import {Request, Response, NextFunction} from 'express';
import { filesRequest, userRequest } from "../types/types";

class CommunityController{
    async create(req:Request,res:Response,next:NextFunction){
        try {
            const {userCommunity,description} = req.body;
            const {avatarImage,headerImage} = (req as filesRequest).files;

            !description || !userCommunity || !(req as userRequest).user.id && next(ApiError.bedRequest('Не все поля заполнены!'));

            const dataLink = uuid.v4();
            const dataLinkPath = path.resolve(__dirname,'..','static','CommunityDataFolder',dataLink);
            const dataLinkImagePath = dataLinkPath + '\\' + 'images';

            if (!fs.existsSync(dataLinkPath)) {
                fs.mkdirSync(dataLinkPath);
                fs.mkdirSync(dataLinkImagePath);
            }

            fs.writeFileSync((dataLinkPath + '\\' + 'description') + '.txt', description);
            if(avatarImage){
                let imageAvatarName = 'Avatar.png';
                await avatarImage.mv((dataLinkImagePath + '\\' + imageAvatarName));
            }
            if(headerImage){
                let imageHeaderName = "Header.png";
                await headerImage.mv((dataLinkImagePath + '\\' + imageHeaderName));
            }
            const userCommunityBool = userCommunity === "true" ? true : false

            const community = await Community.create({dataLink,userCommunity: userCommunityBool,userId:(req as userRequest).user.id});
            return res.json(community);
        } catch (e) {
            next(ApiError.internal('Непредвидимая ошибка'));
        }
    }
    async delete(req:any,res:any,next:any){
        try {
            const {id} = req.params;
            !id && next(ApiError.bedRequest('Не введен айди!'));
            const community = await Community.findOne({where:{id}});
            if(community.userId != req.user.id){
                return res.status(401).json({message: 'Не подтверженн создатель сообщества!'});;
            }
            const dataLinkPath = path.resolve(__dirname,'..','static','CommunityDataFolder',community.dataLink);
            await fs.rmSync(dataLinkPath,{ recursive: true, force: true });
            const communityDelete = await Community.destroy({where:{id}});
            return res.json(communityDelete);
        } catch (e) {
            next(ApiError.internal('Непредвидимая ошибка'));
        }
    }
    async findOne(req:any,res:any,next:any){
        try {
            const {id} = req.params;
            console.log(id);
            !id && next(ApiError.bedRequest('Не введен айди!'));
            const community = await Community.findOne({where:{id}});
            return res.json(community);
        } catch (e) {
            next(ApiError.internal('Непредвидимая ошибка'));
        }
    }
    async findAll(req:any,res:any,next:any){
        try {
            let {limit,page} = req.query;
            page = page || 1;
            limit = limit || 10;
            let offset = page*limit-limit;
            const community = await Community.findAndCountAll({limit,offset});
            return res.json(community);
        } catch (e) {
            next(ApiError.internal('Непредвидимая ошибка'));
        }
    }
}
module.exports = new CommunityController();
export{};