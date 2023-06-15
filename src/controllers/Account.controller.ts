import * as newError from 'http-errors'
import { signToken, verifyToken, signRefreshToken, verifyRefreshToken } from '../helpers/jsonwebtoken';
import { verifyUser, logOut, changePass } from '../services/Account.service';
import redisClient from '../helpers/redis_client';
import {Request, Response, NextFunction} from 'express'
import { JwtPayload } from 'jsonwebtoken';

class Account {
    async login(req : Request, res : Response, next : NextFunction) {
        const { username , password } = req.body;
        try {
            if(!username) throw newError.BadRequest("Username is missing!")
            await verifyUser(username, password);
            const token = await signToken(username);
            const refreshToken = await signRefreshToken(username);
            res.json({
                token,
                refreshToken,
                message: "Login done!",
            })
        } catch (error) {
            const err = newError.InternalServerError(error instanceof Error ? error.message : "Can't get message of error")
            next(err);
        }
    }

    // async signUp(req, res, next) {
    //     try {
    //         const { username, password } = req.body;
    //         await newLogin({ username, password });
    //         res.json({
    //             message: "Sign Up done!"
    //         })
    //     } catch (error) {
    //         next(error);
    //     }
    // }


    async newPass(req : Request, res : Response, next : NextFunction) {
        try {
            const {username, newpass} = req.body
            await changePass(username, newpass);
            res.status(200).json({
                message : "Change password success!"
            })
            next()
        } catch (error) {
            const err = newError.InternalServerError(error instanceof Error ? error.message : "Can't get message of error")
            next(err);
        }
    }

    async logOut(req : Request, res : Response, next : NextFunction) {
        try {
            const { username } = req.body;
            await logOut(username);
            res.json({
                message : "Logout success!"
            })
        } catch (error) {
            const err = newError.InternalServerError(error instanceof Error ? error.message : "Can't get message of error")
            next(err);
        }
        
    }

    async getAccessToken(req : Request, res : Response, next : NextFunction) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken)
                throw (newError.Unauthorized('RefreshToken is missing!'));
            const payload = await verifyRefreshToken(refreshToken);
            if (payload === undefined) throw newError.InternalServerError('Payload undefined')
            const {username} = payload as JwtPayload
            const flag = payload instanceof String ? null : await redisClient.get('refToken' + username); 
            if (!flag || (flag != refreshToken)) {
                throw newError.Unauthorized('RefreshToken is wrong!');
            }
            const token = await signToken(username);
            res.json({
                token,
                message: "Get new access token success!"
            })
        } catch (error) {
            const err = newError.InternalServerError(error instanceof Error ? error.message : "Can't get message of error")
            next(err);
        }
    }


}


export = new Account();