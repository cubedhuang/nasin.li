<script lang="ts">
	import '../app.css';

	import { signIn, signOut } from '@auth/sveltekit/client';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<link rel="preconnect" href="https://rsms.me/" />
	<link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
</svelte:head>

<nav class="px-8 bg-slate-800 shadow-lg">
	<ul
		class="max-w-3xl mx-auto py-4 flex items-center justify-between gap-4 font-bold text-white text-lg"
	>
		<li>
			<a href="/">nasin.li</a>
		</li>
		<li>
			<!-- <a href="/login">login</a> -->
			{#if data.session}
				<a href="/profile" class="flex items-center gap-2">
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
		</li>
	</ul>
</nav>

<div class="px-8 py-8">
	<div class="max-w-3xl mx-auto">
		<slot />
	</div>
</div>
