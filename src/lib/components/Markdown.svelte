<script lang="ts" context="module">
	import { createMarkdown } from 'safe-marked/module/browser';
	import { Renderer } from 'marked';

	const renderer = new Renderer();
	const renderCode = renderer.code.bind(renderer);
	renderer.code = (code, language, isEscaped) => {
		if (language === 'sp') {
			return `<p class="font-pona text-3xl">${code}</p>`;
		}

		return renderCode(code, language, isEscaped);
	};

	const markdown = createMarkdown({
		marked: {
			smartypants: true,
			gfm: true,
			renderer
		}
	});
</script>

<script lang="ts">
	export let source: string;

	let className = '';
	export { className as class };
</script>

<div
	class="prose prose-blue break-words
		prose-a:no-underline hocus:prose-a:text-blue-400 prose-a:transition-colors
		{className}"
>
	{@html markdown(source)}
</div>
