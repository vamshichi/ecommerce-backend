import prisma from "../../infrastructure/database/prisma";

export class InventoryRepository {

  async addStock(variantId: string, warehouseId: string, quantity: number) {
    return prisma.inventory.upsert({
      where: {
        variantId_warehouseId: {
          variantId,
          warehouseId,
        },
      },
      update: {
        quantity: {
          increment: quantity,
        },
      },
      create: {
        variantId,
        warehouseId,
        quantity,
      },
    });
  }

  async findStock(variantId: string) {
    return prisma.inventory.findMany({
      where: { variantId },
    });
  }

  async decrementStock(
    variantId: string,
    warehouseId: string,
    quantity: number
  ) {
    return prisma.inventory.update({
      where: {
        variantId_warehouseId: {
          variantId,
          warehouseId,
        },
      },
      data: {
        quantity: {
          decrement: quantity,
        },
      },
    });
  }

}