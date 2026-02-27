import prisma from "../../infrastructure/database/prisma";


export class ProductRepository {
   async collectCategoryIds(categoryId: string): Promise<string[]> {
  const children = await prisma.category.findMany({
    where: { parentId: categoryId }
  });

  let ids = [categoryId];

  for (const child of children) {
    const subIds = await this.collectCategoryIds(child.id);
    ids = ids.concat(subIds);
  }

  return ids;
} 
  
   async searchProducts(query: any) {
  const {
    search,
    minPrice,
    maxPrice,
    categoryId,
    page = 1,
    limit = 10,
    sort,
  } = query;

  const where: any = {};

  if (search) {
    where.name = {
      contains: search,
      mode: "insensitive",
    };
  }

 if (categoryId) {
  const ids = await this.collectCategoryIds(categoryId);

  where.categoryId = {
    in: ids
  };
}

  if (minPrice || maxPrice) {
    where.price = {};

    if (minPrice) where.price.gte = Number(minPrice);
    if (maxPrice) where.price.lte = Number(maxPrice);
  }

  const orderBy: any = {};

  if (sort === "price_asc") orderBy.price = "asc";
  if (sort === "price_desc") orderBy.price = "desc";

  return prisma.product.findMany({
    where,
    orderBy,
    skip: (page - 1) * limit,
    take: Number(limit),
    include: {
      category: true,
    },
  });
}

    async create(data: any) {
        return await prisma.product.create({
            data
        })
    }

    async findAll() {
        return await prisma.product.findMany({
            include: {
              variants:{
                include: {
                inventory: true
                }
              }
                
            }
        })
    }  

};