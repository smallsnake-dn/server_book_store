import {Router} from 'express'
import otpController from '../controllers/Otp.controller'
let route = Router()


route.post('/create', otpController.getOTP)
route.post('/verify', otpController.verifyOTP)

export = route
