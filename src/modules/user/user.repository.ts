import prisma  from "../../infrastructure/database/prisma";
import { User } from "@prisma/client";

export class UserRepository {
    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({ where: { email } });
    }

    async createUser(data:{
        email: string;
        password: string;
        role?:"CUSTOMER" | "ADMIN" | "WAREHOUSE_MANAGER";
    }): Promise<User> {
        return prisma.user.create({ data });
    }

    async getAllUsers(): Promise<User[]> {
        return prisma.user.findMany();
    }
};