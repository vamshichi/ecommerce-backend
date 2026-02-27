import { Request, Response, NextFunction } from "express";
import { CheckoutService } from "./checkout.service";

const service = new CheckoutService();

export const checkout = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {

    const { addressId } = req.body;

const order = await service.checkout(
  req.user.userId,
  addressId
);

    res.json({
      status: "success",
      data: order
    });

  } catch (error) {
    next(error);
  }
};