import { ApiError } from "../apiError/apiError";

const {ChatMessage} = require('../models/models');
class ChatMessageController{
    async create(req:any,res:any,next:any){
        try {
            const {userId, chatGroupId, dataLink} = req.body;
            !userId || !chatGroupId || !dataLink && next(ApiError.bedRequest('Не все поля заполнены!'));
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