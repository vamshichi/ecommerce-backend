import prisma from "../../infrastructure/database/prisma";

export class AddressRepository {

  async create(data: any) {
    return prisma.address.create({ data });
  }

  async findByUser(userId: string) {
    return prisma.address.findMany({
      where: { userId }
    });
  }

  async delete(id: string, userId: string) {
    return prisma.address.delete({
      where: { id }
    });
  }

}