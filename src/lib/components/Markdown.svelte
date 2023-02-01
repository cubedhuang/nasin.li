<script lang="ts" context="module">
	import { marked, Renderer } from 'marked';
	import { filterXSS, whiteList, type IFilterXSSOptions } from 'xss';

	const renderer = new Renderer();
	const renderCode = renderer.code.bind(renderer);
	renderer.code = (code, language, isEscaped) => {
		if (language === 'sp') {
			return `<p class="font-pona text-3xl">${code}</p>`;
		}

		return renderCode(code, language, isEscaped);
	};

	const markedOptions: marked.MarkedOptions = {
		smartypants: true,
		gfm: true,
		renderer
	};

	const xssOptions: IFilterXSSOptions = {
		allowList: {
			...whiteList,
			h1: ['id'],
			h2: ['id'],
			h3: ['id'],
			h4: ['id'],
			h5: ['id'],
			h6: ['id'],
			p: ['class']
		}
	};

	const markdown = (source: string) =>
		filterXSS(marked.parse(source, markedOptions), xssOptions);
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
