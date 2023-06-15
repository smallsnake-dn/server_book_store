// const { Router } = require('express');
import {Router} from 'express'
import productController from '../controllers/Product.controller';
const route = Router();


route.get('/getProduct', productController.getListProduct);
route.post('/addBook', productController.addNewBook);
route.post('/deleteBook', productController.deleteBook);
route.post('/editBook', productController.editBook);

route.get('/', (req, res, next) => {
    res.send('Book hello');
})


export = route;