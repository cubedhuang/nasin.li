<script lang="ts">
	export let value: string;
	export let wide = false;
</script>

<input
	type="text"
	bind:value
	class="w-full p-2 text-lg font-bold
		rounded-lg border border-gray-200
		focus:ring-0 focus:border-blue-500 transition-colors"
	class:px-4={wide}
	spellcheck="false"
	autocomplete="off"
	autocapitalize="off"
/>
