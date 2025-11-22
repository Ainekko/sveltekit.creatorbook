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

<div class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
	<div
		class="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/50 p-1.5 rounded-full shadow-2xl shadow-black/50 flex items-center gap-1"
	>
		{#each mappedNavItems as item}
			{@const active = isActive(item.href)}
			<a
				href={item.href}
				class="relative px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2.5 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group
          {active ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-200'}"
			>
				{#if active}
					<div
						class="absolute inset-0 bg-white rounded-full shadow-sm transition-all duration-300"
						style="view-transition-name: nav-active-bg"
					></div>
				{/if}
				<span class="relative z-10 flex items-center gap-2.5">
					<span class="w-4 h-4 [&>svg]:w-full [&>svg]:h-full [&>svg]:stroke-[2.5]">
						{@html item.icon}
					</span>
					{item.title}
				</span>
			</a>
		{/each}
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
