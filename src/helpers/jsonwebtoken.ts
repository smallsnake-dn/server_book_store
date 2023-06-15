const newError = require('http-errors');
import jwt, {Secret, JwtPayload} from 'jsonwebtoken'
import redisClient from './redis_client';


const secretToken : Secret = process.env.SECRETTOKEN || '';
const secretRefreshToken : Secret = process.env.SECRETREFRESHTOKEN || '';


function signToken(payload : string) {
    return new Promise((resolve, reject) => {
        const options = {
            expiresIn: '10s',
        }
        jwt.sign({ payload }, secretToken , options, (err, encode) => {
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


function verifyToken(encode : string) {
    return new Promise((resolve, reject) => {
        jwt.verify(encode, secretToken, (err, decode) => {
            if (err) {
                if (err.message === 'jwt expired')
                    reject(newError.Unauthorized('Token is expired'));
                reject(newError.Unauthorized("Can't verify token"));
            }
            resolve(decode);
        })
    })
}


function signRefreshToken(username : string) {
    return new Promise((resolve, reject) => {
        const options = {
            expiresIn: '10d',
        }
        jwt.sign({ username }, secretRefreshToken, options, (err, encode) => {
            console.log({
                username,
                secretToken
            });
            if (err) {
                reject(err);
            }
            const key : string = 'refToken' + username
            const value : string = encode !== undefined ? encode : '';
            redisClient.set(key, value, { EX: (60 * 10) });   
            resolve(encode);
        });
    })
}


function verifyRefreshToken(encode : string): Promise<string | jwt.JwtPayload | undefined> {
    return new Promise((resolve, reject) => {
        jwt.verify(encode, secretRefreshToken, (err, decode) => {
            if (err) {
                reject(new Error("Can't verify refresh token"));
            }
            resolve(decode);
        })
    })
}


export {
    signToken,
    verifyToken,
    signRefreshToken,
    verifyRefreshToken
}
