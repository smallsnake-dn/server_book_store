"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const http_errors_1 = __importDefault(require("http-errors"));
const Otp_service_1 = require("../services/Otp.service");
class OTP {
    getOTP(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                if (!email) {
                    next(http_errors_1.default.BadRequest('Email is missing!'));
                }
                yield (0, Otp_service_1.createOtp)(email);
                res.status(200).json({
                    status: 200,
                    message: `OTP send to email ${email}`
                });
            }
            catch (error) {
                const err = error;
                next(http_errors_1.default.InternalServerError(err.message));
            }
        });
    }
    verifyOTP(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, otp } = req.body;
                if (!email || !otp) {
                    next(http_errors_1.default.BadRequest('Email or OTP is missing!'));
                }
                yield (0, Otp_service_1.verifyRegister)(email, otp);
                res.status(200).json({
                    status: 200,
                    message: 'OTP is OK!'
                });
            }
            catch (error) {
                const err = error;
                next(http_errors_1.default.InternalServerError(err.message));
            }
        });
    }
}
module.exports = new OTP();
