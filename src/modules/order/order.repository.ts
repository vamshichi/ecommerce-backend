import prisma from "../../infrastructure/database/prisma";

export class CouponRepository {

   async findAllOrders() {
  return prisma.order.findMany({
    include: {
      items: true,
      user: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
}


}