<script lang="ts">
	export let value: string | null;
</script>

<textarea
	bind:value
	class="w-full p-2 h-40
		rounded-lg border border-gray-200
		focus:ring-0 focus:border-blue-500 transition-colors"
/>
