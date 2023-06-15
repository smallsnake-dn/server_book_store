import RedisClient from '@redis/client/dist/lib/client';
import { RedisCommandArgument } from '@redis/client/dist/lib/commands';
import redisClient from '../helpers/redis_client';


async function setCart(username : string, item : object, count : number) {
    try {
        if (count <= 0){
            await redisClient.hDel(('cart:' + username) as RedisCommandArgument, item  as RedisCommandArgument);
        } else {
            await redisClient.hSet(('cart:' + username) as RedisCommandArgument, item as RedisCommandArgument, count);
        }
    } catch (error) {
        throw error
    }
}

async function getAllCart( username : string ) {
    try {
        const data = await redisClient.hGetAll('cart:' + username);
        return data;
        
    } catch (error) {
        throw error;
    }
}


export {
    setCart,
    getAllCart
}