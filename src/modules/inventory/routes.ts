import { getStock, addStock, adminUpdateStock } from "./inventory.controller";
import { Router } from "express";
import { authentication , authorize } from "../../common/middleware/auth.middleware";

const router = Router();

router.post("/", authentication, authorize("ADMIN"), addStock);
router.get("/:productId", getStock);
router.patch(
  "/admin/update",
  authentication,
  authorize("ADMIN"),
  adminUpdateStock
);

export default router;