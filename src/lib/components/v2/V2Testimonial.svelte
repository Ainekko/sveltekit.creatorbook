<script lang="ts">
  import { onMount } from 'svelte';

  let sectionRef: HTMLElement;
  let visible = false;

  onMount(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { visible = true; obs.disconnect(); }
      },
      { threshold: 0.2 }
    );
    obs.observe(sectionRef);
    return () => obs.disconnect();
  });
</script>

<section bind:this={sectionRef} class="py-12 bg-[#09090B] font-[Poppins]">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <div
      class="relative bg-[#111215] rounded-[2rem] p-8 md:p-10 border border-white/[0.06] overflow-hidden"
      style="opacity: {visible ? 1 : 0}; transform: translateY({visible ? 0 : 24}px) scale({visible ? 1 : 0.98}); transition: opacity 0.7s ease, transform 0.7s ease;"
    >
      <!-- Glow -->
      <div class="absolute -left-16 -bottom-16 w-48 h-48 bg-violet-500/10 rounded-full blur-[60px] pointer-events-none"></div>

      <div class="relative z-10 flex flex-col md:flex-row items-start gap-6">
        <!-- Quote -->
        <div class="flex-1">
          <svg
            class="w-6 h-6 text-white/10 mb-4"
            fill="currentColor"
            viewBox="0 0 24 24"
            style="opacity: {visible ? 1 : 0}; transform: translateY({visible ? 0 : 10}px); transition: opacity 0.5s ease 200ms, transform 0.5s ease 200ms;"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <blockquote
            class="text-white text-base md:text-lg font-medium leading-relaxed mb-4"
            style="opacity: {visible ? 1 : 0}; transform: translateY({visible ? 0 : 12}px); transition: opacity 0.6s ease 300ms, transform 0.6s ease 300ms;"
          >
            "We were missing calls left and right while on the job. They built us an AI front desk that picks up every call, books the meeting, and sends a confirmation — we haven't missed a lead since."
          </blockquote>
          <div
            class="flex items-center gap-3"
            style="opacity: {visible ? 1 : 0}; transform: translateY({visible ? 0 : 10}px); transition: opacity 0.5s ease 450ms, transform 0.5s ease 450ms;"
          >
            <div class="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 border border-white/10 flex items-center justify-center">
              <span class="text-white font-bold text-sm">M</span>
            </div>
            <div>
              <span class="text-white font-medium text-sm">MHR</span>
              <span class="text-zinc-500 text-sm"> · Service Business</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
