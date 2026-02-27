import prisma from "../../infrastructure/database/prisma";

export class VariantRepository {
    async create(data: any) {
        return await prisma.productVariant.create({
            data
        });
    }

    async findByProduct(productId: string) {
    return prisma.productVariant.findMany({
      where: { productId }
    });
    }
}
