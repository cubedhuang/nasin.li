<script lang="ts">
	import '../app.css';

	const meta = {
		title: 'nasin.li',
		description:
			'lipu ni la, sina ken lukin e lipu nasin pi jan ante, li ken pali e lipu pi nasin sina!'
	};
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta property="og:title" content={meta.title} />

	<meta name="description" content={meta.description} />
	<meta property="og:description" content={meta.description} />

	<link rel="preconnect" href="https://rsms.me/" />
	<link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
</svelte:head>

<slot />
