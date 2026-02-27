import Redis from "ioredis";
import { config } from "../../config/env";

export const redisClient = new Redis({
  host: config.redisHost,
  port: config.redisPort,
});