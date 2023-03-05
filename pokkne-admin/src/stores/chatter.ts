import { writable } from 'svelte/store';
import { trpcChatter } from '../lib/trpc';

type ChatHistory = {
	id: number;
	message: string;
	response: string;
};

export const chatHistory = writable<ChatHistory[]>([]);

export async function fetchHistory() {
	const history = await trpcChatter.history.query();
	chatHistory.set(history);
}
