import { Router } from "express";
import { create, getVariants } from "./variant.controller";
import { authorize , authentication } from "../../common/middleware/auth.middleware";

const router = Router();

router.post("/", authentication, authorize("ADMIN"), create);

router.get("/:productId", getVariants);

export default router;