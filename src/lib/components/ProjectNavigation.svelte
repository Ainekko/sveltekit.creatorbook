<script>
  import { page } from '$app/stores';

  // Project navigation items
  const navItems = [
    { title: 'Overview', href: '/projects/[id]', icon: 'i-mdi-view-dashboard' },
    { title: 'SEO', href: '/projects/[id]/seo', icon: 'i-mdi-search-web' },
    { title: 'Competitors', href: '/projects/[id]/competitors', icon: 'i-mdi-account-group' },
    { title: 'Social Content', href: '/projects/[id]/socials', icon: 'i-mdi-social-media' }
  ];

  // Replace [id] with actual project ID from the URL
  $: projectId = $page.params.id;
  $: mappedNavItems = navItems.map(item => ({
    ...item,
    href: item.href.replace('[id]', projectId)
  }));

  // Check if the current page matches a nav item
  $: isActive = (href) => {
    return $page.url.pathname === href || 
           ($page.url.pathname.includes(href) && href !== `/projects/${projectId}`);
  };
</script>

<div class="mb-8 relative z-10">
  <div class="bg-zinc-900/80 backdrop-blur-sm rounded-xl shadow-lg shadow-black/20 border border-zinc-800 p-1 flex overflow-x-auto no-scrollbar">
    {#each mappedNavItems as item}
      <a 
        href={item.href} 
        class="px-5 py-3 rounded-lg text-sm font-medium flex items-center gap-2 min-w-max transition-all duration-200 {isActive(item.href) ? 'bg-blue-900/30 text-blue-400' : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'}"
      >
        <span class={item.icon}></span>
        {item.title}
      </a>
    {/each}
    
    <div class="ml-auto px-2 flex items-center">
      <button class="p-2 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200">
        <span class="i-mdi-dots-horizontal"></span>
      </button>
    </div>
  </div>
</div>

<style>
  /* Hide scrollbar but allow scrolling */
  .no-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  
  .no-scrollbar::-webkit-scrollbar {
    display: none;  /* Chrome, Safari and Opera */
  }
</style>