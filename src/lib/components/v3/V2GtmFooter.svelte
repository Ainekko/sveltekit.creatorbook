<script lang="ts">
  const currentYear = new Date().getFullYear();
</script>

<footer class="bg-[#060504] text-zinc-400 py-16 border-t border-[#1A1410] font-[Poppins]">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

      <!-- Brand matching main site -->
      <div class="md:col-span-2">
        <a href="/v3" class="inline-flex items-center mb-4 text-white">
          <span class="text-2xl font-semibold">
            flow<span class="font-[Pacifico]">j</span>oy
          </span>
        </a>
        <p class="text-sm text-zinc-400 max-w-md leading-relaxed font-light mb-6">
          A GTM engineering studio for startups. We build the prospecting infrastructure, lead intelligence, AI agents, and outbound systems your engineering team doesn't have time to build.
        </p>
      </div>

      <!-- Col 2: Capabilities -->
      <div>
        <h4 class="text-xs font-semibold uppercase tracking-wider text-white mb-4">
          Capabilities
        </h4>
        <ul class="space-y-2.5 text-sm font-light">
          <li><a href="#capabilities" class="hover:text-white transition">GTM Intelligence</a></li>
          <li><a href="#capabilities" class="hover:text-white transition">Prospecting Infrastructure</a></li>
          <li><a href="#capabilities" class="hover:text-white transition">Outbound Systems</a></li>
          <li><a href="#capabilities" class="hover:text-white transition">AI Agents</a></li>
          <li><a href="#capabilities" class="hover:text-white transition">Internal GTM Tools</a></li>
        </ul>
      </div>

      <!-- Col 3: Systems & Offers -->
      <div>
        <h4 class="text-xs font-semibold uppercase tracking-wider text-white mb-4">
          Systems
        </h4>
        <ul class="space-y-2.5 text-sm font-light">
          <li><a href="#what-we-built" class="hover:text-white transition">Elio (Reddit Intelligence)</a></li>
          <li><a href="#what-we-built" class="hover:text-white transition">Nai (SEO Pipeline)</a></li>
          <li><a href="#what-we-built" class="hover:text-white transition">Broadr (SMS Infrastructure)</a></li>
          <li><a href="#what-we-built" class="hover:text-white transition">Laurie (Voice Infrastructure)</a></li>
          <li><a href="#pricing" class="hover:text-white transition">Engineering Sprints</a></li>
        </ul>
      </div>

    </div>

    <!-- Bottom copyright -->
    <div class="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
      <div>
        &copy; {currentYear} Flowjoy. All rights reserved.
      </div>
      <div class="flex items-center gap-6">
        <a href="/" class="hover:text-zinc-300 transition">Main Site</a>
        <a href="#gtm-teardown" class="hover:text-zinc-300 transition">Free Teardown</a>
        <a
          data-cal-link="hafid-ahlaqach-nigixz/15min"
          data-cal-namespace="15min"
          class="hover:text-zinc-300 transition cursor-pointer"
        >
          Book a call
        </a>
      </div>
    </div>
  </div>
</footer>
