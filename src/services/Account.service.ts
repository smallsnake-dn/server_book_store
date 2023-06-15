const jwt = require('../helpers/jsonwebtoken');
import prismaClient from '../helpers/prisma_client';
import * as newError from 'http-errors';
import { genBcryptHash, comparePass } from '../helpers/hash_bcrypt';
const redisClient = require('../helpers/redis_client');

async function verifyUser(user : string, pass : string) {
    return new Promise(async (resolve, reject) => {
        try {
            let username = '';
            let password = '';
            const result = await prismaClient.users.findFirst({
                where : {
                    username : user
                }
            });
            if (result !== null) {
                username = result.username;
                password = result.password
            } else {
                reject(newError.Unauthorized("Login fail!"));
            }          
            const checkPass = await comparePass(pass, password);
            if (user == username && checkPass) {
                resolve(true);
            }
            reject(newError.Unauthorized("Login fail!"));
        } catch (error) {
            reject(newError.Unauthorized('Username is never used!'))
        }
    })
}


// async function newLogin(data : any) {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const { username, password } = data;
//             const result = await prismaClient.users.findFirst({
//                 where : {
//                     username : user
//                 }
//             });
//             if (result)
//                         reject(newError.Conflict("Username is used!"));
//             const hashPass = await genBcryptHash(password);
//             await addUser({ username, hashPass });
//             resolve(true);
//         } catch (error) {
//             reject(error);
//         }
//     })
// }


async function logOut(username : string) {
    await redisClient.set('refToken' + username, '', { EX: (1) });
}


async function changePass(username: string, newpass : string){
    try {
        const hashPass = await genBcryptHash(newpass);
        await prismaClient.users.update({
            data : {
                password : hashPass,
            },
            where : {
                username : username
            }
        })
    } catch (error) {
        const err = error as Error
        throw newError.InternalServerError(err.message)
    }
}

export {
    verifyUser,
    logOut,
    changePass
}