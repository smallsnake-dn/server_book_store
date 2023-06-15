// const newError = require('http-errors');
import * as newError from 'http-errors'
import {Request, Response, NextFunction} from 'express'
const { verifyToken } = require('../helpers/jsonwebtoken')



async function checkLogin(req : Request, res : Response, next : NextFunction) {
    try {
        const x_token = req.headers['x-token'];
        if (!x_token)
            throw (newError.Unauthorized('Token is missing!'));
        const username = await verifyToken(x_token);
        next(); 
    } catch (error) {
        next(newError.InternalServerError("Can't check login!"));
    }
}




export {
    checkLogin
}