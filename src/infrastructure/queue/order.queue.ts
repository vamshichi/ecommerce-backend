import { Queue } from "bullmq";
import { redisClient } from "../cache/redis.client";

export const orderQueue = new Queue("order-expiration", {
  connection: redisClient.options,
});