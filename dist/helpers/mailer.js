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
const nodemailer_1 = __importDefault(require("nodemailer"));
//   var mailOptions = {
//     from: 'youremail@gmail.com',
//     to: 'myfriend@yahoo.com',
//     subject: 'Sending Email using Node.js',
//     text: 'That was easy!'
//   };
function sendMail(mailOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let acccount = yield nodemailer_1.default.createTestAccount();
                var transporter = nodemailer_1.default.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASSWORD_EMAIL
                    }
                    // auth: {
                    //   user: acccount.user, // generated ethereal user
                    //   pass: acccount.pass, // generated ethereal password
                    // },
                });
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        throw error;
                    }
                    else {
                        console.log("Email sent: " + info.response);
                        console.log("Preview URL: %s", nodemailer_1.default.getTestMessageUrl(info));
                        resolve("Email sent: " + info.response);
                    }
                });
            }
            catch (error) {
                reject(error);
            }
        }));
    });
}
module.exports = sendMail;
