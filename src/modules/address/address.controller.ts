import { Request, Response, NextFunction } from "express";
import { AddressService } from "./address.service";

const service = new AddressService();

export const createAddress = async (req: any, res: Response, next: NextFunction) => {
  try {

    const address = await service.createAddress(
      req.user.userId,
      req.body
    );

    res.status(201).json({
      status: "success",
      data: address
    });

  } catch (error) {
    next(error);
  }
};

export const getAddresses = async (req: any, res: Response, next: NextFunction) => {
  try {

    const addresses = await service.getUserAddresses(req.user.userId);

    res.json({
      status: "success",
      data: addresses
    });

  } catch (error) {
    next(error);
  }
};

export const deleteAddress = async (req: any, res: Response, next: NextFunction) => {
  try {

    await service.deleteAddress(
      req.user.userId,
      req.params.id
    );

    res.json({
      status: "success"
    });

  } catch (error) {
    next(error);
  }
};