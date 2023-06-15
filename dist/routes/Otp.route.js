"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const Otp_controller_1 = __importDefault(require("../controllers/Otp.controller"));
let route = (0, express_1.Router)();
route.post('/create', Otp_controller_1.default.getOTP);
route.post('/verify', Otp_controller_1.default.verifyOTP);
module.exports = route;
