<script lang="ts">
	import { fly } from 'svelte/transition';

	type T = $$Generic;

	export let value: T | null;
	export let key: (value: T) => string = value => `${value}`;

	// This is a hack since the type of value is T | null even though it's
	// guaranteed to be non-null in the template.
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	$: nonNullValue = value!;
</script>

<svelte:window
	on:keydown={e => {
		if (e.key === 'Escape') value = null;
	}}
/>

{#if value}
	<div
		class="z-50 fixed bottom-0 right-0 w-full"
		transition:fly|local={{ y: 24, duration: 300 }}
	>
		{#key key(value)}
			<div
				transition:fly|local={{ y: 24, duration: 300 }}
				class="absolute bottom-0 right-0 left-0 max-h-[75vh] p-4 overflow-y-auto bg-gray-50 border-t shadow-xl
					md:bottom-4 md:right-4 md:left-auto md:top-auto md:w-[36rem] md:max-h-[40rem] md:box"
			>
				<slot value={nonNullValue} />
			</div>
		{/key}
	</div>
{/if}
