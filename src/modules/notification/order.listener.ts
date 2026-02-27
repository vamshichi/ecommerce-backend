// import { eventBus } from "../../infrastructure/events/event.bus";
// import { EmailService } from "./email.service";
// import prisma from "../../infrastructure/database/prisma";

// eventBus.on("ORDER_PAID", async ({ orderId }) => {

//   const order = await prisma.order.findUnique({
//     where: { id: orderId },
//     include: { user: true }
//   });

//   if (!order) return;

//   await EmailService.sendOrderPlaced(
//     order.user.email,
//     order.id
//   );

// });