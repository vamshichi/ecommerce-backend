import { createCategory, getAllCategories, getCategoryTree } from "./category.controller";

import { Router } from "express";
import { authentication , authorize } from "../../common/middleware/auth.middleware";
import { validate } from "../../common/validation/validate";
// import { createCategorySchema } from "./category.schema";

const router = Router();

router.post("/", authentication, authorize("ADMIN"), createCategory);
router.get("/", getAllCategories);
router.get("/tree", getCategoryTree);

export default router;