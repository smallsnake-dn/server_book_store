"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.signRefreshToken = exports.verifyToken = exports.signToken = void 0;
const newError = require('http-errors');
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redis_client_1 = __importDefault(require("./redis_client"));
const secretToken = process.env.SECRETTOKEN || '';
const secretRefreshToken = process.env.SECRETREFRESHTOKEN || '';
function signToken(payload) {
    return new Promise((resolve, reject) => {
        const options = {
            expiresIn: '10s',
        };
        jsonwebtoken_1.default.sign({ payload }, secretToken, options, (err, encode) => {
            console.log({
                payload,
                secretToken
            });
            if (err) {
                reject(err);
            }
            resolve(encode);
        });
    });
}
exports.signToken = signToken;
function verifyToken(encode) {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(encode, secretToken, (err, decode) => {
            if (err) {
                if (err.message === 'jwt expired')
                    reject(newError.Unauthorized('Token is expired'));
                reject(newError.Unauthorized("Can't verify token"));
            }
            resolve(decode);
        });
    });
}
exports.verifyToken = verifyToken;
function signRefreshToken(username) {
    return new Promise((resolve, reject) => {
        const options = {
            expiresIn: '10d',
        };
        jsonwebtoken_1.default.sign({ username }, secretRefreshToken, options, (err, encode) => {
            console.log({
                username,
                secretToken
            });
            if (err) {
                reject(err);
            }
            const key = 'refToken' + username;
            const value = encode !== undefined ? encode : '';
            redis_client_1.default.set(key, value, { EX: (60 * 10) });
            resolve(encode);
        });
    });
}
exports.signRefreshToken = signRefreshToken;
function verifyRefreshToken(encode) {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(encode, secretRefreshToken, (err, decode) => {
            if (err) {
                reject(new Error("Can't verify refresh token"));
            }
            resolve(decode);
        });
    });
}
exports.verifyRefreshToken = verifyRefreshToken;
