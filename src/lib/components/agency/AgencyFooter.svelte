<script lang="ts">
</script>

<footer
	class="bg-[#0A0A0B] text-zinc-400 py-16 pt-24 relative overflow-hidden font-[Poppins] border-t border-white/5"
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
		<div class="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-24">
			<!-- Left side: Brand & Socials -->
			<div class="md:col-span-5 lg:col-span-4 flex flex-col items-start gap-5">
				<!-- Brand -->
				<div class="flex items-center gap-3 text-white">
					<div
						class="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#09090B] font-bold text-xl"
					>
						F
					</div>
					<span class="font-bold text-xl tracking-tight">Flowjoy</span>
				</div>
				<p class="text-sm font-light">© {new Date().getFullYear()} Flowjoy, Inc.</p>

				<!-- Buttons -->
				<div class="flex items-center gap-3 mt-2">
					<a
						href="#contact"
						class="px-5 py-2.5 rounded-xl bg-zinc-100 text-zinc-900 font-bold text-sm hover:bg-white transition-colors"
					>
						Contact
					</a>
					<a
						href="https://twitter.com/_nagativeIQ"
						target="_blank"
						rel="noopener noreferrer"
						class="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-all bg-[#181A1F]"
					>
						<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
							/>
						</svg>
					</a>
				</div>
			</div>

			<!-- Right side: Links -->
			<div class="md:col-span-7 lg:col-span-8 flex flex-wrap md:justify-end gap-16 lg:gap-32">
				<div class="flex flex-col gap-4">
					<h4 class="text-white text-xs font-bold tracking-widest uppercase mb-1">Product</h4>
					<a href="#services" class="text-sm hover:text-white transition-colors">Services</a>
					<a href="#case-studies" class="text-sm hover:text-white transition-colors">Case Studies</a
					>
					<a href="#pricing" class="text-sm hover:text-white transition-colors">Pricing</a>
				</div>
				<div class="flex flex-col gap-4">
					<h4 class="text-white text-xs font-bold tracking-widest uppercase mb-1">Company</h4>
					<a href="/contact-us" class="text-sm hover:text-white transition-colors">Contact Us</a>
					<a href="/privacy" class="text-sm hover:text-white transition-colors">Privacy Policy</a>
					<a href="/terms-of-service" class="text-sm hover:text-white transition-colors"
						>Terms of Service</a
					>
				</div>
			</div>
		</div>

		<!-- Big watermark logo stroke -->
		<div
			class="w-full flex justify-center items-end opacity-[0.15] pointer-events-none select-none overflow-hidden relative -mb-16 md:-mb-24"
		>
			<h1
				class="font-['Poppins'] font-black text-[12rem] md:text-[22rem] lg:text-[28rem] leading-[0.75] tracking-tighter text-transparent"
				style="-webkit-text-stroke: 3px rgba(255,255,255,0.5);"
			>
				Flowjoy
			</h1>
		</div>
	</div>
</footer>
