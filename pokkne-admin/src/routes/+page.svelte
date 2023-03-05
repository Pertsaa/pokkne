<script>
	import { onMount } from 'svelte';
	import { chatHistory, fetchHistory } from '../stores/chatter';

	onMount(() => {
		fetchHistory();
	});
</script>

<h1>Admin {$chatHistory.length}</h1>

<ul>
	{#each $chatHistory as entry (entry.id)}
		<li>
			<div>
				<div>Message: {entry.message}</div>
				<div>Response: {entry.response}</div>
			</div>
		</li>
	{/each}
</ul>
