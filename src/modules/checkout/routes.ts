import { Router } from "express";
import { checkout } from "./checkout.controller";
import { authentication } from "../../common/middleware/auth.middleware";

const router = Router();

router.post("/", authentication, checkout);

export default router;