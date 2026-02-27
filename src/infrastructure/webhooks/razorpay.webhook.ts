import crypto from "crypto";
import prisma from "../database/prisma";
import { ORDER_PAID } from "../events/order.events";
import { eventBus } from "../events/event.bus";

export const handleRazorpayWebhook = async (req: any, res: any) => {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;

    const signature = req.headers["x-razorpay-signature"];

    const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(JSON.stringify(req.body))
        .digest("hex");

    if (signature !== expectedSignature) {
        return res.status(400).send("Invalid signature");
    }

    const event = req.body.event;

    if (event === "payment.captured") {
        const payment = req.body.payload.payment.entity;

        const order = await prisma.order.findFirst({
            where: { razorpayOrderId: payment.order_id },
            include: { items: true },
        });

        if (!order) return res.status(404).send("Order not found");

        if (order.status === "PAID") {
            return res.json({ status: "already processed" });
        }

        await prisma.$transaction(async (tx) => {
            for (const item of order.items) {
                await tx.inventory.update({
                    where: {
                        variantId_warehouseId: {
                            variantId: item.variantId,
                            warehouseId: item.warehouseId,
                        },
                    },
                    data: {
                        quantity: { decrement: item.quantity },
                        reserved: { decrement: item.quantity },
                    },
                });
            }

            await tx.order.update({
                where: { id: order.id },
                data: {
                    status: "PAID",
                    razorpayPaymentId: payment.id,
                },
            });
        });

        eventBus.emit(ORDER_PAID, {
            orderId: order.id,
            userId: order.userId,
        });
    }

    res.json({ status: "ok" });
};