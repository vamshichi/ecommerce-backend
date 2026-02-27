import { Request, Response, NextFunction } from "express";
import { ProductService } from "./product.service";
import { ProductImageService } from "./product.image.service";

const productService = new ProductService();
const imageService = new ProductImageService();

export const uploadProductImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const file = req.file;

    if (!file) {
      throw new Error("No file uploaded");
    }

    const imageUrl = await imageService.uploadImage(file);

    res.json({
      status: "success",
      data: { imageUrl }
    });

  } catch (error) {
    next(error);
  }
};



export const searchProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await productService.searchProducts(req.query);
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await productService.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
};

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await productService.findAll();
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};