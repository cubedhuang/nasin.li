<script lang="ts">
	export let title: string;
	export let description: string;
	export let image: string | undefined = undefined;
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title} />

	<meta name="description" content={description} />
	<meta property="og:description" content={description} />

	{#if image}
		<meta property="og:image" content={image} />
	{/if}
</svelte:head>
