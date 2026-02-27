import { Request , Response , NextFunction } from "express";
import { AppError } from "../errors/AppErrors";
import jwt from "jsonwebtoken";
import { config } from "../../config/env";


export interface AuthenticatedRequest extends Request {
    user?: {
        userId: string;
        role: string;
    };
}

export const authentication = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new AppError("Unauthorized", 401));
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, config.jwtSecret) as { userId: string; role: string };
        req.user = decoded;
        next();
    } catch (error) {
        return next(new AppError("Invalid token", 401));
    }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new AppError("Forbidden", 403);
    }

    next();
  };
};