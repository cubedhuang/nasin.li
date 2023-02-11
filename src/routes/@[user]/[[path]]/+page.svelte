<script lang="ts">
	import type { PageData } from './$types';

	import Container from '$lib/components/Container.svelte';
	import NasinDisplay from './NasinDisplay.svelte';

	export let data: PageData;

	$: isDefaultPath = !data.full || data.nasin.path === '';

	$: pageName =
		isDefaultPath || !data.full ? data.user.name : data.nasin.name;
</script>

<Container>
	<div class="mt-12 flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-bold">{pageName}</h1>
			<h2 class="text-gray-500">
				@{data.user.url}{isDefaultPath || !data.full
					? ''
					: ` / ${data.nasin.path}`}
			</h2>
		</div>

		{#if data.user.image}
			<img
				src={data.user.image}
				alt="avatar"
				class="w-16 h-16 rounded-full shadow-lg
					relative after:absolute after:inset-0 after:bg-gray-200"
			/>
		{/if}
	</div>

	{#if data.owner}
		<div class="mt-8 p-4 box">
			<p>This is on your account!</p>

			<p class="mt-2 flex flex-wrap gap-2">
				<a
					href="/home"
					class="inline-block px-4 py-2 rounded-lg bg-blue-600 text-white font-bold"
				>
					Edit Profile
				</a>
			</p>
		</div>
	{/if}

	{#if data.user.nasin.length > 1}
		<h2 class="mt-8 text-2xl font-bold">kulupu</h2>

		{#if isDefaultPath}
			<div class="mt-4 flex flex-wrap gap-2">
				{#each data.user.nasin as nasin (nasin.path)}
					{#if nasin.path !== data.nasin?.path}
						<a
							href="/@{data.user.url}/{nasin.path}"
							class="box px-4 py-2 hover:shadow-lg transition"
						>
							<h3 class="font-bold">{nasin.name}</h3>
						</a>
					{/if}
				{/each}
			</div>
		{:else}
			<a
				href="/@{data.user.url}"
				class="mt-4 inline-block box px-4 py-2 hover:shadow-lg transition"
			>
				<h3 class="font-bold">{data.user.name}</h3>
			</a>
		{/if}
	{/if}

	{#if data.full}
		<NasinDisplay nasin={data.nasin} />
	{/if}
</Container>
