import { uuid } from "uuidv4";
import prismaClient from "../helpers/prisma_client";
import { genBcryptHash } from "../helpers/hash_bcrypt";
import * as newError from 'http-errors'
import redisClient from '../helpers/redis_client';


async function getAllUser() {
  try {
    // const data = await userModel.getAllUsers();
  } catch (error) {
    throw error;
  }
  // return data;
}

async function createUser(userInfo: any) {
  try {
    const {
      ngaysinh,
      password,
    } = userInfo;
    const _ngaysinh = new Date(ngaysinh);
    const _password = await genBcryptHash(password);
    const data = {
      ...userInfo,
      ngaysinh: _ngaysinh,
      password : _password
    }
    let key : string = `cache::${data.email}`;
    redisClient.set(key, JSON.stringify(data), { EX: (60 * 60 * 24 * 30) });   


    // await prismaClient.users.create({
    //   data: {
    //     ...userInfo,
    //     ngaysinh: _ngaysinh,
    //     password : _password
    //   },
    // });
    
  } catch (error) {
    let err = error as Error
    if (err.message.includes('Unique constraint failed on the constraint')){
      throw newError.BadRequest('Unique constraint failed on the constraint');
    } else {
      throw error
    }
  }
}

export { getAllUser, createUser };
