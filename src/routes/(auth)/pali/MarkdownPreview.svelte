<script lang="ts">
	import Markdown from '$lib/components/Markdown.svelte';

	export let value: string;
	export let short = false;
</script>

<div class="mt-4 grid md:grid-cols-2 gap-4">
	<textarea
		bind:value
		class="box block w-full min-h-full p-4 rounded-lg
			bg-white border-gray-200 
			focus:ring-0 focus:border-blue-600 transition-colors"
		class:h-56={!short}
		class:md:h-96={!short}
		class:h-36={short}
		class:md:h-48={short}
	/>

	<div class="p-4 box">
		<Markdown source={value} />
	</div>
</div>
