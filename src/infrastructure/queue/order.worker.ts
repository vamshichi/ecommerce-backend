import { Worker } from "bullmq";
import { redisClient } from "../cache/redis.client";
import prisma from "../database/prisma";
import { ORDER_CANCELLED } from "../events/order.events";
import { eventBus } from "../events/event.bus";

new Worker(
    "order-expiration",
    async (job) => {
        const { orderId } = job.data;

        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: { items: true },
        });

        if (!order || order.status !== "PENDING_PAYMENT") return;

        await prisma.$transaction(async (tx) => {
            for (const item of order.items) {
                await tx.inventory.update({
                    where: {
                        productId_warehouseId: {
                            productId: item.productId,
                            warehouseId: item.warehouseId,
                        },
                    },
                    data: {
                        reserved: { decrement: item.quantity },
                    },
                });
            }

            await tx.order.update({
                where: { id: order.id },
                data: { status: "CANCELLED" },
            });

            eventBus.emit(ORDER_CANCELLED, {
                orderId: order.id,
            });
        });
    },

    { connection: redisClient.options }
);