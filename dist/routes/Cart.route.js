"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// const {Router} = require('express');
const express_1 = require("express");
const Cart_controller_1 = __importDefault(require("../controllers/Cart.controller"));
const route = (0, express_1.Router)();
route.post('/setCart', Cart_controller_1.default.addToCart);
route.post('/getCart', Cart_controller_1.default.getCart);
module.exports = route;
