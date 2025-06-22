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
      
         

        <!-- Right Video Demo - Larger Container -->
      <div class="relative scale-110">
        <!-- Background blur effect -->
        <div class="absolute inset-0 bg-gradient-to-r from-purple-200 to-blue-200 rounded-3xl opacity-20 blur-xl transform rotate-2 animate-pulse"></div>
        
        <!-- Main video container -->
        <div class="relative transform rotate-2 hover:rotate-1 transition-transform duration-500 ease-out">
          <div class="bg-white rounded-2xl overflow-hidden shadow-2xl border border-zinc-200/50 backdrop-blur-sm">
            <!-- Video element -->
            <div class="relative aspect-[18/10] overflow-hidden">
              <video 
                src="https://rechatcreatorbook.s3.us-west-2.amazonaws.com/s-teir/AI+Marketing+Agents+for+SaaS+-+Google+Chrome+2025-06-11+11-34-43.mp4"
                autoplay
                muted
                loop
                playsinline
                class="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
              >
                Your browser does not support the video tag.
              </video>
              <!-- Overlay gradient for depth -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent"></div>
            </div>
            
            <!-- Bottom info bar -->
            <div class="p-4 bg-gradient-to-r from-zinc-50 to-white border-t border-zinc-100">
              <div class="flex justify-between items-center">
                <h3 class="font-medium text-zinc-950 text-sm">Live Product Demo</h3>
                
              </div>
            </div>
          </div>
          
          <!-- Modern shadow layers -->
          <div class="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl transform translate-x-2 translate-y-2 blur-xl"></div>
          <div class="absolute inset-0 -z-20 bg-gradient-to-br from-blue-500/5 to-violet-500/5 rounded-2xl transform translate-x-4 translate-y-4 blur-2xl"></div>
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