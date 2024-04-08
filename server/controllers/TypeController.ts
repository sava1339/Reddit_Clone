import { ApiError } from "../apiError/apiError";

const {Type} = require('../models/models');
import {Request, Response, NextFunction} from 'express';

class TypeController{
    async create(req:Request,res:Response,next:NextFunction){
        try {
            const {communityTypesId, name} = req.body;
            !communityTypesId || !name && next(ApiError.bedRequest('Не все поля заполнены!'));
            const communityTypes = await  Type.create({communityTypesId,name});
            return res.json(communityTypes);
        } catch (e) {
            next(ApiError.internal('Непредвидимая ошибка'));
        }
    }
    async delete(req:any,res:any,next:any){
        try {
            const {id} = req.params;
            !id && next(ApiError.bedRequest('Не введен айди'));
            const communityTypes = await Type.destroy({where:{id}});
            return res.json(communityTypes);
        } catch (e) {
            next(ApiError.internal('Непредвидимая ошибка'));
        }

    }
    async findOne(req:any,res:any,next:any){
        try {
            const {communityTypesId} = req.params;
            !communityTypesId && next(ApiError.bedRequest('Не введен айди'));
            const communityTypes = await Type.findOne({where:{communityTypesId}});
            return res.json(communityTypes);
        } catch (e) {
            next(ApiError.internal('Непредвидимая ошибка'));
        }

    }

}
module.exports = new TypeController();
export{};