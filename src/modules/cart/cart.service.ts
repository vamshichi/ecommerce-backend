import { redisClient } from "../../infrastructure/cache/redis.client";

export class CartService {

  private cartKey(userId: string) {
    return `cart:${userId}`;
  }

  async getCart(userId: string) {
    const cart = await redisClient.get(this.cartKey(userId));
    return cart ? JSON.parse(cart) : { items: [] };
  }

  async addItem(userId: string, variantId: string, quantity: number) {

    const cart = await this.getCart(userId);

    const existing = cart.items.find(
      (i: any) => i.variantId === variantId
    );

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({ variantId, quantity });
    }

    await redisClient.set(
      this.cartKey(userId),
      JSON.stringify(cart),
      "EX",
      60 * 60 * 24
    );

    return cart;
  }

  async removeItem(userId: string, variantId: string) {

    const cart = await this.getCart(userId);

    cart.items = cart.items.filter(
      (i: any) => i.variantId !== variantId
    );

    await redisClient.set(this.cartKey(userId), JSON.stringify(cart));

    return cart;
  }

  async clearCart(userId: string) {
    await redisClient.del(this.cartKey(userId));
  }

}