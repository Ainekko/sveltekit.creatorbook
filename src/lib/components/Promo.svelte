<script>
    import { onMount } from 'svelte';
    import { fade, slide, scale, fly } from 'svelte/transition';
    import { elasticOut, cubicOut } from 'svelte/easing';
    import { tweened } from 'svelte/motion';
    
    // Animation state management
    let currentSection = 0;
    let sections = [
      { id: 'hero', duration: 2000 },
      { id: 'services', duration: 3500 },
      { id: 'process', duration: 3000 },
      { id: 'tech', duration: 2500 },
      { id: 'cta', duration: 2000 }
    ];
    
    // Services items with staggered animation
    let showServices = false;
    let servicesVisible = [false, false, false];
    
    // Process items with staggered animation
    let showProcess = false;
    let processVisible = [false, false, false];
    
    // Tech stack items with staggered animation
    let showTech = false;
    let techVisible = [false, false, false, false, false];
    
    // Progress indicator for the animation loop
    const progress = tweened(0, {
      duration: 13000,
      easing: cubicOut
    });
    
    // Animation loop control
    let timer;
    
    onMount(() => {
      startAnimation();
      return () => clearTimeout(timer);
    });
    
    function startAnimation() {
      // Reset states
      currentSection = 0;
      showServices = false;
      servicesVisible = [false, false, false];
      showProcess = false;
      processVisible = [false, false, false];
      showTech = false;
      techVisible = [false, false, false, false, false];
      progress.set(0);
      
      // Start the animation sequence
      animateSection();
    }
    
    function animateSection() {
      const section = sections[currentSection];
      
      if (section.id === 'services') {
        showServices = true;
        // Staggered animation for services
        setTimeout(() => servicesVisible[0] = true, 200);
        setTimeout(() => servicesVisible[1] = true, 600);
        setTimeout(() => servicesVisible[2] = true, 1000);
      } 
      else if (section.id === 'process') {
        showProcess = true;
        // Staggered animation for process steps
        setTimeout(() => processVisible[0] = true, 200);
        setTimeout(() => processVisible[1] = true, 600);
        setTimeout(() => processVisible[2] = true, 1000);
      }
      else if (section.id === 'tech') {
        showTech = true;
        // Staggered animation for tech stack
        setTimeout(() => techVisible[0] = true, 200);
        setTimeout(() => techVisible[1] = true, 400);
        setTimeout(() => techVisible[2] = true, 600);
        setTimeout(() => techVisible[3] = true, 800);
        setTimeout(() => techVisible[4] = true, 1000);
      }
      
      // Update progress bar
      progress.update(n => n + (section.duration / 13000));
      
      // Move to next section or restart
      timer = setTimeout(() => {
        if (currentSection < sections.length - 1) {
          currentSection++;
          animateSection();
        } else {
          // Restart the animation loop
          timer = setTimeout(startAnimation, 500);
        }
      }, section.duration);
    }
    
    const serviceColors = {
      agent: "bg-indigo-900/30 text-indigo-400",
      website: "bg-emerald-900/30 text-emerald-400",
      content: "bg-purple-900/30 text-purple-400"
    };
    
    const techColors = {
      openai: "bg-green-900/30 text-green-400",
      langchain: "bg-blue-900/30 text-blue-400",
      langgraph: "bg-purple-900/30 text-purple-400",
      anthropic: "bg-indigo-900/30 text-indigo-400",
      python: "bg-amber-900/30 text-amber-400"
    };
  </script>
  
  <div class="w-full h-screen bg-zinc-950 text-white flex flex-col items-center justify-center overflow-hidden relative">
    <!-- Progress bar -->
    <div class="absolute top-0 left-0 h-1 bg-indigo-500" style="width: {$progress * 100}%;"></div>
    
    <!-- Hero Section -->
    {#if currentSection === 0}
      <div 
        in:scale={{ duration: 400, delay: 100, easing: elasticOut }} 
        out:fade={{ duration: 300 }}
        class="flex flex-col items-center justify-center text-center p-6 max-w-lg"
      >
        <h1 class="text-4xl font-bold mb-4">
          <span class="block" in:fly={{ y: 30, duration: 400, delay: 150 }}>
            Let us build your
          </span>
          <span class="block text-5xl bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent" in:fly={{ y: 30, duration: 400, delay: 350 }}>
            Digital Ecosystem
          </span>
        </h1>
        <p class="text-zinc-400 mt-4" in:fly={{ y: 30, duration: 400, delay: 550 }}>
          Beyond our standard AI solutions, we create custom digital assets tailored to your specific business needs.
        </p>
      </div>
    {/if}
    
    <!-- Services Section -->
    {#if currentSection === 1 && showServices}
      <div class="flex flex-col items-center justify-center p-6 max-w-lg">
        <h2 
          in:fly={{ y: -20, duration: 300 }} 
          class="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent"
        >
          Custom AI Solutions
        </h2>
        
        <div class="grid gap-5 w-full">
          {#if servicesVisible[0]}
            <div 
              in:fly={{ x: -50, duration: 300 }} 
              class="bg-zinc-900 rounded-lg border border-zinc-800 p-5 group hover:border-indigo-500/50 transition-all duration-200"
            >
              <div class="flex items-start">
                <div class="w-12 h-12 rounded-full bg-indigo-900/30 flex items-center justify-center mr-5 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-white text-xl mb-2">Custom AI Agent Development</h3>
                  <p class="text-zinc-400">We design, build, and deploy custom AI agents specifically engineered for your business processes and customer interactions.</p>
                  <ul class="mt-3 space-y-1">
                    <li class="text-zinc-300 flex items-center">
                      <span class="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
                      Personalized to your brand voice and style
                    </li>
                    <li class="text-zinc-300 flex items-center">
                      <span class="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
                      Trained on your industry and products
                    </li>
                    <li class="text-zinc-300 flex items-center">
                      <span class="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
                      Connects with your existing tools and platforms
                    </li>
                  </ul>
                  <button class="mt-4 text-indigo-400 font-medium hover:text-indigo-300 transition-colors">
                    Learn more →
                  </button>
                </div>
              </div>
            </div>
          {/if}
          
          {#if servicesVisible[1]}
            <div 
              in:fly={{ x: -50, duration: 300 }} 
              class="bg-zinc-900 rounded-lg border border-zinc-800 p-5 group hover:border-emerald-500/50 transition-all duration-200"
            >
              <div class="flex items-start">
                <div class="w-12 h-12 rounded-full bg-emerald-900/30 flex items-center justify-center mr-5 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-white text-xl mb-2">Website Redesign & Development</h3>
                  <p class="text-zinc-400">We create high-converting, AI-enhanced websites that transform visitors into customers with intelligent user journeys.</p>
                  <ul class="mt-3 space-y-1">
                    <li class="text-zinc-300 flex items-center">
                      <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span>
                      Conversion-focused design principles
                    </li>
                    <li class="text-zinc-300 flex items-center">
                      <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span>
                      AI-powered personalization for each visitor
                    </li>
                    <li class="text-zinc-300 flex items-center">
                      <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span>
                      SEO-optimized for maximum visibility
                    </li>
                  </ul>
                  <button class="mt-4 text-emerald-400 font-medium hover:text-emerald-300 transition-colors">
                    Learn more →
                  </button>
                </div>
              </div>
            </div>
          {/if}
          
          {#if servicesVisible[2]}
            <div 
              in:fly={{ x: -50, duration: 300 }} 
              class="bg-zinc-900 rounded-lg border border-zinc-800 p-5 group hover:border-purple-500/50 transition-all duration-200"
            >
              <div class="flex items-start">
                <div class="w-12 h-12 rounded-full bg-purple-900/30 flex items-center justify-center mr-5 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-white text-xl mb-2">Content & Lead Magnets</h3>
                  <p class="text-zinc-400">We develop high-value content and lead magnets that attract and convert your ideal customers on autopilot.</p>
                  <ul class="mt-3 space-y-1">
                    <li class="text-zinc-300 flex items-center">
                      <span class="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
                      Data-driven lead magnet creation
                    </li>
                    <li class="text-zinc-300 flex items-center">
                      <span class="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
                      AI-generated content at scale
                    </li>
                    <li class="text-zinc-300 flex items-center">
                      <span class="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
                      Automated email nurture sequences
                    </li>
                  </ul>
                  <button class="mt-4 text-purple-400 font-medium hover:text-purple-300 transition-colors">
                    Learn more →
                  </button>
                </div>
              </div>
            </div>
          {/if}
        </div>
      </div>
    {/if}
    
    <!-- Process Section -->
    {#if currentSection === 2 && showProcess}
      <div class="flex flex-col items-center justify-center p-6 max-w-lg">
        <h2 
          in:scale={{ duration: 300 }} 
          class="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent"
        >
          Our Custom Development Process
        </h2>
        
        <div class="w-full">
          <div class="relative">
            <!-- Timeline line -->
            <div class="absolute left-6 top-6 h-full w-0.5 bg-zinc-700" style="height: calc(100% - 3rem);"></div>
            
            <div class="space-y-8">
              {#if processVisible[0]}
                <div 
                  in:fly={{ x: 50, duration: 300 }} 
                  class="flex items-start"
                >
                  <div class="relative z-10">
                    <div class="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-900/30 border-2 border-indigo-500 text-indigo-400 font-bold mr-4">
                      1
                    </div>
                  </div>
                  <div class="bg-zinc-900 rounded-lg border border-zinc-800 p-4 flex-1">
                    <h3 class="font-bold text-white text-lg mb-2">Discovery & Strategy</h3>
                    <p class="text-zinc-400">We analyze your business needs and develop a strategic plan</p>
                  </div>
                </div>
              {/if}
              
              {#if processVisible[1]}
                <div 
                  in:fly={{ x: 50, duration: 300 }} 
                  class="flex items-start"
                >
                  <div class="relative z-10">
                    <div class="flex items-center justify-center w-12 h-12 rounded-full bg-purple-900/30 border-2 border-purple-500 text-purple-400 font-bold mr-4">
                      2
                    </div>
                  </div>
                  <div class="bg-zinc-900 rounded-lg border border-zinc-800 p-4 flex-1">
                    <h3 class="font-bold text-white text-lg mb-2">Design & Development</h3>
                    <p class="text-zinc-400">Our team builds your custom solution with AI integration</p>
                  </div>
                </div>
              {/if}
              
              {#if processVisible[2]}
                <div 
                  in:fly={{ x: 50, duration: 300 }} 
                  class="flex items-start"
                >
                  <div class="relative z-10">
                    <div class="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-900/30 border-2 border-emerald-500 text-emerald-400 font-bold mr-4">
                      3
                    </div>
                  </div>
                  <div class="bg-zinc-900 rounded-lg border border-zinc-800 p-4 flex-1">
                    <h3 class="font-bold text-white text-lg mb-2">Launch & Optimization</h3>
                    <p class="text-zinc-400">We deploy your solution and continuously improve results</p>
                  </div>
                </div>
              {/if}
            </div>
          </div>
          
          <div class="mt-8 text-center">
            <button 
              in:scale={{ duration: 300, delay: 800 }}
              class="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    {/if}
  
    <!-- Tech Stack Section -->
    {#if currentSection === 3 && showTech}
      <div class="flex flex-col items-center justify-center p-6 max-w-lg">
        <h2 
          in:scale={{ duration: 300 }} 
          class="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text text-transparent"
        >
          Our Technology Stack
        </h2>
        
        <div class="grid grid-cols-3 gap-4 w-full">
          {#if techVisible[0]}
            <div 
              in:scale={{ duration: 250, start: 0.8 }} 
              class="bg-zinc-900 rounded-lg border border-zinc-800 p-4 flex flex-col items-center hover:border-green-500/50 transition-all duration-200"
            >
              <div class="w-16 h-16 rounded-full bg-green-900/20 flex items-center justify-center mb-3">
                <span class="text-green-400 font-bold text-xl">AI</span>
              </div>
              <p class="text-white font-medium text-center">OpenAI</p>
            </div>
          {/if}
          
          {#if techVisible[1]}
            <div 
              in:scale={{ duration: 250, start: 0.8 }} 
              class="bg-zinc-900 rounded-lg border border-zinc-800 p-4 flex flex-col items-center hover:border-blue-500/50 transition-all duration-200"
            >
              <div class="w-16 h-16 rounded-full bg-blue-900/20 flex items-center justify-center mb-3">
                <span class="text-blue-400 font-bold text-xl">LC</span>
              </div>
              <p class="text-white font-medium text-center">LangChain</p>
            </div>
          {/if}
          
          {#if techVisible[2]}
            <div 
              in:scale={{ duration: 250, start: 0.8 }} 
              class="bg-zinc-900 rounded-lg border border-zinc-800 p-4 flex flex-col items-center hover:border-purple-500/50 transition-all duration-200"
            >
              <div class="w-16 h-16 rounded-full bg-purple-900/20 flex items-center justify-center mb-3">
                <span class="text-purple-400 font-bold text-xl">LG</span>
              </div>
              <p class="text-white font-medium text-center">LangGraph</p>
            </div>
          {/if}
          
          {#if techVisible[3]}
            <div 
              in:scale={{ duration: 250, start: 0.8 }} 
              class="bg-zinc-900 rounded-lg border border-zinc-800 p-4 flex flex-col items-center hover:border-indigo-500/50 transition-all duration-200"
            >
              <div class="w-16 h-16 rounded-full bg-indigo-900/20 flex items-center justify-center mb-3">
                <span class="text-indigo-400 font-bold text-xl">AN</span>
              </div>
              <p class="text-white font-medium text-center">Anthropic</p>
            </div>
          {/if}
          
          {#if techVisible[4]}
            <div 
              in:scale={{ duration: 250, start: 0.8 }} 
              class="bg-zinc-900 rounded-lg border border-zinc-800 p-4 flex flex-col items-center hover:border-amber-500/50 transition-all duration-200"
            >
              <div class="w-16 h-16 rounded-full bg-amber-900/20 flex items-center justify-center mb-3">
                <span class="text-amber-400 font-bold text-xl">PY</span>
              </div>
              <p class="text-white font-medium text-center">Python</p>
            </div>
          {/if}
        </div>
      </div>
    {/if}
  
    <!-- CTA Section -->
    {#if currentSection === 4}
      <div 
        in:fade={{ duration: 400 }} 
        class="flex flex-col items-center justify-center text-center p-6 max-w-lg"
      >
        <h2 class="text-3xl font-bold mb-4" in:scale={{ duration: 300, delay: 100 }}>
          Ready for a custom solution?
        </h2>
        
        <p class="text-lg text-zinc-400 mb-6" in:scale={{ duration: 300, delay: 200 }}>
          Let's discuss how we can build a tailored digital strategy that leverages AI to accelerate your business growth.
        </p>
        
        <button 
          in:scale={{ duration: 300, delay: 300 }}
          class="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg"
        >
          Contact Us
        </button>
        
        <div class="mt-6 text-center text-zinc-500" in:fade={{ duration: 300, delay: 400 }}>
          <p>Or reach us directly:</p>
          <a href="mailto:hi@s-tierproject.online" class="text-indigo-400 hover:text-indigo-300 transition-colors">
            hi@s-tierproject.online
          </a>
        </div>
      </div>
    {/if}
  </div>