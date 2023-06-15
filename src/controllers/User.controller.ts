import {Request, Response, NextFunction} from 'express'
import * as newError from 'http-errors';
const userService = require('../services/User.service');


class User {
    async getUsers(req : Request, res : Response, next : NextFunction) {
        try {
            const data = userService.getAllUser();
            res.json(data);
        } catch (error) {
            const err = newError.InternalServerError(error instanceof Error ? error.message : "Can't get message of error")
            next(err);
        }
    }

    async newUser(req : Request, res : Response, next : NextFunction) {
        try {
            const {
                info
            } = req.body;
            if ( !(info.loaiuserid && info.ho && info.ten && info.ngaysinh && info.gioitinh && info.diachi && info.sdt && info.email && info.username && info.password && info.isactived)) {
                next(newError.BadRequest("Missing info of new user"));
            }
            await userService.createUser(info);
            
            res.status(201).json({
                message : "New user has created!"
            })


        } catch (error) {
            if(error instanceof newError.HttpError) {
                next(error)
            }
            const err = newError.InternalServerError(error instanceof Error ? error.message : "Can't get message of error")
            next(err);
        }
    }
}



export = new User();