import { Router } from "express";
import { authentication } from "../../common/middleware/auth.middleware";
import { createAddress, getAddresses, deleteAddress } from "./address.controller";

const router = Router();

router.post("/", authentication, createAddress);

router.get("/", authentication, getAddresses);

router.delete("/:id", authentication, deleteAddress);

export default router;