import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { router } from "./router";
import { createContext } from "./utils/trpcContext";
import cors from "cors";

async function main() {
  const app = express();
  app.use(cors());

  app.use((req, _res, next) => {
    console.log("⬅️ ", req.method, req.path, req.body ?? req.query);
    next();
  });

  app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
      router,
      createContext,
    })
  );

  app.listen(50051, () => {
    console.log("listening on port 50051");
  });
}

main();
