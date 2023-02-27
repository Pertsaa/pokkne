import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { ChatterServiceRouter } from "service-chatter";

const trpc = createTRPCProxyClient<ChatterServiceRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc",
    }),
  ],
});

async function main() {
  const res = await trpc.chat.query({ message: "msg" });
  console.log(res);
}

main();
