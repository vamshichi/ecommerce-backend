import prisma from "../../infrastructure/database/prisma";

export class CouponRepository {

  async findByCode(code: string) {
    return prisma.coupon.findUnique({
      where: { code }
    });
  }

  async incrementUsage(id: string) {
    return prisma.coupon.update({
      where: { id },
      data: {
        usedCount: { increment: 1 }
      }
    });
  }

  async create(data: any) {
    return prisma.coupon.create({ data });
  }

}