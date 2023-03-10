<script lang="ts">
	import { slide } from 'svelte/transition';

	import type { PageData } from './$types';

	import Markdown from '$lib/components/Markdown.svelte';

	export let nasin: NonNullable<PageData['nasin']>;

	$: details = nasin.details.map(detail => ({
		...detail,
		open: false
	}));
</script>

{#if nasin.commentary}
	<h2 class="mt-8 text-2xl font-bold">sona</h2>

	<div class="mt-4 box p-6">
		<Markdown source={nasin.commentary} />
	</div>
{/if}

{#each details as detail (detail.title)}
	<div class="mt-4 box p-6">
		<div class="flex items-center gap-2">
			<button
				type="button"
				class="flex-1 overflow-hidden flex items-center gap-2 cursor-pointer"
				on:click={() => {
					detail.open = !detail.open;
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					class="shrink-0 w-5 h-5 transition-transform"
					class:rotate-90={detail.open}
				>
					<path
						fill-rule="evenodd"
						d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
						clip-rule="evenodd"
					/>
				</svg>

				<h3
					class="max-w-full font-bold md:text-lg whitespace-nowrap overflow-hidden text-ellipsis"
				>
					{detail.title}
				</h3>
			</button>
		</div>

		{#if detail.open}
			<div transition:slide|local={{ duration: 450 }} class="mt-4">
				<Markdown source={detail.content} />
			</div>
		{/if}
	</div>
{/each}

{#if nasin.nimi.length}
	<h2 class="mt-8 text-2xl font-bold">
		nimi
		<span class="text-sm font-normal text-gray-500">
			({nasin.nimi.length})
		</span>
	</h2>

	<div class="mt-4 grid md:grid-cols-2 gap-4">
		{#each nasin.nimi as word (word.nimi)}
			<div class="p-4 box">
				<h3 class="text-xl font-bold">{word.nimi}</h3>

				<p class="text-xs text-gray-500">
					{word.type.length ? word.type.join(' · ') : 'UNSPECIFIED'}
				</p>

				<Markdown source={word.definition} class="mt-2" />

				{#if word.commentary}
					<Markdown
						source={word.commentary}
						class="mt-2 border-l-4 border-gray-200 pl-4 prose-sm"
					/>
				{/if}
			</div>
		{/each}
	</div>
{/if}
