import { createWarehouse, getAllWarehouses } from "./warehouse.controller";
import { Router } from "express";
import { authentication , authorize } from "../../common/middleware/auth.middleware";

const router = Router();    

router.post("/", authentication, authorize("ADMIN"), createWarehouse);
router.get("/", getAllWarehouses);

export default router;