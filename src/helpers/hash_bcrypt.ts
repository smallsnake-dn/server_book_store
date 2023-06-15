// const bcrypt = require('bcrypt');
import bcrypt, {} from 'bcrypt'
import * as newError from 'http-errors';

const round = process.env.BCRYPTROUND || 10;

function genBcryptHash(pass : string) : Promise<string> {
    return new Promise((resolve, reject) => {
        bcrypt.hash(pass, round, (err : Error | undefined, hash : string) => {
            if(err)
                reject(newError.InternalServerError("Can't generate hash password!"));
            resolve(hash);
        })
    })
}


function comparePass(plainTextPass : string, hashPass : string) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainTextPass, hashPass, function(err : Error | undefined, result : boolean) {
            if(err)
                reject(newError.InternalServerError("Can't compare password!"));
            resolve(result);
        });
    })
}


export {
    genBcryptHash,
    comparePass
}