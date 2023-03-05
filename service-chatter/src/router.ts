import { initTRPC } from "@trpc/server";
import { MessageValidator, OpinionValidator } from "./validator";
import { Context } from "./utils/trpcContext";

const t = initTRPC.context<Context>().create();

export const router = t.router({
  history: t.procedure.query(async ({ ctx }) => {
    const history = await ctx.prisma.chatHistory.findMany({
      select: {
        id: true,
        message: true,
        response: true,
      },
    });
    return history;
  }),

  chat: t.procedure
    .input(MessageValidator)
    .output(MessageValidator)
    .query(async ({ ctx, input }) => {
      const response = { message: `${input.message} -> chat` };
      await ctx.prisma.chatHistory.create({
        data: {
          message: input.message,
          response: response.message,
        },
      });
      return response;
    }),

  opinion: t.procedure
    .input(OpinionValidator)
    .output(MessageValidator)
    .query(async ({ ctx, input }) => {
      const response = { message: `${input.target} -> opinion` };
      await ctx.prisma.chatHistory.create({
        data: {
          message: input.target,
          response: response.message,
        },
      });
      return response;
    }),
});

export type ChatterServiceRouter = typeof router;
