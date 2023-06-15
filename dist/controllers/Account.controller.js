"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const newError = __importStar(require("http-errors"));
const jsonwebtoken_1 = require("../helpers/jsonwebtoken");
const Account_service_1 = require("../services/Account.service");
const redis_client_1 = __importDefault(require("../helpers/redis_client"));
class Account {
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            try {
                if (!username)
                    throw newError.BadRequest("Username is missing!");
                yield (0, Account_service_1.verifyUser)(username, password);
                const token = yield (0, jsonwebtoken_1.signToken)(username);
                const refreshToken = yield (0, jsonwebtoken_1.signRefreshToken)(username);
                res.json({
                    token,
                    refreshToken,
                    message: "Login done!",
                });
            }
            catch (error) {
                const err = newError.InternalServerError(error instanceof Error ? error.message : "Can't get message of error");
                next(err);
            }
        });
    }
    // async signUp(req, res, next) {
    //     try {
    //         const { username, password } = req.body;
    //         await newLogin({ username, password });
    //         res.json({
    //             message: "Sign Up done!"
    //         })
    //     } catch (error) {
    //         next(error);
    //     }
    // }
    newPass(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, newpass } = req.body;
                yield (0, Account_service_1.changePass)(username, newpass);
                res.status(200).json({
                    message: "Change password success!"
                });
                next();
            }
            catch (error) {
                const err = newError.InternalServerError(error instanceof Error ? error.message : "Can't get message of error");
                next(err);
            }
        });
    }
    logOut(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username } = req.body;
                yield (0, Account_service_1.logOut)(username);
                res.json({
                    message: "Logout success!"
                });
            }
            catch (error) {
                const err = newError.InternalServerError(error instanceof Error ? error.message : "Can't get message of error");
                next(err);
            }
        });
    }
    getAccessToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.body;
                if (!refreshToken)
                    throw (newError.Unauthorized('RefreshToken is missing!'));
                const payload = yield (0, jsonwebtoken_1.verifyRefreshToken)(refreshToken);
                if (payload === undefined)
                    throw newError.InternalServerError('Payload undefined');
                const { username } = payload;
                const flag = payload instanceof String ? null : yield redis_client_1.default.get('refToken' + username);
                if (!flag || (flag != refreshToken)) {
                    throw newError.Unauthorized('RefreshToken is wrong!');
                }
                const token = yield (0, jsonwebtoken_1.signToken)(username);
                res.json({
                    token,
                    message: "Get new access token success!"
                });
            }
            catch (error) {
                const err = newError.InternalServerError(error instanceof Error ? error.message : "Can't get message of error");
                next(err);
            }
        });
    }
}
module.exports = new Account();
