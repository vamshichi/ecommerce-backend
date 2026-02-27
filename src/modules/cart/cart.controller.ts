import { Request, Response, NextFunction } from "express";
import { CartService } from "./cart.service";

const service = new CartService();

export const getCart = async (req: any, res: Response, next: NextFunction) => {
  try {
    const cart = await service.getCart(req.user.userId);

    res.json({
      status: "success",
      data: cart
    });
  } catch (error) {
    next(error);
  }
};

export const addItem = async (req: any, res: Response, next: NextFunction) => {
  try {

    const { variantId, quantity } = req.body;

    const cart = await service.addItem(
      req.user.userId,
      variantId,
      quantity
    );

    res.json({
      status: "success",
      data: cart
    });

  } catch (error) {
    next(error);
  }
};

export const removeItem = async (req: any, res: Response, next: NextFunction) => {
  try {

    const cart = await service.removeItem(
      req.user.userId,
      req.params.variantId
    );

    res.json({
      status: "success",
      data: cart
    });

  } catch (error) {
    next(error);
  }
};