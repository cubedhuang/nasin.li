<script lang="ts">
	import Container from '$lib/components/Container.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Container>
	<h1 class="mt-12 text-3xl font-bold">nasin.li</h1>

	{#if data.session}
		<a
			href="/home"
			class="flex items-center gap-2 text-blue-600 hocus:text-blue-400 transition-colors"
		>
			{#if data.session.user?.image}
				<img
					src={data.session.user.image}
					alt="Profile"
					class="w-6 h-6 rounded-full"
				/>
			{/if}
			{data.session.user?.name ?? 'User'}
		</a>
	{:else}
		<a
			href="/login"
			class="text-blue-600 hocus:text-blue-400 transition-colors"
		>
			Log In
		</a>
	{/if}

	<p class="mt-4 p-4 box">
		The basic functionality is up and running, but there's still a lot to
		do. Updates will be coming within the next few days!
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

	<h2 class="mt-8 text-2xl font-bold">Some People</h2>

	<div class="mt-4 flex flex-wrap gap-2">
		{#each data.users as user}
			<a
				href="/@{user.url}"
				class="p-2 flex gap-2 bg-blue-600 text-white rounded-lg hocus:bg-blue-500 transition-colors"
			>
				{#if user.image}
					<img
						src={user.image}
						alt="Profile"
						class="w-6 h-6 rounded-full relative after:content-[''] after:absolute after:inset-0 after:bg-gray-200"
					/>
				{/if}
				{user.name}
			</a>
		{/each}
	</div>
</Container>
