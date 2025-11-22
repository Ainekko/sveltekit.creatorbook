<!-- ProjectNavigation.svelte -->

<script>
	import { page } from '$app/stores';

	// Project navigation items
	const navItems = [
		{
			title: 'Overview',
			href: '/projects/[id]',
			icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"></path></svg>`
		},
		{
			title: 'Nai',
			href: '/projects/[id]/nai',
			icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>`
		},
		{
			title: 'Elio',
			href: '/projects/[id]/elio',
			icon: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0A12 12 0 00 0 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 01-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 01.042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 014.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 01.14-.197.35.35 0 01.238-.042l2.906.617a1.214 1.214 0 011.108-.701zM9.25 12c-.689 0-1.25.561-1.25 1.25 0 .688.561 1.249 1.25 1.249.688 0 1.249-.561 1.249-1.249 0-.688-.561-1.25-1.249-1.25zm5.5 0c-.689 0-1.25.561-1.25 1.25 0 .688.561 1.249 1.25 1.249.688 0 1.249-.561 1.249-1.249 0-.688-.561-1.25-1.25-1.25zm-5.466 3.99a.327.327 0 00-.231.094.33.33 0 000 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 00.029-.463.33.33 0 00-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 00-.232-.095z"/></svg>`
		}
		/* Rio Hidden
    { 
      title: 'Rio', 
      href: '/projects/[id]/rio', 
      icon: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>` 
    }
    */
	];

	// Replace [id] with actual project ID from the URL
	$: projectId = $page.params.id;
	$: mappedNavItems = navItems.map((item) => ({
		...item,
		href: item.href.replace('[id]', projectId)
	}));

	// Check if the current page matches a nav item
	$: isActive = (href) => {
		return (
			$page.url.pathname === href ||
			($page.url.pathname.includes(href) && href !== `/projects/${projectId}`)
		);
	};
</script>

<div
	class="mb-8 relative z-10 w-4/5 max-w-[500px] mx-auto gap-2 flex flex-col justify-center items-center"
>
	<div
		class="bg-zinc-800/10 text-black backdrop-blur-sm rounded-xl shadow-lg shadow-black/20 border p-1 flex flex-col w-full justify-center items-center md:flex-row overflow-x-auto no-scrollbar"
	>
		{#each mappedNavItems as item}
			<a
				href={item.href}
				class="w-full md:w-auto px-6 py-3 rounded-lg text-sm font-medium flex items-center gap-2 min-w-max transition-all duration-200 {isActive(
					item.href
				)
					? 'bg-zinc-800 text-zinc-200'
					: 'text-zinc-800 hover:bg-zinc-800 hover:text-zinc-200'}"
			>
				{@html item.icon}
				{item.title}
			</a>
		{/each}

		<div class="ml-auto px-2 flex justify-center items-center">
			<button class="p-2 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200">
				<span class="i-mdi-dots-horizontal"></span>
			</button>
		</div>
	</div>
</div>

<style>
	/* Hide scrollbar but allow scrolling */
	.no-scrollbar {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}

	.no-scrollbar::-webkit-scrollbar {
		display: none; /* Chrome, Safari and Opera */
	}
</style>
