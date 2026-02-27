import { Request, Response, NextFunction } from "express";
import { OrderService } from "./order.service";

const orderService = new OrderService();

export const createOrder = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.userId;
    const { items, addressId } = req.body;

    const order = await orderService.createOrder(userId, items, addressId);

    res.status(201).json({
      status: "success",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const orders = await orderService.getAllOrders();

    res.json({
      status: "success",
      data: orders
    });

  } catch (error) {
    next(error);
  }

  
};

export const updateOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const order = await orderService.updateOrderStatus(
      Array.isArray(req.params.id) ? req.params.id[0] : req.params.id,
      req.body.status
    );

    res.json({
      status: "success",
      data: order
    });

  } catch (error) {
    next(error);
  }
};

export const getAdminStats = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const stats = await orderService.getAdminStats();

    res.json({
      status: "success",
      data: stats
    });

  } catch (error) {
    next(error);
  }
};