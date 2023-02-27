import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { z } from "zod";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  return {
    req,
    res,
  };
};

type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

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

async function main() {
  const app = express();

  app.use((req, _res, next) => {
    console.log("⬅️ ", req.method, req.path, req.body ?? req.query);
    next();
  });

  app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  app.listen(50051, () => {
    console.log("listening on port 50051");
  });
}

main();
