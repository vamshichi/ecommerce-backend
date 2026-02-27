import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { AppError } from "../errors/AppErrors";

export const validate =
  (schema: ZodSchema) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      throw new AppError(result.error.message, 400);
    }

    req.body = result.data;
    next();
  };