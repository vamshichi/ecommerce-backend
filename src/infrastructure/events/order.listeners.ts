import { eventBus } from "./event.bus";
import { ORDER_PAID, ORDER_CREATED, ORDER_CANCELLED } from "./order.events";
import { getIO } from "../realtime/socket.server";

eventBus.on(ORDER_CREATED, (data) => {
  const io = getIO();
  io.emit("order-created", data);
});

eventBus.on(ORDER_PAID, (data) => {
  const io = getIO();
  io.emit("order-paid", data);
});

eventBus.on(ORDER_CANCELLED, (data) => {
  const io = getIO();
  io.emit("order-cancelled", data);
});