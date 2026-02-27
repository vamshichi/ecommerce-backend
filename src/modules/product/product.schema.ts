import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  price: z.number().positive(),
  weight: z.number().positive(),
});