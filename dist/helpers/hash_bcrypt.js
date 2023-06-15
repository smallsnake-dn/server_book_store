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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePass = exports.genBcryptHash = void 0;
// const bcrypt = require('bcrypt');
const bcrypt_1 = __importDefault(require("bcrypt"));
const newError = __importStar(require("http-errors"));
const round = process.env.BCRYPTROUND || 10;
function genBcryptHash(pass) {
    return new Promise((resolve, reject) => {
        bcrypt_1.default.hash(pass, round, (err, hash) => {
            if (err)
                reject(newError.InternalServerError("Can't generate hash password!"));
            resolve(hash);
        });
    });
}
exports.genBcryptHash = genBcryptHash;
function comparePass(plainTextPass, hashPass) {
    return new Promise((resolve, reject) => {
        bcrypt_1.default.compare(plainTextPass, hashPass, function (err, result) {
            if (err)
                reject(newError.InternalServerError("Can't compare password!"));
            resolve(result);
        });
    });
}
exports.comparePass = comparePass;
