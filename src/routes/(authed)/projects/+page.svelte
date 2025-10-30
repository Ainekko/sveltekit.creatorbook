<script lang="ts">
  import { get } from 'svelte/store';
  import { projectStore, projects, isLoading, error, projectsCount } from '$lib/projects/stores';
  import { fly, fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { ChevronDown, ChevronRight, Plus, Calendar, Users, Activity, Search, ExternalLink } from 'lucide-svelte';
	import { goto } from '$app/navigation';

  // Simple, clean project colors - no gradients
  function getProjectColor(seed = '') {
      const colors = [
          '#3b82f6', // blue
          '#f59e0b', // amber  
          '#10b981', // emerald
          '#8b5cf6', // purple
          '#ef4444', // red
          '#06b6d4', // cyan
          '#84cc16', // lime
          '#f97316', // orange
      ];
      
      const hash = seed.split('').reduce((a, b) => {
          a = ((a << 5) - a) + b.charCodeAt(0);
          return a & a;
      }, 0);
      
      return colors[Math.abs(hash) % colors.length];
  }

  function addNewProject() {
      goto('/new-project')
  }
  
  let expandedProjects = {};
  let searchQuery = '';
  let filteredProjects = [];
  
  function toggleProject(projectId : string) {
      expandedProjects[projectId] = !expandedProjects[projectId];
      expandedProjects = {...expandedProjects};
  }

  // Filter projects based on search
  $: {
      if (searchQuery.trim()) {
          filteredProjects = $projects.filter(project => 
              project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              project.url?.toLowerCase().includes(searchQuery.toLowerCase())
          );
      } else {
          filteredProjects = $projects;
      }
  }

  $: activeProjectId = $page.params.id;

  onMount(async () => {
      try {
          $projects.forEach(project => {
              expandedProjects[project.id] = false;
          });
          expandedProjects = {...expandedProjects};
      } catch (error) {
          console.error('An error occurred while loading projects:', error);
      }
  });

  
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

  :global(body) {
      font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', system-ui, sans-serif;
  }

  .notion-card {
      background: white;
      border: 1px solid #e5e7eb;
      transition: all 0.2s ease;
  }

  .notion-card:hover {
      border-color: #d1d5db;
      box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.05);
  }

  .gentle-float {
      animation: gentle-float 8s ease-in-out infinite;
  }

  @keyframes gentle-float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      25% { transform: translateY(-5px) rotate(1deg); }
      50% { transform: translateY(-8px) rotate(0deg); }
      75% { transform: translateY(-3px) rotate(-1deg); }
  }

  .stat-card {
      background: #fafbfc;
      border: 1px solid #f1f3f4;
      transition: all 0.15s ease;
  }

  .stat-card:hover {
      background: white;
      border-color: #e5e7eb;
  }

  .hero-section {
      background: 
          radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.03) 0%, transparent 50%);
  }

  .fade-in {
      animation: fadeIn 0.4s ease-out forwards;
  }

  @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
  }

  .twisted-underline {
      display: inline-block;
      position: relative;
  }

  .twisted-underline svg {
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 100%;
      height: 12px;
  }
</style>

<section class="hero-section font-['Poppins'] relative min-h-screen bg-white text-gray-900 overflow-x-hidden">
  <!-- Floating Questions - matching your landing page -->
  

  <div class="relative z-10 pt-20 pb-12 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <!-- Header Section -->
          <div class="text-center md:flex-row  mb-16">
              <div class="space-y-6 mb-12">
                  <h1 class="text-4xl md:text-5xl lg:text-6xl font-semibold text-zinc-700 leading-tight tracking-tight">
                      Your projects.
                  </h1>
                  
              </div>

              <div class="relative max-w-md mx-auto mb-16">
                <Search size={20} class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                    bind:value={searchQuery}
                    type="text" 
                    placeholder="Search projects..." 
                    class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                />
            </div>

              <!-- CTA Section -->
              <div class="max-w-md mx-auto mb-12">
                  <button 
                      on:click={addNewProject}
                      class="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 relative"
                  >
                      Create Project
                      <div class="absolute top-0 right-0 w-4 h-4 -z-10 bg-orange-400 rounded-full gentle-float" style="animation-delay: -3s;"></div>
                  </button>
              </div>

              <!-- Quick Stats - matching your landing page style -->
              

              <!-- Search Bar -->
              
          </div>

          <!-- Loading State -->
          {#if $isLoading}
              <div class="flex items-center justify-center py-12" transition:fade>
                  <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span class="ml-3 text-gray-600">Loading projects...</span>
              </div>
          {/if}

          <!-- Error State -->
          {#if $error}
              <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6" transition:fly={{ y: -20, duration: 300 }}>
                  <p class="text-red-800">Error: {$error}</p>
                  <button 
                      on:click={projectStore.clearError}
                      class="text-red-600 hover:text-red-800 text-sm underline mt-2"
                  >
                      Dismiss
                  </button>
              </div>
          {/if}

          <!-- Projects Grid -->
          <div class="space-y-8">
              {#if filteredProjects.length === 0 && !$isLoading}
                  <div class="text-center py-12">
                      <div class="mb-4">
                          <div class="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                              <Plus size={24} class="text-gray-400" />
                          </div>
                      </div>
                      <h3 class="text-lg font-medium text-gray-900 mb-2">
                          {searchQuery ? 'No projects found' : 'No projects yet'}
                      </h3>
                      <p class="text-gray-500 mb-6">
                          {searchQuery 
                              ? `No projects match "${searchQuery}". Try adjusting your search.`
                              : 'Get started by creating your first project.'
                          }
                      </p>
                      {#if !searchQuery}
                          <button 
                              on:click={addNewProject}
                              class="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                          >
                              Create Project
                          </button>
                      {/if}
                  </div>
              {:else}
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {#each filteredProjects as project (project.id)}
                          <div 
                              class="notion-card rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                              transition:fly={{ y: 20, duration: 300 }}
                          >
                              <!-- Simple colored header - no gradients -->
                              <div 
                                  class="h-16 relative flex items-center justify-end p-4"
                                  style="background-color: {getProjectColor(project.id + project.title)}15"
                              >
                                  <span class="px-2 py-1 text-xs font-medium rounded-full {
                                      project.status === 'active' 
                                          ? 'bg-green-100 text-green-800' 
                                          : 'bg-yellow-100 text-yellow-800'
                                  }">
                                      {project.status === 'active' ? 'Active' : 'Draft'}
                                  </span>
                              </div>

                              <!-- Project Content -->
                              <div class="p-6">
                                  <div class="flex items-start justify-between mb-3">
                                      <div class="flex-1">
                                          <h3 class="font-bold text-lg text-gray-900 mb-1">
                                              {project.business_name}
                                          </h3>
                                          <p class="text-sm text-gray-500 mb-2 flex items-center gap-1">
                                              <ExternalLink size={12} />
                                              {project.url}
                                          </p>
                                          {#if project.description}
                                              <p class="text-gray-600 text-sm leading-relaxed">{project.description}</p>
                                          {/if}
                                      </div>
                                      <button 
                                          on:click|stopPropagation={() => toggleProject(project.id)}
                                          class="p-1 hover:bg-gray-100 rounded transition-colors ml-2"
                                      >
                                          {#if expandedProjects[project.id]}
                                              <ChevronDown size={18} class="text-gray-400" />
                                          {:else}
                                              <ChevronRight size={18} class="text-gray-400" />
                                          {/if}
                                      </button>
                                  </div>

                                  <!-- Project Stats -->
                                  <div class="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                      <div class="flex items-center gap-1">
                                          <Users size={14} />
                                          <span>{project.agents?.length || 0} agents</span>
                                      </div>
                                      <div class="flex items-center gap-1">
                                          <Calendar size={14} />
                                          <span>{new Date(project.created_at).toLocaleDateString()}</span>
                                      </div>
                                  </div>

                                  <!-- Agent badges -->
                                  {#if project.agents && project.agents.length > 0}
                                      <div class="flex flex-wrap gap-2 mb-4">
                                          {#each project.agents as agent}
                                              <span class="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg font-medium">
                                                  {agent}
                                              </span>
                                          {/each}
                                      </div>
                                  {/if}

                                  <!-- Quick Actions -->
                                  <div class="space-y-2">
                                      <a 
                                          href={`/projects/${project.id}`}
                                          class="block text-center px-3 py-2 {activeProjectId === project.id 
                                              ? 'bg-gray-900 text-white' 
                                              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'} rounded-lg transition-colors font-medium text-sm"
                                      >
                                          {activeProjectId === project.id ? 'Current Project' : 'View Project'}
                                      </a>

                                      <!-- Expanded Content -->
                                      {#if expandedProjects[project.id]}
                                          <div class="pt-2 space-y-1" transition:fly={{ y: -10, duration: 200 }}>
                                              <a 
                                                  href={`/projects/${project.id}/competitors`}
                                                  class="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                                              >
                                                  <div class="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                                                  Competitors
                                              </a>
                                              <a 
                                                  href={`/projects/${project.id}/seo`}
                                                  class="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                                              >
                                                  <div class="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                                                  SEO Analysis
                                              </a>
                                              <a 
                                                  href={`/projects/${project.id}/reddit`}
                                                  class="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                                              >
                                                  <div class="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                                                  Reddit Analysis
                                              </a>
                                          </div>
                                      {/if}
                                  </div>
                              </div>
                          </div>
                      {/each}
                  </div>

                  <!-- Summary Footer -->
                  <div class="text-center pt-12 mt-16 border-t border-gray-100">
                      <p class="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                          Each project connects to <span class="twisted-underline font-semibold text-gray-700">specialized AI agents
                              <svg viewBox="0 0 100 10" fill="none" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <path d="M0 5 C 20 0, 40 10, 60 5 C 80 0, 90 10, 100 5" />
                              </svg>
                          </span> that handle marketing tasks automatically.
                      </p>
                  </div>
              {/if}
          </div>
      </div>
  </div>
</section>