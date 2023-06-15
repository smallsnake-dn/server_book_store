// const {Router} = require('express');
import {Router} from 'express'
import orderController from '../controllers/Order.controller';
const route = Router();

route.get('/getAll', orderController.getAllOrder);

export = route;