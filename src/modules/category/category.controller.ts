import { successResponse } from "../../common/utils/response";
import { CategoryService } from "./category.service";
import { NextFunction, Request, Response } from "express";

const categoryService = new CategoryService();

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        const result = await categoryService.create({ name });
        res.status(201).json(successResponse(result));
    } catch (error) {
        next(error);
    }
};

export const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await categoryService.findAll();
        res.status(200).json(successResponse(result));
    } catch (error) {
        next(error);
    }
};

export const getCategoryTree = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await categoryService.findTree();
        res.status(200).json(successResponse(result));
    } catch (error) {
        next(error);
    }
};
