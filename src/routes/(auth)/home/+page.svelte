<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';

	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	import { formatError, userDataSchema } from '$lib/validators';

	import Container from '$lib/components/Container.svelte';

	export let data: PageData;

	let name = data.user.name ?? '';
	let url = data.user.url ?? '';

	let error: string | null = null;
	let saved = false;

	async function save() {
		if (saved) return;

		saved = true;
		error = null;

		const userData = {
			name,
			url
		};

		const value = userDataSchema.safeParse(userData);

		if (!value.success) {
			saved = false;
			error = formatError(value.error);
			return;
		}

		const response = await fetch('/api/user', {
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

		goto(`@${userData.url}`);
	}
</script>

<Container>
	<h1 class="mt-12 text-3xl font-bold">Home</h1>

	<p class="mt-4 flex flex-wrap gap-2">
		<a
			href="/create"
			class="inline-block px-4 py-2 rounded-lg bg-blue-600 text-white font-bold"
		>
			Edit my Nasin
		</a>

		{#if data.user.url}
			<a
				href={`/@${data.user.url}`}
				class="px-4 py-2 flex items-center gap-2 rounded-lg bg-blue-600 text-white font-bold"
			>
				View my Profile
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					class="w-5 h-5"
				>
					<path
						fill-rule="evenodd"
						d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
						clip-rule="evenodd"
					/>
					<path
						fill-rule="evenodd"
						d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
						clip-rule="evenodd"
					/>
				</svg>
			</a>
		{/if}
	</p>

	<h1 class="mt-8 text-2xl font-bold">User Settings</h1>

	<label>
		<h2 class="mt-4 font-bold">Display Name</h2>

		<p class="mt-2 w-fit p-2 box flex items-baseline">
			<input
				type="text"
				placeholder="url"
				bind:value={name}
				class="px-2 py-1 rounded-lg text-gray-900 border-transparent focus:ring-0 focus:border-blue-500 transition-colors"
				spellcheck="false"
			/>
		</p>
	</label>

	<label>
		<h2 class="mt-4 font-bold">URL</h2>

		<p class="mt-2 w-fit px-4 py-2 box flex items-baseline">
			https://nasin.li/@
			<input
				type="text"
				placeholder="url"
				bind:value={url}
				class="px-2 py-1 rounded-lg text-gray-900 border-transparent focus:ring-0 focus:border-blue-500 transition-colors"
				spellcheck="false"
			/>
		</p>
	</label>

	{#if error}
		<p class="mt-2 text-sm text-red-500 whitespace-pre-wrap">{error}</p>
	{/if}

	<button
		type="button"
		class="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white font-bold
			disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
		disabled={saved}
		on:click={save}
	>
		Save
	</button>

	<h1 class="mt-8 text-2xl font-bold">Linked Account</h1>

	<div
		class="mt-2 p-4 max-w-md flex items-center rounded-lg bg-[#2f3136] text-white"
	>
		{#if data.discordUser.avatar}
			<img
				src="https://cdn.discordapp.com/avatars/{data.discordUser
					.id}/{data.discordUser.avatar}.png"
				alt="avatar"
				class="w-16 h-16 rounded-full mr-4"
			/>
		{/if}

		<div>
			<h2 class="font-bold">Discord</h2>
			<p>
				{data.discordUser.username}<span class="text-gray-400"
					>#{data.discordUser.discriminator}</span
				>
			</p>
			<p class="text-xs text-gray-400">
				{data.discordUser.id}
			</p>
		</div>
	</div>

	<button
		on:click={() => signOut()}
		class="mt-8 px-4 py-2 flex items-center gap-2 bg-red-600 text-white rounded-lg"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="currentColor"
			class="w-6 h-6"
		>
			<path
				fill-rule="evenodd"
				d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
				clip-rule="evenodd"
			/>
		</svg>

		Sign Out
	</button>
</Container>
