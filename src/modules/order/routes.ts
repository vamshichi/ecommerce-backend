import { createOrder, getAdminStats, getAllOrders, updateOrderStatus } from "./order.controller";
import { authentication, authorize } from "../../common/middleware/auth.middleware";
import { Router } from "express";

const router = Router();

router.post("/", authentication, createOrder);
router.get(
  "/admin",
  authentication,
  authorize("ADMIN"),
  getAllOrders
);

router.patch(
  "/:id/status",
  authentication,
  authorize("ADMIN"),
  updateOrderStatus
);

router.get(
  "/admin/stats",
  authentication,
  authorize("ADMIN"),
  getAdminStats
);

export default router;