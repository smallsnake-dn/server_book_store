import {Request, Response, NextFunction} from 'express'
import * as newError from 'http-errors'
const orderService = require('../services/Order.service');

class Order {
    async getAllOrder(req : Request, res : Response, next : NextFunction) {
        try {
            // const result = await orderService.getAllOrder(userId);
            // req.json({
            //     orders : result,
            //     total : (result.length)
            // })
        } catch (error) {
            const err = newError.InternalServerError(error instanceof Error ? error.message : "Can't get message of error")
            next(err);
        }
    }
}


export = new Order();