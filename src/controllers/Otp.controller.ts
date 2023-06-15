import {Request, Response, NextFunction} from "express"
import newError from "http-errors"
import { createOtp, verifyRegister } from "../services/Otp.service"

class OTP {
    async getOTP(req : Request, res : Response, next : NextFunction) {
        try {
            const { email } = req.body;
            if(!email){
                next(newError.BadRequest('Email is missing!'))
            }
            await createOtp(email);
            res.status(200).json({
                status : 200,
                message : `OTP send to email ${email}`
            })
        } catch (error) {
            const err = error as Error
            next(newError.InternalServerError(err.message))
        }
    }

    async verifyOTP(req : Request, res : Response, next : NextFunction){
        try {
            const {email, otp} = req.body;
            if (!email || !otp) {
                next(newError.BadRequest('Email or OTP is missing!'))
            }
            await verifyRegister(email, otp);
            res.status(200).json({
                status : 200,
                message : 'OTP is OK!'
            })
        } catch (error) {
            const err = error as Error
            next(newError.InternalServerError(err.message))
        }
    }
}


export = new OTP()