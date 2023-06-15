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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getAllUser = void 0;
const hash_bcrypt_1 = require("../helpers/hash_bcrypt");
const newError = __importStar(require("http-errors"));
const redis_client_1 = __importDefault(require("../helpers/redis_client"));
function getAllUser() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const data = await userModel.getAllUsers();
        }
        catch (error) {
            throw error;
        }
        // return data;
    });
}
exports.getAllUser = getAllUser;
function createUser(userInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { ngaysinh, password, } = userInfo;
            const _ngaysinh = new Date(ngaysinh);
            const _password = yield (0, hash_bcrypt_1.genBcryptHash)(password);
            const data = Object.assign(Object.assign({}, userInfo), { ngaysinh: _ngaysinh, password: _password });
            let key = `cache::${data.email}`;
            redis_client_1.default.set(key, JSON.stringify(data), { EX: (60 * 60 * 24 * 30) });
            // await prismaClient.users.create({
            //   data: {
            //     ...userInfo,
            //     ngaysinh: _ngaysinh,
            //     password : _password
            //   },
            // });
        }
        catch (error) {
            let err = error;
            if (err.message.includes('Unique constraint failed on the constraint')) {
                throw newError.BadRequest('Unique constraint failed on the constraint');
            }
            else {
                throw error;
            }
        }
    });
}
exports.createUser = createUser;
