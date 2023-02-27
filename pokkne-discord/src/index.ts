import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { ChatterServiceRouter } from "service-chatter";
import { Client, Events, GatewayIntentBits } from "discord.js";
import * as dotenv from "dotenv";

dotenv.config();

const trpc = createTRPCProxyClient<ChatterServiceRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:50051/trpc",
    }),
  ],
});

async function main() {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  client.once(Events.ClientReady, (c) => {
    console.log(`Logged in as ${c.user.tag}`);
  });

  client.on(Events.MessageCreate, async (m) => {
    if (client.user && m.author.id === client.user.id) return;
    console.log(`Received message: ${m.content}`);
    const res = await trpc.chat.query({ message: m.content });
    m.reply(res);
  });

  client.login(process.env.TOKEN);
}

main();
