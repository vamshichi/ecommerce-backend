import prisma from "../../infrastructure/database/prisma";

export class WarehouseRepository {
    async create(data: any) {
        return await prisma.warehouse.create({
            data
        })
    }

    async findAll() {
        return await prisma.warehouse.findMany();
    }

};