import { Router } from "express";
import { authentication } from "../../common/middleware/auth.middleware";
import { addItem, getCart, removeItem } from "./cart.controller";

const router = Router();

router.get("/", authentication, getCart);

router.post("/items", authentication, addItem);

router.delete("/items/:variantId", authentication, removeItem);

export default router;