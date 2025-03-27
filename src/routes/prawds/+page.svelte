<div class="bg-zinc-50 min-h-screen">
    <!-- Header/Navigation -->
    <nav class="bg-white border-b border-zinc-200 px-6 py-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-rose-400"></div>
          <div class="w-3 h-3 rounded-full bg-amber-400"></div>
          <div class="w-3 h-3 rounded-full bg-emerald-400"></div>
          <span class="ml-2 font-medium text-zinc-900">Reddit Research Dashboard</span>
        </div>
        <div class="flex items-center gap-4">
          <button class="text-sm text-zinc-600 hover:text-zinc-900">Settings</button>
          <div class="h-6 w-6 rounded-full bg-zinc-200 flex items-center justify-center text-xs font-medium">
            JD
          </div>
        </div>
      </div>
    </nav>
    
    <!-- Main Content -->
    <div class="container mx-auto px-4 py-6">
      
      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="bg-white rounded-xl border border-zinc-200 p-4 shadow-sm">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-sm font-medium text-zinc-500">Active Campaigns</h3>
            <span class="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">+2 new</span>
          </div>
          <p class="text-2xl font-semibold">3</p>
          <div class="mt-2 flex items-center text-xs text-zinc-500">
            <span>Last updated 2 hours ago</span>
          </div>
        </div>
        
        <div class="bg-white rounded-xl border border-zinc-200 p-4 shadow-sm">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-sm font-medium text-zinc-500">Monitored Competitors</h3>
            <span class="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">12 total</span>
          </div>
          <p class="text-2xl font-semibold">12</p>
          <div class="mt-2 flex items-center text-xs text-zinc-500">
            <span>Across 3 campaigns</span>
          </div>
        </div>
        
        <div class="bg-white rounded-xl border border-zinc-200 p-4 shadow-sm">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-sm font-medium text-zinc-500">Strategy Insights</h3>
            <span class="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">5 new</span>
          </div>
          <p class="text-2xl font-semibold">14</p>
          <div class="mt-2 flex items-center text-xs text-zinc-500">
            <span>Generated this month</span>
          </div>
        </div>
      </div>
      
      <!-- Recent Campaigns -->
      <div class="bg-white rounded-xl border border-zinc-200 p-4 shadow-sm mb-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="font-medium text-zinc-900">Recent Campaigns</h2>
          <button class="text-xs text-black bg-zinc-100 px-3 py-1.5 rounded-lg hover:bg-zinc-200">
            View All
          </button>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-zinc-200">
            <thead>
              <tr>
                <th class="px-3 py-2 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Campaign</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Business Type</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Status</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Last Updated</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-zinc-200">
              <tr>
                <td class="px-3 py-3 text-sm text-zinc-900">SaaS Growth Strategy</td>
                <td class="px-3 py-3 text-sm text-zinc-500">SaaS</td>
                <td class="px-3 py-3">
                  <span class="px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">Active</span>
                </td>
                <td class="px-3 py-3 text-sm text-zinc-500">Today</td>
                <td class="px-3 py-3 text-sm">
                  <button class="text-black hover:text-zinc-700">View</button>
                </td>
              </tr>
              <tr>
                <td class="px-3 py-3 text-sm text-zinc-900">E-commerce Competitor Analysis</td>
                <td class="px-3 py-3 text-sm text-zinc-500">E-commerce</td>
                <td class="px-3 py-3">
                  <span class="px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">Active</span>
                </td>
                <td class="px-3 py-3 text-sm text-zinc-500">Yesterday</td>
                <td class="px-3 py-3 text-sm">
                  <button class="text-black hover:text-zinc-700">View</button>
                </td>
              </tr>
              <tr>
                <td class="px-3 py-3 text-sm text-zinc-900">Local Business Strategy</td>
                <td class="px-3 py-3 text-sm text-zinc-500">Local Business</td>
                <td class="px-3 py-3">
                  <span class="px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">Active</span>
                </td>
                <td class="px-3 py-3 text-sm text-zinc-500">3 days ago</td>
                <td class="px-3 py-3 text-sm">
                  <button class="text-black hover:text-zinc-700">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Two-column layout for bottom section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Strategy Recommendations -->
        <div class="bg-white rounded-xl border border-zinc-200 p-4 shadow-sm">
          <div class="flex justify-between items-center mb-4">
            <h2 class="font-medium text-zinc-900">Latest Strategy Insights</h2>
            <button class="text-xs text-zinc-500 hover:text-zinc-700">See all</button>
          </div>
          
          <div class="space-y-4">
            <div class="p-3 bg-zinc-50 rounded-lg">
              <div class="flex justify-between">
                <p class="text-sm font-medium text-zinc-900">SaaS Growth Strategy</p>
                <span class="text-xs text-zinc-500">Today</span>
              </div>
              <p class="mt-1 text-xs text-zinc-700">Focus on Reddit community engagement in r/SaaS and r/startups with weekly value-adding posts.</p>
            </div>
            
            <div class="p-3 bg-zinc-50 rounded-lg">
              <div class="flex justify-between">
                <p class="text-sm font-medium text-zinc-900">E-commerce Competitor Analysis</p>
                <span class="text-xs text-zinc-500">Yesterday</span>
              </div>
              <p class="mt-1 text-xs text-zinc-700">Develop how-to guides for product usage based on common Reddit questions in r/ecommerce.</p>
            </div>
            
            <div class="p-3 bg-zinc-50 rounded-lg">
              <div class="flex justify-between">
                <p class="text-sm font-medium text-zinc-900">Local Business Strategy</p>
                <span class="text-xs text-zinc-500">3 days ago</span>
              </div>
              <p class="mt-1 text-xs text-zinc-700">Engage in local subreddits with community-focused content and special offers.</p>
            </div>
          </div>
        </div>
        
        <!-- Competitor Activity -->
        <div class="bg-white rounded-xl border border-zinc-200 p-4 shadow-sm">
          <div class="flex justify-between items-center mb-4">
            <h2 class="font-medium text-zinc-900">Competitor Activity</h2>
            <button class="text-xs text-zinc-500 hover:text-zinc-700">See all</button>
          </div>
          
          <div class="space-y-3">
            <div class="flex items-center justify-between text-xs text-zinc-500 px-3">
              <span>Competitor</span>
              <span>Reddit Activity</span>
            </div>
            
            <div class="p-3 bg-zinc-50 rounded-lg flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-zinc-900">Competitor A</p>
                <p class="text-xs text-zinc-500">SaaS</p>
              </div>
              <div class="flex items-center">
                <div class="w-16 bg-zinc-200 rounded-full h-2 mr-2">
                  <div class="bg-emerald-500 h-2 rounded-full" style="width: 70%"></div>
                </div>
                <span class="text-xs font-medium">High</span>
              </div>
            </div>
            
            <div class="p-3 bg-zinc-50 rounded-lg flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-zinc-900">Competitor B</p>
                <p class="text-xs text-zinc-500">SaaS</p>
              </div>
              <div class="flex items-center">
                <div class="w-16 bg-zinc-200 rounded-full h-2 mr-2">
                  <div class="bg-amber-500 h-2 rounded-full" style="width: 40%"></div>
                </div>
                <span class="text-xs font-medium">Medium</span>
              </div>
            </div>
            
            <div class="p-3 bg-zinc-50 rounded-lg flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-zinc-900">Competitor C</p>
                <p class="text-xs text-zinc-500">SaaS</p>
              </div>
              <div class="flex items-center">
                <div class="w-16 bg-zinc-200 rounded-full h-2 mr-2">
                  <div class="bg-rose-500 h-2 rounded-full" style="width: 10%"></div>
                </div>
                <span class="text-xs font-medium">Low</span>
              </div>
            </div>
            
            <div class="p-3 bg-zinc-50 rounded-lg flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-zinc-900">Competitor D</p>
                <p class="text-xs text-zinc-500">E-commerce</p>
              </div>
              <div class="flex items-center">
                <div class="w-16 bg-zinc-200 rounded-full h-2 mr-2">
                  <div class="bg-emerald-500 h-2 rounded-full" style="width: 80%"></div>
                </div>
                <span class="text-xs font-medium">High</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Create New Campaign CTA -->
      <div class="mt-6 bg-black rounded-xl p-6 text-center">
        <h3 class="text-white font-medium mb-2">Ready to create a new research campaign?</h3>
        <p class="text-zinc-300 text-sm mb-4">Generate competitor analysis and content strategies tailored to your business</p>
        <button class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-black bg-white hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
          <span>New Campaign</span>
          <div class="ml-2 w-4 h-4 rounded-full bg-[#fffbbd]"></div>
        </button>
      </div>
    </div>
  </div>