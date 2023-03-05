import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { ChatterServiceRouter } from 'service-chatter/src/router';

export const trpcChatter = createTRPCProxyClient<ChatterServiceRouter>({
	links: [
		httpBatchLink({
			url: 'http://localhost:50051/trpc'
		})
	]
});
