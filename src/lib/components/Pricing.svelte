<div class="relative w-full overflow-hidden bg-white py-24">
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-purple-100 opacity-30 blur-3xl"></div>
      <div class="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-blue-100 opacity-30 blur-3xl"></div>
    </div>
  
    <section class="mx-auto max-w-screen-xl px-6 relative">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <div class="inline-flex items-center rounded-full px-4 py-1.5 font-medium text-sm border border-zinc-200 bg-white text-zinc-950 mb-4">
          <div class="mr-2 size-2 rounded-full bg-gradient-to-r from-[#FB923C] via-[#F472B6] to-[#E879F9]"></div>
          Simple Pricing
        </div>
        <h2 class="font-medium text-4xl text-zinc-950 tracking-tight lg:text-5xl mb-4">Choose the perfect <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">package</span> for your business</h2>
        <p class="text-lg text-zinc-500">Flexible options combining website design, AI agents, and content creation to accelerate your growth.</p>
      </div>
  
      <!-- Toggle Annual/Monthly
      <div class="flex justify-center items-center mb-12">
        <span class="text-sm font-medium text-zinc-500 mr-3">Monthly</span>
        <div class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" class="sr-only peer" checked>
          <div class="w-14 h-7 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-7 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-blue-600"></div>
        </div>
        <span class="text-sm font-medium text-zinc-950 ml-3">Annual <span class="text-xs text-green-600 font-medium">(Save 20%)</span></span>
      </div> -->
  
      <!-- Pricing Cards -->
      <div class="grid gap-8 lg:grid-cols-3 mb-12">
        <!-- Free Showcase Package -->
        <div class="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
          <div class="mb-6">
            <div class="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 mb-4">
              Free
            </div>
            <h3 class="text-2xl font-semibold text-zinc-900 mb-2">AI Agent Showcase</h3>
            <p class="text-zinc-600 mb-6">Experience our AI capabilities with no commitment.</p>
            
            <div class="flex items-baseline mb-6">
              <span class="text-4xl font-bold text-zinc-900">$0</span>
              <span class="text-lg text-zinc-500 ml-2">/forever</span>
            </div>
          </div>
          
          <div class="flex-grow space-y-4 mb-8">
            <div class="flex items-start gap-3">
              <div class="text-green-600 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p class="font-medium text-zinc-900">Reddit Research Agent</p>
                <p class="text-sm text-zinc-500">Find competitors and draft posts</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="text-green-600 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p class="font-medium text-zinc-900">LinkedIn Agent</p>
                <p class="text-sm text-zinc-500">Basic networking assistance</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="text-green-600 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p class="font-medium text-zinc-900">Email Outreach Agent</p>
                <p class="text-sm text-zinc-500">Limited features with usage caps</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="text-green-600 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p class="font-medium text-zinc-900">Usage Limitations</p>
                <p class="text-sm text-zinc-500">Daily request caps apply</p>
              </div>
            </div>
          </div>
          
          <button class="w-full rounded-full border border-green-600 bg-white px-6 py-3 font-medium text-green-600 hover:bg-green-50 transition-all duration-200 shadow-sm">
            Try for free
          </button>
        </div>
        
        <!-- Starter Package - Now Most Popular -->
        <div class="rounded-3xl border-2 border-purple-600 bg-white p-8 shadow-lg relative flex flex-col">
          <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 text-sm font-medium">
            Most Popular
          </div>
          <div class="mb-6">
            <div class="inline-flex items-center rounded-full bg-gradient-to-r from-purple-100 to-blue-100 px-3 py-1 text-sm font-medium text-purple-800 mb-4">
              Starter
            </div>
            <h3 class="text-2xl font-semibold text-zinc-900 mb-2">Essential AI Marketing</h3>
            <p class="text-zinc-600 mb-6">Perfect for small businesses getting started with AI-powered marketing.</p>
            
            <div class="flex items-baseline mb-6">
              <span class="text-4xl font-bold text-zinc-900">$997</span>
              <span class="text-lg text-zinc-500 ml-2">/month</span>
            </div>
          </div>
          
          <div class="flex-grow space-y-4 mb-8">
            <div class="flex items-start gap-3">
              <div class="text-purple-600 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p class="font-medium text-zinc-900">Basic Website Design</p>
                <p class="text-sm text-zinc-500">5-page responsive website with core optimization</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="text-purple-600 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p class="font-medium text-zinc-900">1 AI Marketing Agent</p>
                <p class="text-sm text-zinc-500">Content creation for 1 social media platform</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="text-purple-600 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p class="font-medium text-zinc-900">Monthly Content Calendar</p>
                <p class="text-sm text-zinc-500">12 posts per month with basic graphics</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="text-purple-600 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p class="font-medium text-zinc-900">Email Lead Magnet</p>
                <p class="text-sm text-zinc-500">1 high-value lead generation asset</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="text-purple-600 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p class="font-medium text-zinc-900">Unlimited Showcase Agents</p>
                <p class="text-sm text-zinc-500">All free agents with premium features</p>
              </div>
            </div>
          </div>
          
          <button class="w-full rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 font-medium text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-md">
            Get started
          </button>
        </div>
          
        <!-- Custom Package -->
        <div class="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
          <div class="mb-6">
            <div class="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-4">
              Enterprise
            </div>
            <h3 class="text-2xl font-semibold text-zinc-900 mb-2">Custom AI Solutions</h3>
            <p class="text-zinc-600 mb-6">Tailored AI marketing ecosystem designed for your specific business needs.</p>
            
            <div class="flex items-baseline mb-6">
              <span class="text-xl font-bold text-zinc-900">Custom pricing</span>
            </div>
          </div>
          
          <div class="flex-grow space-y-4 mb-8">
            <div class="flex items-start gap-3">
              <div class="text-blue-600 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p class="font-medium text-zinc-900">Custom Website Design</p>
                <p class="text-sm text-zinc-500">Fully customized premium website</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="text-blue-600 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p class="font-medium text-zinc-900">Custom AI Development</p>
                <p class="text-sm text-zinc-500">Tailored agents for your specific needs</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="text-blue-600 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p class="font-medium text-zinc-900">Comprehensive Strategy</p>
                <p class="text-sm text-zinc-500">Full marketing & content ecosystem</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="text-blue-600 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p class="font-medium text-zinc-900">Dedicated Support</p>
                <p class="text-sm text-zinc-500">VIP access to our technical team</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="text-blue-600 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p class="font-medium text-zinc-900">Advanced Analytics</p>
                <p class="text-sm text-zinc-500">Custom reporting dashboard</p>
              </div>
            </div>
          </div>
          
          <button class="w-full rounded-full border border-blue-600 bg-white px-6 py-3 font-medium text-blue-600 hover:bg-blue-50 transition-all duration-200 shadow-sm">
            Book a consultation
          </button>
        </div>
      </div>
  
      <!-- Custom Package Call to Action -->
      <div class="rounded-3xl bg-gradient-to-r from-purple-600 to-blue-600 p-8 md:p-12 text-white shadow-xl">
        <div class="grid gap-8 md:grid-cols-3 items-center">
          <div class="md:col-span-2">
            <h3 class="text-2xl md:text-3xl font-medium mb-4">Need a custom package?</h3>
            <p class="text-white/80 mb-6">We'll create a tailored solution that perfectly fits your business needs and budget.</p>
            
            <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Custom AI development</span>
              </div>
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Flexible pricing</span>
              </div>
              <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Scalable solutions</span>
              </div>
            </div>
          </div>
          
          <div class="flex justify-center md:justify-end">
            <button class="rounded-full bg-white px-6 py-3 font-medium text-zinc-900 hover:bg-zinc-100 transition-all duration-200 shadow-md">
              Book a consultation
            </button>
          </div>
        </div>
      </div>
      
      <!-- FAQs -->
      <div class="mt-16 text-center">
        <h3 class="text-2xl font-medium text-zinc-900 mb-2">Frequently Asked Questions</h3>
        <p class="text-zinc-500 mb-8">Have more questions? <a href="#" class="text-purple-600 hover:text-purple-700 font-medium">Contact our team</a></p>
        
        <div class="grid gap-4 md:grid-cols-2 text-left">
          <div class="rounded-xl border border-zinc-200 bg-white p-6">
            <h4 class="text-lg font-medium text-zinc-900 mb-2">Can I upgrade my package later?</h4>
            <p class="text-zinc-600">Yes, you can upgrade to a higher tier at any time. We'll prorate your current subscription and apply any credit to your new plan.</p>
          </div>
          
          <div class="rounded-xl border border-zinc-200 bg-white p-6">
            <h4 class="text-lg font-medium text-zinc-900 mb-2">How quickly will I see results?</h4>
            <p class="text-zinc-600">Most clients begin seeing measurable improvements in engagement and lead generation within 30 days of implementation.</p>
          </div>
          
          <div class="rounded-xl border border-zinc-200 bg-white p-6">
            <h4 class="text-lg font-medium text-zinc-900 mb-2">Do I need a technical team on my end?</h4>
            <p class="text-zinc-600">No, our solutions are fully managed. We handle all technical aspects, implementation, and maintenance for you.</p>
          </div>
          
          <div class="rounded-xl border border-zinc-200 bg-white p-6">
            <h4 class="text-lg font-medium text-zinc-900 mb-2">How are the AI agents trained on my business?</h4>
            <p class="text-zinc-600">We'll conduct thorough onboarding to capture your brand voice, customer profiles, and business goals that inform the AI's knowledge base.</p>
          </div>
        </div>
      </div>
    </section>
  </div>