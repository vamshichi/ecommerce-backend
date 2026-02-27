import { NextFunction, Request, Response } from "express";
import { WarehouseService } from "./warehouse.service";

const warehouseService = new WarehouseService();

export const createWarehouse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const warehouse = await warehouseService.create(req.body);
        res.status(201).json(warehouse);
    } catch (error) {
        next(error);
    }   
};

export const getAllWarehouses = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const warehouses = await warehouseService.findAll();
        res.status(200).json(warehouses);
    } catch (error) {
        next(error);
    }
};