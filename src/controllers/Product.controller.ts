import { Request, Response, NextFunction } from "express";
import * as newError from "http-errors";
import { getProduct } from "../services/Product.service";

class Product {
  async getListProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, elementOfPage, options } = req.body;
      let options_ = options || {};
      // const result = await getProduct(
      //   page,
      //   elementOfPage,
      //   options_["loaisanphamid"],
      //   (options_["ngonngu"]) && {
      //     ngonngu: {
      //       id: options_["ngonngu"],
      //     },
      //     theloai: {
      //       id: options_["theloai"],
      //     },
      //     tacgia: {
      //       id: options_["tacgia"],
      //     },
      //     nhaphathanh: {
      //       id: options_["nhaphathanh"],
      //     },
      //     namxuatban: options_["namxuatban"],
      //   } && (options_["thuonghieu"] !== null ? undefined : true),
      //   (options_["thuonghieu"]) && {
      //     thuonghieu: options_["thuonghieu"],
      //     xuatxu: options_["xuatxu"],
      //     kieudang: options_["kieudang"],
      //     loaivpp: {
      //       id: options_["loaivpp"],
      //     },
      //   }
      // );
      const result = await getProduct(
        page,
        elementOfPage,
        options_["ten"],
        options_["loaisanphamid"],
        {...options_["book"]},
        {...options_["stationery"]}
      );
      res.json(result);
      next();
    } catch (error) {
      const err = newError.InternalServerError(
        error instanceof Error ? error.message : "Can't get message of error"
      );
      next(err);
    }
  }

  async addNewBook(req: Request, res: Response, next: NextFunction) {
    const { title, image, description } = req.body;

    try {
      const data = {
        image,
        title,
        description,
      };
      // await writeFile('../../json/Book.json', data);
      next();
    } catch (error) {
      const err = newError.InternalServerError(
        error instanceof Error ? error.message : "Can't get message of error"
      );
      next(err);
    }
  }

  async deleteBook(req: Request, res: Response, next: NextFunction) {
    res.send("deleteBook");
  }

  async editBook(req: Request, res: Response, next: NextFunction) {
    res.send("editBook");
  }
}

export = new Product();
