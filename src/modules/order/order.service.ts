import prisma from "../../infrastructure/database/prisma";
import { AppError } from "../../common/errors/AppErrors";
import { razorpay } from "../../infrastructure/payments/razorpay.client";

export class OrderService {

  async getAllOrders() {
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

async createOrder(userId: string, items: any[] ,addressId: string) {
  return prisma.$transaction(async (tx) => {
    const address = await tx.address.findUnique({
      where: { id: addressId }
    });

    if (!address) {
      throw new AppError("Invalid address", 400);
    }
      let totalAmount = 0;
      const orderItemsData: any[] = [];

      for (const item of items) {
        const { variantId, quantity } = item;

        const stocks = await tx.inventory.findMany({
          where: { variantId },
          orderBy: { quantity: "desc" },
        });

        const selectedWarehouse = stocks.find(
          (s) => (s.quantity - s.reserved) >= quantity
        );

        if (!selectedWarehouse) {
          throw new AppError("Out of stock", 400);
        }

        const product = await tx.product.findUnique({
          where: { id: selectedWarehouse.variantId },
        });

        if (!product) {
          throw new AppError("Product not found", 404);
        }

        totalAmount += Number(product.price) * quantity;

        await tx.inventory.update({
          where: {
            variantId_warehouseId: {
              variantId,
              warehouseId: selectedWarehouse.warehouseId,
            },
          },
          data: {
            reserved: { increment: quantity },
          },
        });

        orderItemsData.push({
          variantId,
          warehouseId: selectedWarehouse.warehouseId,
          quantity,
          price: product.price,
        });
      }

      const order = await tx.order.create({
        data: {
          userId,
          totalAmount,
          status: "PENDING_PAYMENT",
          items: { create: orderItemsData },
        },
        include: { items: true },
      });

      const razorpayOrder = await razorpay.orders.create({
        amount: Math.round(totalAmount * 100),
        currency: "INR",
        receipt: order.id,
      });

      await tx.order.update({
        where: { id: order.id },
        data: { razorpayOrderId: razorpayOrder.id },
      });

      return {
        ...order,
        razorpayOrderId: razorpayOrder.id,
      };
    });
  }

  async updateOrderStatus(orderId: string, status: string) {

  return prisma.order.update({
    where: { id: orderId },
    data: { status: status as any }
  });

}

async getAdminStats() {

  const users = await prisma.user.count();

  const orders = await prisma.order.count();

  const revenue = await prisma.order.aggregate({
    _sum: {
      totalAmount: true
    }
  });

  return {
    users,
    orders,
    revenue: revenue._sum.totalAmount || 0
  };
}
}