import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoSanitize from "express-mongo-sanitize";
// import xss from "xss-clean";
import { errorMiddleware } from "./common/middleware/error.middleware";

import { handleRazorpayWebhook } from "./infrastructure/webhooks/razorpay.webhook";
import userRoutes from "./modules/user/routes";
import productRoutes from "./modules/product/routes";
import orderRoutes from "./modules/order/routes";
import warehouseRoutes from "./modules/warehouse/routes";
import inventoryRoute from "./modules/inventory/routes";
import cartRoutes from "./modules/cart/routes";
import rateLimit from "express-rate-limit";
import checkoutRoutes from "./modules/checkout/routes";
import addressRoutes from "./modules/address/routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";



const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: "Too many requests from this IP"
});

export const app = express();

/* Razorpay webhook route (must be before express.json) */
app.post(
  "/webhook/razorpay",
  express.raw({ type: "application/json" }),
  handleRazorpayWebhook
);



// app.use(xss());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json({ limit: "10kb" }));
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(morgan("dev"));
app.use(limiter);
app.use(errorMiddleware);
app.disable("x-powered-by");

/* API routes */
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/warehouses", warehouseRoutes);
app.use("/api/inventory", inventoryRoute);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/addresses", addressRoutes);


/* Health check */

app.get("/health", (_req, res) => {
  res.json({ status: "OK" });
});
