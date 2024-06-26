import { ApiError } from '../apiError/apiError';
const {User} = require('../models/models');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const fs = require("fs");
import {Request, Response, NextFunction} from 'express';
import { filesRequest } from '../types/types';
import path from 'path';

const jwtGeneration = (id:number, login:string, password:string, username:string, avatarLink:string, karma:number) =>{
    return jwt.sign(
        {id, login, password, username, avatarLink, karma},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req:Request, res:Response,next:NextFunction) {
        try {
            const {login, password, username} = req.body;
            const {avatarImage} = (req as filesRequest).files;
            
            const avatarLink = uuid.v4();
            const userAvatarsPath = path.resolve(__dirname,'..','static','UserAvatars');
            await avatarImage.mv((userAvatarsPath + '\\' + avatarLink + ".png"));
            
            !login || !password && next(ApiError.bedRequest('Некортеный email или пароль!'));

            const candidate = await User.findOne({where:{login}});
            if(candidate){
                return res.status(400).json({message: 'Пользователь с таким логином уже существует!'});
            }

            let hashPassword = await bcrypt.hash(password,5);
            const karma = 0;

            const user = await User.create({login, password:hashPassword, username, avatarLink, karma});
            const token = jwtGeneration(user.id,user.login,user.password,user.username,user.avatarLink, user.karma);
            res.json(token);
        } catch (e) {
            next(ApiError.bedRequest('Непредвидимая ошибка'));
        }
    }
    async login(req:any,res:any,next:any){
        try {
            const {login, password} = req.body;
            const user = await User.findOne({where:{login}});

            !user && next(ApiError.bedRequest('Пользователь с таким логином не найден!'));
            const comparePassword = bcrypt.compareSync(password,user.password);
            !comparePassword && next(ApiError.bedRequest('Неверный пароль!'));

            const token = jwtGeneration(user.id,user.login,user.password,user.username,user.avatarLink, user.karma);
            res.json(token);
        } catch (e) {
            next(ApiError.bedRequest('Непредвидимая ошибка'));
        }
    }
    async auth(req:any,res:any,next:any){
        try {
            const token = jwtGeneration(req.user.id,req.user.login,req.user.password,req.user.username,req.user.avatarLink,req.user.karma);
            return res.json(token);
        } catch (e) {
            next(ApiError.bedRequest('Непредвидимая ошибка'));
        }
    }
}

module.exports = new UserController();
export{}