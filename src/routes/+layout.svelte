<script lang="ts">
	import '../app.css';

	import type { LayoutData } from './$types';

	export let data: LayoutData & App.PageData;

	type MetaData = Exclude<App.PageData['meta'], undefined>;

	const defaultMeta = {
		title: 'nasin.li',
		description:
			'lipu ni la, sina ken lukin e lipu nasin pi jan ante, li ken pali e lipu pi nasin sina!'
	};

	$: meta = { ...defaultMeta } as MetaData;

	$: for (const [key, value] of Object.entries(data.meta ?? {})) {
		if (value) meta[key as keyof MetaData] = value;
	}
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta property="og:title" content={meta.title} />

	<meta name="description" content={meta.description} />
	<meta property="og:description" content={meta.description} />

	{#if meta.image}
		<meta property="og:image" content={meta.image} />
	{/if}

	<link rel="preconnect" href="https://rsms.me/" />
	<link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
</svelte:head>

<slot />
