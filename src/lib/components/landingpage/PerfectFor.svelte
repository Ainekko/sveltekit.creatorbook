<!-- PerfectFor.svelte -->

<!-- Bottom CTA -->
<div class="text-center mt-20 pt-12 border-t border-zinc-100 relative">
    <p class="text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
      Perfect for <strong>founders</strong>, <strong>growth teams</strong>, and <strong>solo creators</strong> who need marketing results without the complexity.
    </p>
  
    <div class="absolute top-0 right-0 w-4 h-4 bg-purple-400 rounded-full gentle-float" style="animation-delay: -2s;"></div>
  
    <!-- New Cards Section -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12">
      {#each [
        {
          heading: 'Validate Ideas Fast',
          description: 'Founders can start a project and connect agents to quickly test and validate ideas, seeing what works in real-time to market multiple projects efficiently.'
        },
        {
          heading: 'Scale Growth Effortlessly',
          description: 'Growth teams can automate SEO, X, and Reddit tasks, streamlining campaigns to focus on strategy and scaling without manual overhead.'
        },
        {
          heading: 'Create with Ease',
          description: 'Solo creators can leverage AI agents to produce engaging content and build communities, saving time and boosting impact across platforms.'
        }
      ] as card}
        <div class="stat-card p-6 rounded-lg text-center">
          <div class="text-xl font-semibold text-zinc-900 mb-2">{card.heading}</div>
          <div class="text-sm text-zinc-500">{card.description}</div>
        </div>
      {/each}
    </div>
  </div>