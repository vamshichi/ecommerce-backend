import { mailer } from "../../infrastructure/email/mailer";

export class EmailService {
    static async sendOrderPlaced(email : string, orderId: string) {
        await mailer.sendMail({
            to: email,
            subject: "Order Placed Successfully",
            html:` <h2>Your order has been placed</h2>
        <p>Order ID: ${orderId}</p>
        <p>Thank you for shopping with us!</p>`
        });
    }

     async sendOrderShipped(email: string, orderId: string) {

    await mailer.sendMail({
      to: email,
      subject: "Order Shipped",
      html: `
        <h2>Your order is on the way 🚚</h2>
        <p>Order ID: ${orderId}</p>
      `
    });

  }
  
  async sendOrderDelivered(email: string, orderId: string) {

    await mailer.sendMail({
      to: email,
      subject: "Order Delivered",
      html: `
        <h2>Your order has been delivered</h2>
        <p>Order ID: ${orderId}</p>
      `
    });

  }
}