import { initTRPC } from "@trpc/server";
import { MessageValidator, OpinionValidator } from "./validator";
import { Context } from "./utils/trpcContext";

const t = initTRPC.context<Context>().create();

const publicProcedure = t.procedure;

export const router = t.router({
  history: publicProcedure.query(async ({ ctx }) => {
    const history = await ctx.prisma.chatHistory.findMany();
    return history;
  }),
  chat: publicProcedure.input(MessageValidator).query(({ input }) => {
    return { message: `${input.message} -> chat` };
  }),
  opinion: publicProcedure.input(OpinionValidator).query(({ input }) => {
    return { message: `${input.target} -> opinion` };
  }),
});

export type ChatterServiceRouter = typeof router;
