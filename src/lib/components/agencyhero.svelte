<script>
	import ButtonGetCustomAgent from "./ButtonGetCustomAgent.svelte";

</script>
<div class="relative w-full overflow-hidden bg-white">
  <!-- Background Elements hero -->
  <div class="absolute inset-0 overflow-hidden">
    <div class="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-purple-100 opacity-50 blur-3xl"></div>
    <div class="absolute top-1/2 -left-16 h-64 w-64 rounded-full bg-blue-100 opacity-50 blur-3xl"></div>
  </div>

  <div class="mx-auto max-w-screen-xl px-6 py-24 relative">
    <div class="grid gap-12 md:grid-cols-2 items-center">
      <!-- Left Content -->
      <div class="flex flex-col gap-6">
        <!-- <div class="inline-flex items-center rounded-xl px-4 py-1.5 font-medium text-sm border border-zinc-200 bg-white text-zinc-950 shadow-sm">
          <div class="mr-2 size-2 rounded-xl bg-gradient-to-r from-[#FB923C] via-[#F472B6] to-[#E879F9]"></div>
          AI-Powered Growth
        </div> -->
        
        <h1 class="font-medium text-5xl text-zinc-950 tracking-tight md:text-7xl leading-tight">
          Grow your saas with <span class="text-transparent bg-clip-text bg-gradient-to-r from-zinc-600 to-zinc-950">AI marketing agents</span>
        </h1>
        
        <p class="text-xl text-zinc-500 max-w-lg">
          Be the first to catch latest industry trends, create targeted content and grow
        </p>
        
        <div class="flex flex-col items-center sm:flex-row gap-4 mt-4">
          <a href="/signup" class="rounded-xl bg-black px-6 py-3 font-medium text-white transition-all duration-200 shadow-md shadow-indigo-700/50 blur-0">
            Try it for free
          </a>

          <ButtonGetCustomAgent />

          <p class="text-zinc-900">
            No credit card required
          </p>
        </div>
      </div>
      
      <!-- Right Image/Illustration - Advanced Layout -->
      <div class="relative">
        <div class="absolute inset-0 bg-gradient-to-r from-purple-200 to-blue-200 rounded-3xl opacity-20 blur-xl transform rotate-6 animate-pulse"></div>
        <div class="relative bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-xl">
          <div class="aspect-video flex items-center justify-center p-6 relative">
            <!-- Main AI Brain/Circuit Visualization -->
            <div class="relative size-40 flex items-center justify-center">
              <!-- Central AI Circuit Brain -->
              <div class="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full"></div>
              
              <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-violet-700 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <!-- AI Brain Visualization -->
                <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 2 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08A2.5 2.5 0 0 0 12 19.5a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-2A2.5 2.5 0 0 0 12 4.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12 15v-2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12 9v-2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M9 12H7" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M15 12h2" stroke-linecap="round" stroke-linejoin="round" />
                <circle cx="12" cy="12" r="1" fill="currentColor" />
              </svg>
              
              <!-- Animated Connection Lines (Pulse Effect) -->
              <div class="absolute inset-0 rounded-full border-2 border-indigo-200 opacity-50"></div>
              <div class="absolute inset-2 rounded-full border border-violet-300 opacity-30 animate-pulse"></div>
              
              <!-- Orbit Social Icons -->
              <div class="absolute size-full">
                <!-- Circular orbit path -->
                <div class="absolute inset-0 rounded-full border border-zinc-100 animate-spin" style="animation-duration: 20s;"></div>
                
                <!-- Twitter Icon -->
                <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div class="bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </div>
                </div>
                
                <!-- LinkedIn Icon -->
                <div class="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2">
                  <div class="bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-300 hover:translate-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-700" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                </div>
                
                <!-- Reddit Icon -->
                <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                  <div class="bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                    </svg>
                  </div>
                </div>
                
                <!-- Search Icon -->
                <div class="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div class="bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <!-- Data Flow Animation Effects -->
              <div class="absolute inset-0 flex items-center justify-center opacity-30">
                <div class="absolute h-px w-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-pulse"></div>
                <div class="absolute h-full w-px bg-gradient-to-b from-transparent via-violet-500 to-transparent animate-pulse"></div>
              </div>
            </div>
            
            
          </div>
          
          <div class="p-6 bg-gradient-to-r from-zinc-50 to-white">
            <div class="flex justify-between items-center">
              <h3 class="font-medium text-zinc-950 text-lg">AI Marketing Agent</h3>
              <!-- <div class="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 flex items-center">
                <span class="size-2 rounded-full bg-green-500 mr-1"></span>
                Always Online
              </div> -->
            </div>
            <div class="mt-2 flex flex-col gap-2 items-start justify-between">
              <div class="flex items-center gap-2">
                <div class="text-sm text-zinc-500">Learns about your project</div>
                <div class="flex gap-1">
                  <span class="size-1 rounded-full bg-zinc-900 animate-pulse"></span>
                  <span class="size-1 rounded-full bg-zinc-900 animate-pulse" style="animation-delay: 0.2s"></span>
                  <span class="size-1 rounded-full bg-zinc-900 animate-pulse" style="animation-delay: 0.4s"></span>
                </div>
              </div>

              <div class="flex gap-2 items-center">
                <div class="text-sm text-zinc-500">Analyses competitors</div>
                <div class="flex gap-1">
                  <span class="size-1 rounded-full bg-zinc-900 animate-pulse"></span>
                  <span class="size-1 rounded-full bg-zinc-900 animate-pulse" style="animation-delay: 0.2s"></span>
                  <span class="size-1 rounded-full bg-zinc-900 animate-pulse" style="animation-delay: 0.4s"></span>
                </div>
              </div>

              <div class="flex items-center gap-2">
                <div class="text-sm text-zinc-500">Creates content</div>
                <div class="flex gap-1">
                  <span class="size-1 rounded-full bg-zinc-900 animate-pulse"></span>
                  <span class="size-1 rounded-full bg-zinc-900 animate-pulse" style="animation-delay: 0.2s"></span>
                  <span class="size-1 rounded-full bg-zinc-900 animate-pulse" style="animation-delay: 0.4s"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>



<section class="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 flex items-center justify-center relative overflow-hidden hidden">
  <div class="absolute inset-0 bg-gradient-to-tr from-zinc-400/8 via-transparent to-zinc-400/8"></div>
  <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.12),transparent_70%)]"></div>
  <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(139,92,246,0.08),transparent_50%)]"></div>
  
  <!-- Subtle Background SVG Elements -->
  <svg class="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
      <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#6366f1;stop-opacity:0.3"/>
              <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:0.1"/>
          </linearGradient>
      </defs>
      <path d="M0,300 Q400,100 800,200 T1600,150" stroke="url(#lineGradient)" stroke-width="2" fill="none"/>
      <path d="M0,500 Q600,300 1200,400 T2400,350" stroke="url(#lineGradient)" stroke-width="1.5" fill="none"/>
      <circle cx="20%" cy="30%" r="1" fill="rgba(99,102,241,0.4)"/>
      <circle cx="80%" cy="20%" r="1.5" fill="rgba(139,92,246,0.3)"/>
      <circle cx="15%" cy="70%" r="1" fill="rgba(99,102,241,0.2)"/>
      <circle cx="85%" cy="80%" r="1" fill="rgba(139,92,246,0.2)"/>
  </svg>
  
  <div class="relative text-center max-w-6xl px-6">
      <!-- Floating Icons -->
      
      
      

      <h1 class="font-bold text-5xl md:text-7xl lg:text-8xl tracking-[-0.04em] leading-[0.82] mb-8 text-white">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-zinc-50 via-zinc-200 to-zinc-400">
              Building Useful
          </span>
          <br>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-violet-400 drop-shadow-sm">
              AI marketing tools
          </span>
          <br>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-500">
              for SaaS
          </span>
      </h1>
      
      <div class="flex items-center justify-center gap-6 mb-4">
          <div class="flex items-center gap-2 text-white/60">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
              </svg>
              <span class="text-sm font-light">Research</span>
          </div>
          <div class="w-1 h-1 bg-white/40 rounded-full"></div>
          <div class="flex items-center gap-2 text-white/60">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14.5 4h-5L7 7H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2h-3l-2.5-3z"/>
                  <circle cx="12" cy="13" r="3"/>
              </svg>
              <span class="text-sm font-light">Create Content</span>
          </div>
          <div class="w-1 h-1 bg-white/40 rounded-full"></div>
          <div class="flex items-center gap-2 text-white/60">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
              </svg>
              <span class="text-sm font-light">Find Leads</span>
          </div>
      </div>
      <p class="text-white/40 text-sm font-light">and more</p>
  </div>
</section>