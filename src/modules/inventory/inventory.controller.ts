import { InventoryService } from "./inventory.service";
import { Request, Response, NextFunction } from "express";
import prisma from "../../infrastructure/database/prisma";

const inventoryService = new InventoryService();

export const addStock = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productId, warehouseId, quantity } = req.body;
        const stock = await inventoryService.addStock(productId, warehouseId, quantity);
        res.status(200).json(stock);
    } catch (error) {
        next(error);
    }
};

export const getStock = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productId = Array.isArray(req.params.productId) ? req.params.productId[0] : req.params.productId;
        const stock = await inventoryService.getStock(productId);
        res.status(200).json(stock);
    } catch (error) {
        next(error);
    }
};

export const adminUpdateStock = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const { variantId, warehouseId, quantity } = req.body;

    const stock = await prisma.inventory.update({
      where: {
        variantId_warehouseId: {
          variantId,
          warehouseId
        }
      },
      data: {
        quantity
      }
    });

    res.json({
      status: "success",
      data: stock
    });

  } catch (error) {
    next(error);
  }
};