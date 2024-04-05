import { ApiError } from "../apiError/apiError";
const {Community} = require('../models/models');

class CommunityController{
    async create(req:any,res:any,next:any){
        try {
            const {dataLink,userCommunity,userId} = req.body;
            !dataLink || !userCommunity || !userId && next(ApiError.bedRequest('Не все поля заполнены!'));
            const community = await Community.create({dataLink,userCommunity,userId});
            return res.json(community);
        } catch (e) {
            next(ApiError.internal('Непредвидимая ошибка'));
        }
    }
    async delete(req:any,res:any,next:any){
        try {
            const {id} = req.params;
            !id && next(ApiError.bedRequest('Не введен айди!'));
            const community = await Community.destroy({where:{id}});
            return res.json(community);
        } catch (e) {
            next(ApiError.internal('Непредвидимая ошибка'));
        }
    }
    async findOne(req:any,res:any,next:any){
        try {
            const {id} = req.params;
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