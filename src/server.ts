import { app } from "./app";
import { config } from "./config/env";
import prisma  from "./infrastructure/database/prisma";
import "./infrastructure/queue/order.worker";
import { initSocket } from "./infrastructure/realtime/socket.server";
// import "../modules/notification/order.listener";

const server = app.listen(config.port, () => {
  console.log(`Server running on ${config.port}`);
});

initSocket(server);

async function startServer() {
  try {
    await prisma.$connect();
    console.log("PostgreSQL connected");

    app.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
}

startServer();