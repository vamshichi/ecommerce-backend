import { CartService } from "../cart/cart.service";
import { OrderService } from "../order/order.service";
import { AppError } from "../../common/errors/AppErrors";
import { CouponService } from "../coupon/coupon.service";
import prisma from "../../infrastructure/database/prisma";

export class CheckoutService {

  private cartService = new CartService();
  private orderService = new OrderService();
  private couponService = new CouponService();

  async checkout(userId: string, addressId: string, couponCode?: string) {

    const cart = await this.cartService.getCart(userId);

    if (!cart.items.length) {
      throw new AppError("Cart is empty", 400);
    }

    // Step 1 — Create order first
    const order = await this.orderService.createOrder(
      userId,
      cart.items,
      addressId
    );

    let discount = 0;

    // Step 2 — Apply coupon if provided
    if (couponCode) {

      const coupon = await this.couponService.validateCoupon(couponCode);

      discount = this.couponService.calculateDiscount(
        coupon,
        Number(order.totalAmount)
      );

      // Step 3 — Update order total after discount
      await prisma.order.update({
        where: { id: order.id },
        data: {
          totalAmount: Number(order.totalAmount) - discount
        }
      });

    }

    // Step 4 — Clear cart
    await this.cartService.clearCart(userId);

    return {
      ...order,
      discount
    };
  }
}