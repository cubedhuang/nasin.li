<script lang="ts">
	import Container from '$lib/components/Container.svelte';
	import { signIn } from '@auth/sveltekit/client';
	import Discord from './Discord.svelte';
</script>

<Container>
	<h1 class="mt-12 text-3xl font-bold">Log In</h1>

	<button
		on:click={() => signIn('discord')}
		class="mt-4 flex items-center gap-2 bg-[#5865f2] text-white px-4 py-2 rounded-lg
			hocus:bg-[#4752c4] transition-colors"
	>
		<Discord /> Log In with Discord
	</button>
</Container>
