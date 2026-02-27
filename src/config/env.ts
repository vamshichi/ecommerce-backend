import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI!,
  redisHost: process.env.REDIS_HOST!,
  redisPort: Number(process.env.REDIS_PORT),
  razorpayKey: process.env.RAZORPAY_KEY!,
  razorpaySecret: process.env.RAZORPAY_SECRET!,
  jwtSecret: process.env.JWT_SECRET!,
};