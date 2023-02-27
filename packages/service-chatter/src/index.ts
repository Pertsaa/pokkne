import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();
const router = t.router;
const publicProcedure = t.procedure;

const appRouter = router({
  chat: publicProcedure
    .input(
      z.object({
        message: z.string(),
      })
    )
    .query((req) => {
      const msg = req.input.message;
      return `${msg} -> chat`;
    }),
  opinion: publicProcedure
    .input(
      z.object({
        target: z.string(),
      })
    )
    .query((req) => {
      const target = req.input.target;
      return `${target} -> opinion`;
    }),
});

export type ChatterServiceRouter = typeof appRouter;
