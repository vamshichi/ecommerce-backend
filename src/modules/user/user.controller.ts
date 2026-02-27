import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import { successResponse } from "../../common/utils/response";

const userService = new UserService();

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const result = await userService.register(email, password);
    res.status(201).json(successResponse(result));
  } catch (error) {
    next(error);
  } 
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const result = await userService.login(email, password);
    res.status(200).json(successResponse(result));
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const users = await userService.getAllUsers();

    res.json({
      status: "success",
      data: users
    });

  } catch (error) {
    next(error);
  }
};