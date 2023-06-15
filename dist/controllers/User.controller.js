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
const newError = __importStar(require("http-errors"));
const userService = require('../services/User.service');
class User {
    getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = userService.getAllUser();
                res.json(data);
            }
            catch (error) {
                const err = newError.InternalServerError(error instanceof Error ? error.message : "Can't get message of error");
                next(err);
            }
        });
    }
    newUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { info } = req.body;
                if (!(info.loaiuserid && info.ho && info.ten && info.ngaysinh && info.gioitinh && info.diachi && info.sdt && info.email && info.username && info.password && info.isactived)) {
                    next(newError.BadRequest("Missing info of new user"));
                }
                yield userService.createUser(info);
                res.status(201).json({
                    message: "New user has created!"
                });
            }
            catch (error) {
                if (error instanceof newError.HttpError) {
                    next(error);
                }
                const err = newError.InternalServerError(error instanceof Error ? error.message : "Can't get message of error");
                next(err);
            }
        });
    }
}
module.exports = new User();
