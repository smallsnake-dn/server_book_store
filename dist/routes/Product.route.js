"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// const { Router } = require('express');
const express_1 = require("express");
const Product_controller_1 = __importDefault(require("../controllers/Product.controller"));
const route = (0, express_1.Router)();
route.get('/getProduct', Product_controller_1.default.getListProduct);
route.post('/addBook', Product_controller_1.default.addNewBook);
route.post('/deleteBook', Product_controller_1.default.deleteBook);
route.post('/editBook', Product_controller_1.default.editBook);
route.get('/', (req, res, next) => {
    res.send('Book hello');
});
module.exports = route;
