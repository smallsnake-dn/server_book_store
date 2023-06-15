const prismaClient = require('../helpers/prisma_client');


async function getAllOrder(userId : string) {
    try {
        const result = await prismaClient.donhang.findMany({
            where : {
                khachhangid : userId
            }
        });
        return result;
    } catch (error) {
        throw error
    }
}

export {
    getAllOrder
}