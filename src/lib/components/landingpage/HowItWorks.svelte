<!-- HowItWorks.svelte -->

<div id="how-it-works" class="mt-32 mb-20">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-semibold text-zinc-600 mb-4">
        From setup to <span class=" text-zinc-950">full automation</span> in minutes
      </h2>
      <p class="text-xl text-zinc-500 max-w-2xl mx-auto">
        No technical skills needed. Just connect, configure, and watch your marketing run itself.
      </p>
    </div>
  
    <!-- Steps -->
    <div class="max-w-5xl mx-auto relative">
      <!-- Connecting Line -->
      <div class="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-orange-200 -translate-y-1/2 z-0"></div>
      
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
        {#each [
          {
            step: '01',
            title: 'Sign up',
            description: 'Create your account in seconds. No credit card required for the trial.',
            icon: 'user',
            color: 'blue'
          },
          {
            step: '02',
            title: 'Start a project',
            description: 'Get access to Nai for SEO, Rio for X, or Elio for Reddit.',
            icon: 'grid',
            color: 'purple'
          },
          {
            step: '03',
            title: 'Connect tools',
            description: 'Link your WordPress, X account, or Reddit profile with one click.',
            icon: 'link',
            color: 'orange'
          },
          {
            step: '04',
            title: 'Start growing',
            description: 'Tell your agents what to do and watch them execute flawlessly.',
            icon: 'rocket',
            color: 'emerald'
          }
        ] as step, index}
          <div class="relative">
            <!-- Step Number Badge -->
            <div class="w-16 h-16 mx-auto mb-4 bg-white border-4 border-{step.color}-100 rounded-full flex items-center justify-center relative z-10">
              <span class="text-2xl font-bold text-{step.color}-600">{step.step}</span>
            </div>
            
            <!-- Icon -->
            <div class="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-{step.color}-500 to-{step.color}-600 rounded-xl flex items-center justify-center gentle-float" style="animation-delay: -{index}s;">
              {#if step.icon === 'user'}
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              {:else if step.icon === 'grid'}
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
              {:else if step.icon === 'link'}
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                </svg>
              {:else if step.icon === 'rocket'}
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              {/if}
            </div>
            
            <!-- Content -->
            <div class="text-center bg-white p-6 rounded-xl border border-zinc-100 hover:border-zinc-200 transition-all hover:shadow-sm">
              <h3 class="text-lg font-semibold text-zinc-900 mb-2">{step.title}</h3>
              <p class="text-sm text-zinc-500 leading-relaxed">{step.description}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  
    <!-- Time Callout -->
    <div class="max-w-2xl mx-auto mt-16 text-center">
      <div class="inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-purple-50 px-8 py-4 rounded-full border border-blue-100">
        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span class="text-lg font-medium text-zinc-900">
          Average setup time: <span class="text-blue-600 font-bold">3 minutes</span>
        </span>
      </div>
    </div>
  </div>

  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
  
    @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
  
    :global(body) {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', system-ui, sans-serif;
    }
  
    .gradient-text {
      background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
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
  
    .tab-button {
      transition: all 0.15s ease;
    }
  
    .tab-button:hover {
      transform: translateY(-1px);
    }
  
    .fade-in {
      animation: fadeIn 0.4s ease-out forwards;
    }
  
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
  
    .speech-bubble {
      position: absolute;
      background: black;
      border: 1px solid #f3f4f6;
      border-radius: 12px;
      padding: 12px 16px;
      max-width: 200px;
      font-size: 14px;
      color: black;
      animation: gentle-float 10s ease-in-out infinite;
      box-shadow: 0 2px 8px -2px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(8px);
    }
  
    .speech-bubble:after {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 6px solid white;
    }
  
    .video-container {
      position: relative;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 32px -8px rgba(0, 0, 0, 0.12);
      border: 2px solid transparent;
      background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%) padding-box;
    }
  
    .hero-section {
      background: 
        radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.03) 0%, transparent 50%);
    }
  
    .agent-card {
      transition: all 0.3s ease;
      border-radius: 12px;
    }
  
    .stat-card {
      background: #fafbfc;
      border: 1px solid #f1f3f4;
      transition: all 0.15s ease;
      position: relative;
    }
  
    .stat-card:hover {
      background: white;
      border-color: #e5e7eb;
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