import { authentication, authorize } from "../../common/middleware/auth.middleware";
import { getUsers, login, register } from "./user.controller";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered
 */

router.post("/register", register);
router.post("/login", login);
router.get(
  "/admin",
  authentication,
  authorize("ADMIN"),
  getUsers
);

export default router;