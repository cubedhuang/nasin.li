<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1 class="mt-8 text-2xl font-bold">Linked Account</h1>

<div class="mt-2 p-4 flex items-center rounded-lg bg-[#2f3136] text-white ">
	{#if data.discordUser.avatar}
		<img
			src="https://cdn.discordapp.com/avatars/{data.discordUser.id}/{data
				.discordUser.avatar}.png"
			alt="avatar"
			class="w-16 h-16 rounded-full mr-4"
		/>
	{/if}

	<div>
		<h2 class="font-bold">Discord</h2>
		{data.discordUser.username}<span class="opacity-80"
			>#{data.discordUser.discriminator}</span
		>
	</div>
</div>

<button
	on:click={() => signOut()}
	class="mt-8 flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg"
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
