import { CouponRepository } from "./coupon.repository";
import { AppError } from "../../common/errors/AppErrors";

export class CouponService {

  private repo = new CouponRepository();

  async validateCoupon(code: string) {

    const coupon = await this.repo.findByCode(code);

    if (!coupon) {
      throw new AppError("Invalid coupon", 400);
    }

    if (coupon.expiresAt && coupon.expiresAt < new Date()) {
      throw new AppError("Coupon expired", 400);
    }

    if (coupon.maxUsage && coupon.usedCount >= coupon.maxUsage) {
      throw new AppError("Coupon usage limit reached", 400);
    }

    return coupon;
  }

  calculateDiscount(coupon: any, amount: number) {

    if (coupon.type === "PERCENTAGE") {
      return (amount * coupon.value) / 100;
    }

    if (coupon.type === "FIXED") {
      return coupon.value;
    }

    return 0;
  }

}