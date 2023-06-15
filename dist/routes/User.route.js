"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const Account_controller_1 = __importDefault(require("../controllers/Account.controller"));
const User_controller_1 = __importDefault(require("../controllers/User.controller"));
const Login_middleware_1 = require("../middlewares/Login.middleware");
const route = (0, express_1.Router)();
route.post('/login', Account_controller_1.default.login);
route.post('/refreshToken', Account_controller_1.default.getAccessToken);
route.post('/logout', Login_middleware_1.checkLogin, Account_controller_1.default.logOut);
route.post('/newpass', Account_controller_1.default.newPass);
route.post('/newuser', User_controller_1.default.newUser);
module.exports = route;
