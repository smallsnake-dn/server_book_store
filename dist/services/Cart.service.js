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
exports.getAllCart = exports.setCart = void 0;
const redis_client_1 = __importDefault(require("../helpers/redis_client"));
function setCart(username, item, count) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (count <= 0) {
                yield redis_client_1.default.hDel(('cart:' + username), item);
            }
            else {
                yield redis_client_1.default.hSet(('cart:' + username), item, count);
            }
        }
        catch (error) {
            throw error;
        }
    });
}
exports.setCart = setCart;
function getAllCart(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield redis_client_1.default.hGetAll('cart:' + username);
            return data;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.getAllCart = getAllCart;
