import { ProductRepository } from "./product.respository";
import { redisClient } from "../../infrastructure/cache/redis.client";

export class ProductService {
    private productRepository = new ProductRepository();

    async create(data: any) {
        const product = await this.productRepository.create(data);

        await redisClient.del("products:all");

        return product;
    }

    async findAll() {
        const cacheKey = "products:all";
        const cached = await redisClient.get(cacheKey);
        if (cached) {
            return JSON.parse(cached);
        }

        const products = await this.productRepository.findAll();

        await redisClient.set(cacheKey, JSON.stringify(products), "EX", 60);

        return products;
    }

    async searchProducts(query: any) {
        return await this.productRepository.searchProducts(query);
    }

};