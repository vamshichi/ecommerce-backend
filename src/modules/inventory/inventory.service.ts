import { redisClient } from "../../infrastructure/cache/redis.client";
import { AppError } from "../../common/errors/AppErrors";
import { InventoryRepository } from "./inventory.repository";

export class InventoryService {
    private inventoryRepository = new InventoryRepository();

    async safeDecrement(productId: string, warehouseId: string, quantity: number) {
        const lockKey = `lock:${productId}:${warehouseId}`;

        const lock = await redisClient.set(lockKey, "locked", "EX", 5, "NX");

        if (!lock) {
            throw new AppError("Stock is being processed, try again", 409);
        }

        try {
            const stock = await this.inventoryRepository.findStock(productId);
            const warehouseStock = stock.find(s => s.warehouseId === warehouseId);

            if (!warehouseStock || warehouseStock.quantity < quantity) {
                throw new AppError("Insufficient stock", 400);
            }

            await this.inventoryRepository.decrementStock(productId, warehouseId, quantity);

        } finally {
            await redisClient.del(lockKey);
        }
    }

    async addStock(productId: string, warehouseId: string, quantity: number) {
        return this.inventoryRepository.addStock(productId, warehouseId, quantity);
    }

    async getStock(productId: string) {
        return this.inventoryRepository.findStock(productId);
    }
}