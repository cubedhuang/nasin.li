<script lang="ts">
	import Container from '$lib/components/Container.svelte';
	import Meta from '$lib/components/Meta.svelte';
	import { signIn } from '@auth/sveltekit/client';
	import Discord from './Discord.svelte';
</script>

<Meta
	title="open – nasin.li"
	description="lipu ni la, sina ken open pali e lipu nasin."
/>

<Container>
	<h1 class="mt-12 text-3xl font-bold">o open</h1>

	<button
		on:click={() => signIn('discord')}
		class="mt-4 flex items-center gap-2 bg-[#5865f2] text-white px-4 py-2 rounded-lg
			hocus:bg-[#4752c4] transition-colors"
	>
		<Discord /> o open kepeken ilo Discord
	</button>
</Container>
