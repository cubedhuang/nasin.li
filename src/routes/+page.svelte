<script lang="ts">
	import Container from '$lib/components/Container.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Container>
	<h1 class="text-3xl font-bold">nasin.li</h1>

	{#if data.session}
		<a href="/home" class="flex items-center gap-2">
			{#if data.session.user?.image}
				<img
					src={data.session.user.image}
					alt="Profile"
					class="w-6 h-6 rounded-lg"
				/>
			{/if}
			{data.session.user?.name ?? 'User'}
		</a>
	{:else}
		<a href="/login">Log In</a>
	{/if}

	<p>
		Nothing is like implemented yet but you can check out the editor if u
		want
	</p>

	<p class="mt-4">
		o kama pona tawa lipu <b>nasin.li</b>! lipu ni la, sina ken toki e nasin
		sina pi toki pona.
	</p>

	<p class="mt-2">
		sina wile open la, o tawa
		<a href="/login" class="text-blue-500 hocus:text-blue-600">lipu open</a
		>!
	</p>

	<p class="mt-4">
		Welcome to <b>nasin.li</b>! This site lets you show people your nasin pi
		toki pona.
	</p>

	<p class="mt-2">
		To start,
		<a href="/login" class="text-blue-500 hocus:text-blue-600">log in</a>!
	</p>
</Container>
