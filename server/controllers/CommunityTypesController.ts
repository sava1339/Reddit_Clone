import { ApiError } from "../apiError/apiError";

const {CommunityTypes} = require('../models/models');
import {Request, Response, NextFunction} from 'express';

class CommunityTypesController{
    async create(req:Request,res:Response,next:NextFunction){
        try {
            const {communityId} = req.body;
            !communityId && next(ApiError.bedRequest('Не все поля заполнены!'));
            const communityTypes = await  CommunityTypes.create({communityId});
            return res.json(communityTypes);
        } catch (e) {
            next(ApiError.internal('Непредвидимая ошибка'));
        }
    }
    async delete(req:any,res:any,next:any){
        try {
            const {id} = req.params;
            !id && next(ApiError.bedRequest('Не введен айди'));
            const communityTypes = await CommunityTypes.destroy({where:{id}});
            return res.json(communityTypes);
        } catch (e) {
            next(ApiError.internal('Непредвидимая ошибка'));
        }

    }
    async findOne(req:any,res:any,next:any){
        try {
            const {communityId} = req.params;
            !communityId && next(ApiError.bedRequest('Не введен айди'));
            const communityTypes = await CommunityTypes.findOne({where:{communityId}});
            return res.json(communityTypes);
        } catch (e) {
            next(ApiError.internal('Непредвидимая ошибка'));
        }

    }

}
module.exports = new CommunityTypesController();
export{};