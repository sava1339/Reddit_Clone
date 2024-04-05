import { ApiError } from "../apiError/apiError";
const {ChatGroup} = require('../models/models');

class ChatGroupController{
    async create(req:any,res:any,next:any){
        try {
            let {dataLink,chatGroupUser,userId} = req.body;
            if(typeof userId == "string"){
                userId = +userId;
            }
            !dataLink || !chatGroupUser && next(ApiError.bedRequest('Не все поля заполнены!'));
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