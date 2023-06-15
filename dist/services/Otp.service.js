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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRegister = exports.createOtp = void 0;
const mailer_1 = __importDefault(require("../helpers/mailer"));
const http_errors_1 = __importDefault(require("http-errors"));
const redis_client_1 = __importDefault(require("../helpers/redis_client"));
const prisma_client_1 = __importDefault(require("../helpers/prisma_client"));
function createOtp(email) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            var val = Math.floor(1000 + Math.random() * 9000);
            yield (0, mailer_1.default)({
                from: process.env.EMAIL,
                to: email,
                subject: "OTP book shop",
                text: `Your OTP is ${val}`,
            });
            let key = "OTP_" + email;
            let value = String(val);
            yield redis_client_1.default.set(key, value, { EX: 60 });
            resolve(true);
        }
        catch (error) {
            let err = error;
            reject(http_errors_1.default.InternalServerError(err.message));
        }
    }));
}
exports.createOtp = createOtp;
function verifyRegister(email, otp) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let otp_ = yield redis_client_1.default.get("OTP_" + email);
                if (otp == otp_) {
                    let key = "OTP_" + email;
                    yield redis_client_1.default.set(key, "", { EX: 0 });
                    const data = yield redis_client_1.default.get(`cache::${email}`);
                    const data_ = data !== null ? JSON.parse(data) : {};
                    yield prisma_client_1.default.users.create({
                        data: Object.assign({}, data_),
                    });
                    resolve(true);
                }
                else {
                    reject(http_errors_1.default.Unauthorized("OTP"));
                }
            }
            catch (error) {
                let err = error;
                reject(http_errors_1.default.InternalServerError(err.message));
            }
        }));
    });
}
exports.verifyRegister = verifyRegister;
