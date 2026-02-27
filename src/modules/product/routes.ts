import { createProduct, getAllProducts, uploadProductImage } from "./product.controller";
import { Router } from "express";
import { authentication , authorize } from "../../common/middleware/auth.middleware";
import { validate } from "../../common/validation/validate";
import { createProductSchema } from "./product.schema";
import { upload } from "../../common/middleware/upload.middleware";

const router = Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 */

router.post("/", authentication, authorize("ADMIN"), validate(createProductSchema), createProduct);
router.get("/", getAllProducts);
router.post("/upload-image",authentication,authorize("ADMIN"),upload.single("image"),uploadProductImage);

export default router;


