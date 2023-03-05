import { z } from "zod";

export const MessageValidator = z.object({
  message: z.string(),
});

export const OpinionValidator = z.object({
  target: z.string(),
});
