<script lang="ts">
    import { 
        projects, 
        currentProject, 
        isLoading, 
        error, 
        hasProjects, 
        projectsCount,
        projectStore 
    } from '$lib/projects/stores';
    import { userStore, user, subscriptionTier, hasActiveSubscription } from '$lib/users/stores';
    import { fade, slide, scale } from 'svelte/transition';
    import { onMount, tick } from 'svelte';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { cubicOut } from 'svelte/easing';
    import { 
        Plus, Settings, LayoutGrid, Search, Star, MoreHorizontal, 
        Pin, Archive, Menu, SearchCode, Twitter, MessageSquare, 
        ChevronDown, ChevronUp, LogOut, Crown, Sparkles 
    } from 'lucide-svelte';
    import UpgradeModal from './UpgradeModule.svelte';

    function generateRandomGradient(): string {
        const colors = ['#FF6ACF', '#A855F7', '#22D3EE', '#EC4899', '#8B5CF6'];
        const color1 = colors[Math.floor(Math.random() * colors.length)];
        const color2 = colors[Math.floor(Math.random() * colors.length)];
        return `radial-gradient(circle, ${color1}, ${color2})`;
    }

    let showUpgradeModal = false;
    let searchQuery = '';
    let openProjects: { [key: string]: boolean } = {};
    let projectMenuOpen: { [key: string]: boolean } = {};
    let pinnedProjects = new Set<string>();
    let isCollapsed = false;
    let showProjectSearch = false;

    function closeAllMenus(event?: KeyboardEvent) {
        if (event && event.key !== 'Escape') return;
        projectMenuOpen = {};
    }

    function startNewProject() {
        // Check if user has reached project limit
        const maxProjects = $user?.subscription_info?.features.max_projects || 1;
        if ($projectsCount >= maxProjects) {
            showUpgradeModal = true;
            return;
        }
        goto('/new-project');
    }

    function closeUpgradeModal() {
        showUpgradeModal = false;
    }

    $: activeProjectId = $page.params.id;
    $: currentPath = $page.url.pathname;
    const userAvatarGradient = generateRandomGradient();

    // Filter projects based on search query
    $: filteredProjects = searchQuery.trim() 
        ? $projects.filter((project) =>
            project.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.business_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : $projects;

    // Sort projects with pinned ones first
    $: sortedProjects = [...filteredProjects].sort((a, b) => {
        const aPinned = pinnedProjects.has(a.id);
        const bPinned = pinnedProjects.has(b.id);
        if (aPinned && !bPinned) return -1;
        if (!aPinned && bPinned) return 1;
        return new Date(a.updated_at || a.created_at).getTime() - new Date(b.updated_at || b.created_at).getTime();
    });

    // Get max projects for current tier
    $: maxProjects = $user?.subscription_info?.features.max_projects || 1;
    $: isAtProjectLimit = $projectsCount >= maxProjects;

    onMount(async () => {
        try {

            const collapsed = localStorage.getItem('sidebar-collapsed');
            if (collapsed === 'true') {
                isCollapsed = true;
            }
            // Initialize user store
            await userStore.init();

            // Load projects if authenticated
            if ($userStore.token) {
                await projectStore.loadProjects($userStore.token);
            }

            // // Load UI state from localStorage
            // const collapsed = localStorage.getItem('sidebar-collapsed');
            // if (collapsed === 'true') {
            //     isCollapsed = true;
            // }

            const pinned = localStorage.getItem('pinned-projects');
            if (pinned) {
                pinnedProjects = new Set(JSON.parse(pinned));
            }
        } catch (error) {
            console.error('An error occurred while loading sidebar data:', error);
        }
        
    });

    function toggleSidebar() {
        isCollapsed = !isCollapsed;
        localStorage.setItem('sidebar-collapsed', isCollapsed.toString());
    }

    async function toggleProject(projectId: string) {
        openProjects[projectId] = !openProjects[projectId];
        await tick();
    }

    function toggleProjectMenu(projectId: string, event: Event) {
        event.stopPropagation();
        const wasOpen = projectMenuOpen[projectId];
        closeAllMenus();
        projectMenuOpen[projectId] = !wasOpen;
    }

    function togglePinProject(projectId: string) {
        if (pinnedProjects.has(projectId)) {
            pinnedProjects.delete(projectId);
        } else {
            pinnedProjects.add(projectId);
        }
        pinnedProjects = pinnedProjects;
        localStorage.setItem('pinned-projects', JSON.stringify([...pinnedProjects]));
        closeAllMenus();
    }

    async function archiveProject(projectId: string) {
        if (confirm('Are you sure you want to archive this project?')) {
            try {
                await projectStore.deleteProject($userStore.token, projectId);
                console.log('Project archived:', projectId);
            } catch (err) {
                console.error('Failed to archive project:', err);
                alert('Failed to archive project: ' + err.message);
            }
        }
        closeAllMenus();
    }

    function formatProjectTitle(project: { business_name?: string; url: string }): string {
        if (project.business_name) return project.business_name;
        try {
            const domain = new URL(project.url).hostname.replace('www.', '');
            return domain.charAt(0).toUpperCase() + domain.slice(1);
        } catch {
            return project.url;
        }
    }

    function getProjectNavItems(projectId: string) {
        return [
            {
                href: `/projects/${projectId}`,
                icon: LayoutGrid,
                label: 'Overview',
                active: currentPath === `/projects/${projectId}`
            },
            {
                href: `/projects/${projectId}/nai`,
                icon: SearchCode,
                label: 'Nai (SEO)',
                active: currentPath.includes(`/projects/${projectId}/nai`)
            },
            {
                href: `/projects/${projectId}/rio`,
                icon: Twitter,
                label: 'Rio (Twitter)',
                active: currentPath.includes(`/projects/${projectId}/rio`)
            },
            {
                href: `/projects/${projectId}/elio`,
                icon: MessageSquare,
                label: 'Elio (Reddit)',
                active: currentPath.includes(`/projects/${projectId}/elio`)
            },
            {
                href: `/projects/${projectId}/integrations`,
                icon: Settings,
                label: 'Settings',
                active: currentPath.includes(`/projects/${projectId}/integrations`)
            }
        ];
    }

    async function handleLogout() {
        await userStore.logout();
        projectStore.clear();
    }

    function getTierDisplay(tier: string | null): string {
        if (!tier) return 'Free';
        return tier.charAt(0).toUpperCase() + tier.slice(1);
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
    
    .projects-scroll-area {
        overscroll-behavior: contain;
    }
    .projects-scroll-area::-webkit-scrollbar {
        width: 4px;
    }
    .projects-scroll-area::-webkit-scrollbar-track {
        background: transparent;
        margin: 4px 0;
    }
    .projects-scroll-area::-webkit-scrollbar-thumb {
        background: rgba(113, 113, 122, 0.4);
        border-radius: 4px;
    }
    .projects-scroll-area::-webkit-scrollbar-thumb:hover {
        background: rgba(156, 163, 175, 0.6);
    }
    .projects-scroll-area {
        scrollbar-width: thin;
        scrollbar-color: rgba(113, 113, 122, 0.4) transparent;
    }
    .truncate {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .gentle-float {
        animation: float 3s ease-in-out infinite;
    }
    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-4px); }
    }
    .project-card {
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .project-card:hover {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .shimmer {
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        background-size: 200% 100%;
        animation: shimmer 2s infinite;
    }
    @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
    }
</style>

<nav class="h-screen bg-white text-gray-900 border-r border-gray-200 transition-all duration-300 {isCollapsed ? 'w-12' : 'w-60'} flex flex-col z-40">
    {#if showUpgradeModal}
        <UpgradeModal on:close={closeUpgradeModal} />
    {/if}
    
    <!-- Header -->
    <header class="flex-shrink-0 p-2 border-b border-gray-200">
        <div class="flex flex-col gap-2">
            <div class="flex items-center justify-between">
                {#if !isCollapsed}
                    <div class="flex items-center gap-2 min-w-0">
                        <div class="w-7 h-7 rounded-full flex-shrink-0" style="background-image: {userAvatarGradient}; background-size: cover;" />
                        <div class="flex flex-col min-w-0">
                            <div class="flex items-center gap-1">
                                <span class="text-xs text-gray-500">Welcome</span>
                                {#if $subscriptionTier === 'pro'}
                                    <Crown size={10} class="text-amber-500" />
                                {/if}
                            </div>
                            <span class="text-xs font-medium text-gray-900 truncate">{$user?.username || 'User'}</span>
                        </div>
                    </div>
                    <button
                        class="p-1 hover:bg-gray-100 rounded-md text-gray-500 flex-shrink-0"
                        on:click={toggleSidebar}
                        title="Collapse sidebar"
                    >
                        <Menu size={12} />
                    </button>
                {:else}
                    <button
                        class="p-1 hover:bg-gray-100 rounded-md text-gray-500 mx-auto"
                        on:click={toggleSidebar}
                        title="Expand sidebar"
                    >
                        <Menu size={12} />
                    </button>
                {/if}
            </div>
            {#if !isCollapsed}
                <button
                    on:click={startNewProject}
                    class="flex items-center justify-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg px-3 py-1.5 text-xs font-medium transition-all relative disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isAtProjectLimit}
                    title={isAtProjectLimit ? `Project limit reached (${$projectsCount}/${maxProjects})` : 'Create new project'}
                >
                    <Plus size={12} />
                    New Project
                    {#if isAtProjectLimit && $subscriptionTier !== 'pro'}
                        <span class="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
                    {/if}
                </button>
                {#if isAtProjectLimit}
                    <div class="text-[10px] text-center text-gray-500">
                        {$projectsCount}/{maxProjects} projects used
                    </div>
                {/if}
            {:else}
                <button
                    on:click={startNewProject}
                    class="p-1 bg-orange-400 hover:bg-orange-500 text-white rounded-lg mx-auto disabled:opacity-50"
                    title={isAtProjectLimit ? "Project limit reached" : "New Project"}
                    disabled={isAtProjectLimit}
                >
                    <Plus size={12} />
                </button>
            {/if}
        </div>
    </header>

    <!-- Projects Section -->
    <section class="flex-1 min-h-0 px-2 py-2 flex flex-col">
        {#if !isCollapsed}
            <div class="flex-shrink-0 flex items-center justify-between mb-2">
                <h2 class="text-xs font-medium text-gray-700">Projects ({$projectsCount})</h2>
                <button
                    class="p-1 hover:bg-gray-100 rounded-md text-gray-500"
                    on:click={() => (showProjectSearch = !showProjectSearch)}
                    title="Search projects"
                >
                    <Search size={12} />
                </button>
            </div>
            
            {#if showProjectSearch}
                <div class="flex-shrink-0 mb-2" transition:slide={{ duration: 200 }}>
                    <div class="relative">
                        <Search size={12} class="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            bind:value={searchQuery}
                            placeholder="Search projects..."
                            class="w-full pl-7 pr-3 py-1 bg-gray-100 border border-gray-200 rounded-lg text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>
                </div>
            {/if}
        {/if}

        <!-- Loading State -->
        {#if $isLoading && !$hasProjects}
            <div class="flex-1 flex items-center justify-center">
                <div class="text-center text-gray-500">
                    <div class="animate-spin w-4 h-4 border-2 border-gray-300 border-t-orange-400 rounded-full mx-auto mb-2"></div>
                    <p class="text-xs">Loading projects...</p>
                </div>
            </div>
        <!-- Error State -->
        {:else if $error}
            <div class="flex-1 flex items-center justify-center">
                <div class="text-center text-gray-500">
                    <p class="text-xs mb-2">Failed to load projects</p>
                    <button 
                        on:click={() => projectStore.clearError()}
                        class="text-xs text-orange-400 hover:text-orange-500"
                    >
                        Retry
                    </button>
                </div>
            </div>
        <!-- Scrollable Projects -->
        {:else}
            <div class="projects-scroll-area flex-1 min-h-0 overflow-y-auto">
                {#if sortedProjects.length > 0}
                    <!-- Pinned Projects -->
                    {#if sortedProjects.filter(p => pinnedProjects.has(p.id)).length > 0}
                        <div class="mb-2">
                            {#if !isCollapsed}
                                <h3 class="text-xs font-medium text-gray-500 px-1 mb-1">Pinned</h3>
                            {/if}
                            <nav class="space-y-1">
                                {#each sortedProjects.filter(p => pinnedProjects.has(p.id)) as project (project.id)}
                                    {@const projectTitle = formatProjectTitle(project)}
                                    {@const navItems = getProjectNavItems(project.id)}
                                    <div class="relative group project-card" transition:slide={{ duration: 300 }}>
                                        <button
                                            class="flex items-center justify-between w-full px-2 py-1.5 rounded-lg bg-white shadow-md border border-gray-200 hover:bg-zinc-200 text-gray-900 focus:outline-none {isCollapsed ? 'justify-center px-0 border-0' : ''}"
                                            on:click={() => !isCollapsed && toggleProject(project.id)}
                                            title={isCollapsed ? projectTitle : ''}
                                        >
                                            <div class="flex items-center gap-1.5 min-w-0">
                                                <div class="relative w-5 h-5 rounded-md flex-shrink-0" style="background-image: {generateRandomGradient()}; background-size: cover;">
                                                    <Pin size={10} class="absolute top-0 right-0 text-orange-400 gentle-float" />
                                                </div>
                                                {#if !isCollapsed}
                                                    <span class="text-xs truncate">{projectTitle}</span>
                                                {/if}
                                            </div>
                                            {#if !isCollapsed}
                                                <div class="flex items-center gap-0.5 flex-shrink-0">
                                                    <button
                                                        class="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded-md text-gray-500 hover:text-gray-900"
                                                        on:click={(e) => toggleProjectMenu(project.id, e)}
                                                        on:keydown={(e) => e.key === 'Escape' && closeAllMenus(e)}
                                                        title="Project options"
                                                    >
                                                        <MoreHorizontal size={12} />
                                                    </button>
                                                    {#if openProjects[project.id]}
                                                        <ChevronDown size={12} class="text-gray-500" />
                                                    {:else}
                                                        <ChevronUp size={12} class="text-gray-500" />
                                                    {/if}
                                                </div>
                                            {/if}
                                        </button>
                                        
                                        {#if !isCollapsed && projectMenuOpen[project.id]}
                                            <div
                                                class="absolute right-1 top-8 z-50 bg-white border border-gray-200 rounded-lg shadow-lg py-1 w-32"
                                                transition:scale={{ duration: 150, easing: cubicOut }}
                                            >
                                                <button
                                                    class="w-full px-2 py-1 text-left text-xs text-gray-700 hover:bg-gray-100 flex items-center gap-1.5"
                                                    on:click={() => togglePinProject(project.id)}
                                                    on:keydown={(e) => e.key === 'Escape' && closeAllMenus(e)}
                                                >
                                                    <Pin size={12} />
                                                    {pinnedProjects.has(project.id) ? 'Unpin' : 'Pin'} Project
                                                </button>
                                                <button
                                                    class="w-full px-2 py-1 text-left text-xs text-gray-700 hover:bg-gray-100 flex items-center gap-1.5"
                                                    on:click={() => archiveProject(project.id)}
                                                    on:keydown={(e) => e.key === 'Escape' && closeAllMenus(e)}
                                                >
                                                    <Archive size={12} />
                                                    Archive Project
                                                </button>
                                            </div>
                                        {/if}
                                        
                                        {#if !isCollapsed && openProjects[project.id]}
                                            <div class="ml-3 pl-2 border-l border-gray-200 mt-0.5 space-y-0.5" transition:slide={{ duration: 200 }}>
                                                {#each navItems as navItem}
                                                    <a
                                                        href={navItem.href}
                                                        class="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-gray-100 text-xs {navItem.active ? 'bg-orange-400/10 text-orange-400' : 'text-gray-700 hover:text-gray-900'} transition-all"
                                                        title={isCollapsed ? navItem.label : ''}
                                                    >
                                                        <svelte:component
                                                            this={navItem.icon}
                                                            size={12}
                                                            class={navItem.active ? 'text-orange-400' : 'text-gray-500'}
                                                        />
                                                        {#if !isCollapsed}
                                                            <span>{navItem.label}</span>
                                                        {/if}
                                                    </a>
                                                {/each}
                                            </div>
                                        {/if}
                                    </div>
                                {/each}
                            </nav>
                        </div>
                    {/if}

                    <!-- All Projects -->
                    {#if sortedProjects.filter(p => !pinnedProjects.has(p.id)).length > 0}
                        <div class="mb-2">
                            {#if !isCollapsed}
                                <h3 class="text-xs font-medium text-gray-500 px-1 mb-1">All Projects</h3>
                            {/if}
                            <nav class="space-y-0.5">
                                {#each sortedProjects.filter(p => !pinnedProjects.has(p.id)) as project (project.id)}
                                    {@const projectTitle = formatProjectTitle(project)}
                                    {@const navItems = getProjectNavItems(project.id)}
                                    <div class="relative group project-card" transition:slide={{ duration: 300 }}>
                                        <button
                                            class="flex items-center justify-between w-full px-2 py-1.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 text-gray-900 focus:outline-none {isCollapsed ? 'justify-center px-0 border-0' : ''}"
                                            on:click={() => !isCollapsed && toggleProject(project.id)}
                                            title={isCollapsed ? projectTitle : ''}
                                        >
                                            <div class="flex items-center gap-1.5 min-w-0">
                                                <div class="w-5 h-5 rounded-md flex-shrink-0" style="background-image: {generateRandomGradient()}; background-size: cover;" />
                                                {#if !isCollapsed}
                                                    <span class="text-xs truncate">{projectTitle}</span>
                                                {/if}
                                            </div>
                                            {#if !isCollapsed}
                                                <div class="flex items-center gap-0.5 flex-shrink-0">
                                                    <button
                                                        class="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded-md text-gray-500 hover:text-gray-900"
                                                        on:click={(e) => toggleProjectMenu(project.id, e)}
                                                        on:keydown={(e) => e.key === 'Escape' && closeAllMenus(e)}
                                                        title="Project options"
                                                    >
                                                        <MoreHorizontal size={12} />
                                                    </button>
                                                    {#if openProjects[project.id]}
                                                        <ChevronDown size={12} class="text-gray-500" />
                                                    {:else}
                                                        <ChevronUp size={12} class="text-gray-500" />
                                                    {/if}
                                                </div>
                                            {/if}
                                        </button>
                                        
                                        {#if !isCollapsed && projectMenuOpen[project.id]}
                                            <div
                                                class="absolute right-1 top-8 z-50 bg-white border border-gray-200 rounded-lg shadow-lg py-1 w-32"
                                                transition:scale={{ duration: 150, easing: cubicOut }}
                                            >
                                                <button
                                                    class="w-full px-2 py-1 text-left text-xs text-gray-700 hover:bg-gray-100 flex items-center gap-1.5"
                                                    on:click={() => togglePinProject(project.id)}
                                                    on:keydown={(e) => e.key === 'Escape' && closeAllMenus(e)}
                                                >
                                                    <Pin size={12} />
                                                    {pinnedProjects.has(project.id) ? 'Unpin' : 'Pin'} Project
                                                </button>
                                                <button
                                                    class="w-full px-2 py-1 text-left text-xs text-gray-700 hover:bg-gray-100 flex items-center gap-1.5"
                                                    on:click={() => archiveProject(project.id)}
                                                    on:keydown={(e) => e.key === 'Escape' && closeAllMenus(e)}
                                                >
                                                    <Archive size={12} />
                                                    Archive Project
                                                </button>
                                            </div>
                                        {/if}
                                        
                                        {#if !isCollapsed && openProjects[project.id]}
                                            <div class="ml-3 pl-2 border-l border-gray-200 mt-0.5 space-y-0.5" transition:slide={{ duration: 200 }}>
                                                {#each navItems as navItem}
                                                    <a
                                                        href={navItem.href}
                                                        class="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-gray-100 text-xs {navItem.active ? 'bg-orange-400/10 text-orange-400' : 'text-gray-700 hover:text-gray-900'} transition-all"
                                                        title={isCollapsed ? navItem.label : ''}
                                                    >
                                                        <svelte:component
                                                            this={navItem.icon}
                                                            size={12}
                                                            class={navItem.active ? 'text-orange-400' : 'text-gray-500'}
                                                        />
                                                        {#if !isCollapsed}
                                                            <span>{navItem.label}</span>
                                                        {/if}
                                                    </a>
                                                {/each}
                                            </div>
                                        {/if}
                                    </div>
                                {/each}
                            </nav>
                        </div>
                    {/if}
                    
                {:else if searchQuery}
                    <div class="text-center py-4 text-gray-500">
                        <Search size={14} class="mx-auto mb-1 opacity-50" />
                        <p class="text-xs">No projects found</p>
                    </div>
                {:else}
                    <div class="text-center py-4 text-gray-500">
                        <Plus size={14} class="mx-auto mb-1 opacity-50" />
                        <p class="text-xs">No projects yet</p>
                        {#if !isCollapsed}
                            <button 
                                on:click={startNewProject}
                                class="text-xs text-orange-400 hover:text-orange-500 mt-1"
                            >
                                Create your first project
                            </button>
                        {/if}
                    </div>
                {/if}
            </div>
        {/if}
    </section>

    <!-- Footer -->
    <footer class="flex-shrink-0 p-2 border-t border-gray-200 ">
        <!-- Subscription Status Card -->
        {#if !isCollapsed && $subscriptionTier !== 'pro'}
            <a
                href="/plans"
                class="block mb-2 p-2 rounded-lg border bg-gradient-to-br from-violet-800 to-zinc-400 border-zin text-zinc-200 hover:border-amber-300 transition-all group"
                transition:slide={{ duration: 200 }}
            >
                <div class="flex items-center gap-2 mb-1">
                    <div class="w-5 h-5 rounded-full  bg-gradient-to-br from-zinc-400 to-zinc-500  flex items-center justify-center shimmer">
                        <Crown size={12} class="text-white" />
                    </div>
                    <span class="text-xs font-semibold text-gray-100">Upgrade to Pro</span>
                </div>
                <p class="text-[10px] text-gray-200 mb-1">
                    Unlock unlimited projects and premium features
                </p>
                <div class="flex items-center justify-between">
                    <span class="text-[10px] text-gray-100">Current: {getTierDisplay($subscriptionTier)}</span>
                    <Sparkles size={10} class="text-amber-500 group-hover:scale-110 transition-transform" />
                </div>
            </a>
        {:else if !isCollapsed && $subscriptionTier === 'pro'}
            <div class="mb-2 p-2 rounded-lg shadow-lg shadow-violet-500/20 " transition:slide={{ duration: 200 }}>
                <div class="flex items-center gap-2 mb-1">
                    <div class="w-5 h-5 rounded-full bg-gradient-to-br from-violet-400 to-violet-500 flex items-center justify-center">
                        <Crown size={12} class="text-white" />
                    </div>
                    <span class="text-xs font-semibold text-gray-900">Pro Plan</span>
                </div>
                <p class="text-[10px] text-gray-600">
                    You have unlimited projects and premium features
                </p>
            </div>
        {/if}

        {#if !isCollapsed}
            <h2 class="text-xs font-medium text-gray-500 mb-1 px-1">Account</h2>
        {/if}
        <nav class="space-y-1">
            <a
                href="/integrations"
                class="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-gray-100 text-gray-700 {$page.url.pathname === '/integrations' ? 'bg-orange-400/10 text-orange-400' : ''} {isCollapsed ? 'justify-center px-0' : ''}"
                title={isCollapsed ? 'Integrations' : ''}
            >
                <Settings size={12} />
                {#if !isCollapsed}
                    <span class="text-xs">Integrations</span>
                {/if}
            </a>
            <button
                on:click={handleLogout}
                class="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-gray-100 text-gray-700 w-full {isCollapsed ? 'justify-center px-0' : ''}"
                title={isCollapsed ? 'Logout' : ''}
            >
                <LogOut size={12} />
                {#if !isCollapsed}
                    <span class="text-xs">Logout</span>
                {/if}
            </button>
        </nav>
    </footer>
</nav>