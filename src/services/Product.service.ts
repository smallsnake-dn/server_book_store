import prismaClient from "../helpers/prisma_client";
import * as newError from "http-errors";

async function getProduct(
    page: number,
    elementOfPage: number,
    ten: string | undefined,
    loaisanphamid: number | undefined,
    optionsBook: object | undefined,
    optionsStationery: object | undefined
): Promise<object> {
    return new Promise(async (resolve, reject) => {
        try {
            let skip = (page - 1) * elementOfPage;
            let take = elementOfPage;
            console.log({
                loaisanphamid: loaisanphamid,
                sach: optionsBook,
                vanphongpham: optionsStationery,
            });
            const optionsBook_ = optionsBook as any;
            const optionsStationery_ = optionsStationery as any;
            const result = await prismaClient.sanpham.findMany({
                skip,
                take,
                where: {
                    ten: ten && {
                        contains: ten,
                    },
                    loaisanphamid,
                    sach:
                        optionsBook_ !== undefined && loaisanphamid === 2
                            ? {
                                  ngonngu: {
                                      id: optionsBook_["ngonngu"],
                                  },
                                  theloai: {
                                      id: optionsBook_["theloai"],
                                  },
                                  tacgia: {
                                      id: optionsBook_["tacgia"],
                                  },
                                  nhaphathanh: {
                                      id: optionsBook_["nhaphathanh"],
                                  },
                                  namxuatban: optionsBook_["namxuatban"],
                              }
                            : undefined,
                    vanphongpham:
                        loaisanphamid === 1
                            ? {
                                  thuonghieu: optionsStationery_["thuonghieu"],
                                  xuatxu: optionsStationery_["xuatxu"],
                                  kieudang: optionsStationery_["kieudang"],
                                  loaivpp: {
                                      id: optionsStationery_["loaivpp"],
                                  },
                              }
                            : undefined,
                },
                include: {
                    sach: {
                        select: {
                            id: true,
                            loaisanphamid: true,
                            sotrang: true,
                            namxuatban: true,
                            theloai: true,
                            ngonngu: true,
                            tacgia: true,
                            nhaphathanh: true,
                        },
                    },
                    vanphongpham: {
                        select: {
                            id: true,
                            loaisanphamid: true,
                            thuonghieu: true,
                            xuatxu: true,
                            kieudang: true,
                            loaivpp: true,
                        },
                    },
                },
            });
            resolve(result);
        } catch (error) {
            const err = error as Error;
            reject(newError.InternalServerError(err.message));
        }
    });
}

export { getProduct };
