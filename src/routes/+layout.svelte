<script>
	import '../app.css';
</script>

<svelte:head>
	<link rel="preconnect" href="https://rsms.me/" />
	<link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
</svelte:head>

<nav class="px-8 bg-slate-800 shadow-lg">
	<ul
		class="max-w-5xl mx-auto py-4 flex items-center justify-between gap-4 font-bold text-white text-lg"
	>
		<li>
			<a href="/">nasin.li</a>
		</li>
		<li>
			<a href="/login">login</a>
		</li>
	</ul>
</nav>

<div class="px-8 py-8">
	<div class="max-w-5xl mx-auto">
		<slot />
	</div>
</div>
