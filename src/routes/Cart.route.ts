// const {Router} = require('express');
import {Router} from 'express'
import cartController from '../controllers/Cart.controller';
const route = Router();


route.post('/setCart', cartController.addToCart)
route.post('/getCart', cartController.getCart)

export = route;