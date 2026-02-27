import { Request, Response, NextFunction } from "express";
import { VariantService } from "./variant.service";


const service = new VariantService();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const variant = await service.create(req.body);

    res.status(201).json({
      status: "success",
      data: variant
    });
  } catch (error) {
    next(error);
  }
};

export const getVariants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const variants = await service.findByProduct(req.params.productId as string);

    res.json({
      status: "success",
      data: variants
    });
  } catch (error) {
    next(error);
  }
};