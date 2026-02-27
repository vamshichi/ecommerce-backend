import Razorpay from "razorpay";
import { config } from "../../config/env";

export const razorpay = new Razorpay({
    key_id: config.razorpayKey!,
    key_secret: config.razorpaySecret!,
});