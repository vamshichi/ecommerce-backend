import prisma from "../../infrastructure/database/prisma";


export class CategoryRepository {

    async findTree() {
  return prisma.category.findMany({
    where: { parentId: null },
    include: {
      children: {
        include: {
          children: true
        }
      }
    }
  });
}

    async create(data: { name: string, parentId?: string }) {
        return await prisma.category.create({
            data
        });
    }

    async findAll() {
        return await prisma.category.findMany();
    }

};