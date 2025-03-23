<script>
    // Component state
    let websiteUrl = '';
    let isSubmitting = false;
    let formMessage = '';
    
    // Handle form submission
    const handleSubmit = async () => {
      if (!websiteUrl) {
        formMessage = 'Please enter a website URL';
        return;
      }
      
      isSubmitting = true;
      formMessage = '';
      
      try {
        // Simulate API call - replace with your actual API endpoint
        await new Promise(resolve => setTimeout(resolve, 1000));
        formMessage = 'Analysis started! We\'ll email you the results shortly.';
        websiteUrl = '';
      } catch (error) {
        formMessage = 'Something went wrong. Please try again.';
      } finally {
        isSubmitting = false;
      }
    };
  </script>
  
  <section class="bg-black py-20 px-4 md:px-8">
    <div class="max-w-6xl mx-auto">
      <!-- Grid layout for hero content and form -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Hero content -->
        <div class="text-center lg:text-left">
          <h1 class="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            <span class="inline bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">100x</span>
            <span class="block mt-2">Your Marketing Productivity</span>
          </h1>
          
          <h2 class="text-xl md:text-2xl text-gray-600 font-light mb-8 max-w-xl mx-auto lg:mx-0">
            Our AI marketing agents supercharge your strategy, delivering unmatched efficiency with cutting-edge design that keeps your brand ahead of the competition.
          </h2>
          
          <div class="hidden lg:block">
            <div class="flex items-center space-x-4 mb-6">
              <div class="bg-indigo-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
              <span class="text-gray-700">Intelligent content creation & optimization</span>
            </div>
            
            <div class="flex items-center space-x-4 mb-6">
              <div class="bg-indigo-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
              <span class="text-gray-700">Data-driven campaign management</span>
            </div>
            
            <div class="flex items-center space-x-4">
              <div class="bg-indigo-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
              <span class="text-gray-700">Contemporary design that converts</span>
            </div>
          </div>
        </div>
        
        <!-- Form card -->
        <div class="bg-gray-50 rounded-xl shadow-lg p-8 border border-gray-100">
          <h3 class="text-2xl font-bold text-gray-800 mb-2">Free Website Analysis</h3>
          <p class="text-gray-600 mb-6">Enter your website URL below to receive a free AI-powered marketing analysis</p>
          
          <form on:submit|preventDefault={handleSubmit} class="space-y-4">
            <div>
              <label for="websiteUrl" class="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
              <input
                type="url"
                id="websiteUrl"
                bind:value={websiteUrl}
                placeholder="https://your-website.com"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            
            {#if formMessage}
              <p class={formMessage.includes('started') ? 'text-green-600' : 'text-red-600'}>
                {formMessage}
              </p>
            {/if}
            
            <button
              type="submit"
              disabled={isSubmitting}
              class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300 flex justify-center items-center"
            >
              {#if isSubmitting}
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              {:else}
                Get Free Analysis
              {/if}
            </button>
            
            <p class="text-xs text-gray-500 text-center mt-4">
              No credit card required. Get actionable insights in 24 hours.
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>