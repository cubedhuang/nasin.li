<script lang="ts">
	import { slide } from 'svelte/transition';

	import { dev } from '$app/environment';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	import { NimiType } from '$lib/enums';
	import { key, nimiSin } from '$lib/util';
	import {
		formatError,
		nasinDataSchema,
		nasinDetailsDataSchema,
		nimiDataSchema
	} from '$lib/validators';

	import starter from './pu.json';

	import Container from '$lib/components/Container.svelte';
	import Markdown from '$lib/components/Markdown.svelte';
	import Popup from '$lib/components/Popup.svelte';
	import BigInput from './BigInput.svelte';
	import MarkdownPreview from './MarkdownPreview.svelte';
	import Textarea from '$lib/components/Textarea.svelte';

	export let data: PageData;

	enum Stage {
		Starting,
		Working
	}

	let stage = data.nasin ? Stage.Working : Stage.Starting;

	interface NasinDetailsData {
		key: string;
		title: string;
		content: string;
		open: boolean;
	}

	interface NimiData {
		key: string;
		nimi: string;
		type: NimiType[];
		definition: string;
		commentary: string | null;
	}

	let commentary =
		data.nasin?.commentary ??
		`sina ken sitelen e nasin sina pi toki pona e sona nasa lon lipu ni.

sina ken kepeken **ilo Markdown** tawa lipu ni!

---

you can write about the way you use toki pona or your understanding of toki pona here.

this page supports **Markdown**!`;

	let details: NasinDetailsData[] =
		data.nasin?.details.map(d => ({
			...d,
			key: key(),
			open: false
		})) ?? [];

	let words: NimiData[] =
		data.nasin?.nimi.map(n => ({
			...n,
			key: `${n.id}`
		})) ?? [];

	let openWord: string | null = null;

	let error: string | null = null;
	let saved = false;

	async function save() {
		if (saved) return;

		saved = true;
		error = null;

		const nasinData = {
			commentary,
			details,
			nimi: words
		};

		const value = nasinDataSchema.safeParse(nasinData);

		if (!value.success) {
			saved = false;
			error = formatError(value.error);
			return;
		}

		const response = await fetch('/api/nasin', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(value.data)
		});

		if (!response.ok) {
			const e = await response.json();

			saved = false;
			error = `${e?.message ?? e}` || 'Unknown error';

			return;
		}

		if (error) return;

		goto(data.user.url ? `/@${data.user.url}` : '/home');
	}
</script>

<svelte:window
	on:beforeunload={e => {
		if (!dev && !saved && stage === Stage.Working) {
			e.preventDefault();
			e.returnValue = '';
		}
	}}
/>

{#if stage === Stage.Starting}
	<div
		class="min-h-screen grid place-items-center
			bg-gradient-to-br from-blue-700 to-blue-900 text-white"
	>
		<Container>
			<h1 class="text-3xl font-bold">o pali e lipu pi nasin sina</h1>

			<button
				type="button"
				on:click={() => {
					stage = Stage.Working;

					// @ts-expect-error starter is a valid NimiData[]
					words = starter.map(n => ({
						...n,
						key: key()
					}));
				}}
				class="block mt-4 px-4 py-2 rounded-lg bg-white text-black font-bold"
			>
				o open kepeken nasin pu!
			</button>

			<button
				type="button"
				on:click={() => {
					stage = Stage.Working;
				}}
				class="block mt-2 px-4 py-2 rounded-lg bg-white text-black font-bold"
			>
				o open sin!
			</button>
		</Container>
	</div>
{:else if stage === Stage.Working}
	<Container>
		<h1 class="mt-12 text-3xl font-bold">nasin mi</h1>

		<p
			class="mt-8 px-8 py-4 flex items-center justify-between gap-4
				rounded-lg bg-gradient-to-br from-blue-600 to-blue-700"
		>
			<a href="/home" class="text-white font-bold" data-sveltekit-reload>
				Cancel
			</a>

			<button
				type="button"
				class="px-4 py-2 rounded-lg bg-white text-black font-bold
					disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
				disabled={saved}
				on:click={save}
			>
				Save
			</button>
		</p>

		{#if error}
			<p class="mt-4 text-sm text-red-500 whitespace-pre-wrap">
				{error}
			</p>
		{/if}

		<h2 class="mt-8 text-2xl font-bold">sona</h2>

		<MarkdownPreview bind:value={commentary} />

		{#each details as detail, index (detail.key)}
			{@const parsed = nasinDetailsDataSchema.safeParse(detail)}
			{@const error = !parsed.success && parsed.error}

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

					{#if index !== details.length - 1}
						<button
							type="button"
							class="p-1 bg-white rounded-lg text-gray-800 hocus:text-blue-500
								border border-gray-200 hocus:border-blue-500 transition-colors"
							on:click={() => {
								[details[index], details[index + 1]] = [
									details[index + 1],
									details[index]
								];

								details = details;
							}}
						>
							<span class="sr-only">Move Down</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								class="w-5 h-5"
							>
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v4.59L7.3 9.24a.75.75 0 00-1.1 1.02l3.25 3.5a.75.75 0 001.1 0l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V6.75z"
									clip-rule="evenodd"
								/>
							</svg>
						</button>
					{/if}

					{#if index !== 0}
						<button
							type="button"
							class="p-1 bg-white rounded-lg text-gray-800 hocus:text-blue-500
								border border-gray-200 hocus:border-blue-500 transition-colors"
							on:click={() => {
								[details[index], details[index - 1]] = [
									details[index - 1],
									details[index]
								];

								details = details;
							}}
						>
							<span class="sr-only">Move Up</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								class="w-5 h-5"
							>
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-4.75a.75.75 0 001.5 0V8.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0L6.2 9.74a.75.75 0 101.1 1.02l1.95-2.1v4.59z"
									clip-rule="evenodd"
								/>
							</svg>
						</button>
					{/if}

					<button
						type="button"
						class="p-1 bg-white rounded-lg text-gray-800 hocus:text-red-500
							border border-gray-200 hocus:border-red-500 transition-colors"
						on:click={() => {
							details = details.filter(d => d.key !== detail.key);
						}}
					>
						<span class="sr-only">Delete</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							class="w-5 h-5"
						>
							<path
								fill-rule="evenodd"
								d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>
				</div>

				{#if detail.open}
					<div
						transition:slide|local={{ duration: 450 }}
						class="mt-4"
					>
						<BigInput bind:value={detail.title} wide />
						<MarkdownPreview bind:value={detail.content} short />
					</div>
				{/if}

				{#if error}
					<p class="mt-4 text-xs text-red-500 whitespace-pre-wrap">
						{formatError(error)}
					</p>
				{/if}
			</div>
		{/each}

		<button
			type="button"
			class="mt-4 p-4 w-full box grid place-items-center hover:scale-[1.02] transition"
			on:click={() => {
				details = [
					...details,
					{
						key: key(),
						title: 'sona sin',
						content: 'o sitelen lon ni!',
						open: true
					}
				];
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				class="w-6 h-6"
			>
				<path
					fill-rule="evenodd"
					d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>

		<h2 class="mt-8 text-2xl font-bold">
			nimi
			<span class="text-sm font-normal text-gray-500">
				({words.length})
			</span>
		</h2>

		<div class="mt-2 grid md:grid-cols-2 gap-4">
			{#each words as word (word.key)}
				{@const parsed = nimiDataSchema.safeParse(word)}
				{@const error = !parsed.success && parsed.error}

				<button
					type="button"
					class="p-4 flex flex-col text-left box
						hover:scale-[1.02] transition"
					class:shadow-lg={word.key === openWord}
					class:border-red-500={!nimiDataSchema.safeParse(word)
						.success}
					on:click={() => {
						openWord = word.key === openWord ? null : word.key;
					}}
				>
					<h3 class="text-xl font-bold">{word.nimi}</h3>

					<p class="text-xs text-gray-500">
						{word.type.length
							? word.type.join(' · ')
							: 'UNSPECIFIED'}
					</p>

					<Markdown source={word.definition} class="mt-2" />

					{#if word.commentary}
						<Markdown
							source={word.commentary}
							class="mt-2 border-l-4 border-gray-200 pl-4 prose-sm"
						/>
					{/if}

					{#if error}
						<p
							class="mt-2 text-xs text-red-500 whitespace-pre-wrap"
						>
							{formatError(error)}
						</p>
					{/if}
				</button>
			{/each}

			<button
				type="button"
				class="p-4 box grid place-items-center hover:scale-[1.02] transition"
				on:click={() => {
					const newKey = key();
					words = [
						...words,
						{
							key: newKey,
							nimi: nimiSin(),
							type: ['CONTENT'],
							definition: 'sona pi nimi ni',
							commentary: null
						}
					];
					openWord = newKey;
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="w-6 h-6"
				>
					<path
						fill-rule="evenodd"
						d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
		</div>
	</Container>
{/if}

<Popup value={openWord} let:value={wordKey}>
	<!-- Store the key rather than index to prevent errors if stuff is reordered or removed -->
	{@const index = words.findIndex(w => w.key === wordKey)}

	<div class="flex justify-end gap-2">
		<button
			type="button"
			class="p-1 bg-white rounded-lg text-gray-800 hocus:text-red-500
				border border-gray-200 hocus:border-red-500 transition-colors"
			on:click={() => {
				words = words.filter((_, i) => i !== index);
				openWord = null;
			}}
		>
			<span class="sr-only">Delete</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				class="w-5 h-5"
			>
				<path
					fill-rule="evenodd"
					d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>

		<button
			type="button"
			class="p-1 bg-white rounded-lg text-gray-800 hocus:text-blue-500
				border border-gray-200 hocus:border-blue-500 transition-colors"
			on:click={() => {
				const newKey = key();
				words = [
					...words.slice(0, index + 1),
					{
						key: newKey,
						nimi: words[index].nimi,
						type: words[index].type,
						definition: words[index].definition,
						commentary: words[index].commentary
					},
					...words.slice(index + 1)
				];
				openWord = newKey;
			}}
		>
			<span class="sr-only">Copy</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				class="w-5 h-5"
			>
				<path
					d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z"
				/>
				<path
					d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z"
				/>
			</svg>
		</button>

		<button
			type="button"
			class="p-1 bg-white rounded-lg text-gray-800 hocus:text-blue-500
				border border-gray-200 hocus:border-blue-500 transition-colors"
			on:click={() => {
				openWord = null;
			}}
		>
			<span class="sr-only">Done</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				class="w-5 h-5"
			>
				<path
					fill-rule="evenodd"
					d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
	</div>

	<div class="mt-4">
		<h3 class="sr-only">Word</h3>
		<BigInput bind:value={words[index].nimi} />
	</div>

	<div class="mt-4 flex flex-wrap gap-1 text-sm">
		<h3 class="sr-only">Part of Speech</h3>
		{#each Object.keys(NimiType) as type (type)}
			<label class="cursor-pointer">
				<input
					type="checkbox"
					bind:group={words[index].type}
					value={type}
					class="peer sr-only"
				/>
				<span
					class="block px-2 py-1
						rounded-lg bg-white border border-gray-200
						peer-hocus:border-blue-500 peer-focus-visible:ring-2 ring-blue-500 ring-offset-2
						peer-checked:bg-blue-500 peer-checked:border-blue-500 peer-checked:text-white
						transition-colors"
				>
					{type}
				</span>
			</label>
		{/each}
	</div>

	<div class="mt-4">
		<b>Definition</b>
		<Textarea bind:value={words[index].definition} />
	</div>

	<div class="mt-2">
		<b>Commentary</b>
		<Textarea bind:value={words[index].commentary} />
	</div>
</Popup>
