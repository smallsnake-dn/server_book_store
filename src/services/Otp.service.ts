import sendMail from "../helpers/mailer";
import newError, { HttpError } from "http-errors";
import redisClient from "../helpers/redis_client";
import prismaClient from "../helpers/prisma_client";

function createOtp(email: string): Promise<boolean | HttpError> {
  return new Promise(async (resolve, reject) => {
    try {
      var val = Math.floor(1000 + Math.random() * 9000);
      await sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "OTP book shop",
        text: `Your OTP is ${val}`,
      });
      let key: string = "OTP_" + email;
      let value: string = String(val);
      await redisClient.set(key, value, { EX: 60 });
      resolve(true);
    } catch (error) {
      let err = error as Error;
      reject(newError.InternalServerError(err.message));
    }
  });
}

async function verifyRegister(email: string, otp: string) {
  return new Promise(async (resolve, reject) => {
    try {
      let otp_ = await redisClient.get("OTP_" + email);
      if (otp == otp_) {
        let key: string = "OTP_" + email;
        await redisClient.set(key, "", { EX: 0 });
        const data = await redisClient.get(`cache::${email}`);
        const data_ = data !== null ? JSON.parse(data) : {};

        await prismaClient.users.create({
          data: {
            ...data_
          },
        });
        resolve(true);
      } else {
        reject(newError.Unauthorized("OTP"));
      }
    } catch (error) {
      let err = error as Error;
      reject(newError.InternalServerError(err.message));
    }
  });
}

export { createOtp, verifyRegister };
