const { NText } = require('mssql');
import * as cartService from '../services/Cart.service';
import * as newError from 'http-errors'
import {Request, Response, NextFunction} from 'express'

class Cart {
    async addToCart(req : Request, res : Response, next : NextFunction) {
        try {
            const { username, item, count} = req.body;
            cartService.setCart(username, item, count);
            res.json({
                message : "Add to cart success!"
            })
        } catch (error) {
            const err = newError.InternalServerError(error instanceof Error ? error.message : "Can't get message of error")
            next(err);
        }
    }

    async getCart(req : Request, res : Response, next : NextFunction) {
        try {
            const {username} = req.body;
            const data = await cartService.getAllCart(username);
            // console.log("Controller:::",data);
            res.json({
                message : "Get all for user!",
                data
            })
        } catch (error) {
            const err = newError.InternalServerError(error instanceof Error ? error.message : "Can't get message of error")
            next(err);
        }

    }
}


export = new Cart();