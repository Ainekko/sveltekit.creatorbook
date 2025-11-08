<script>
	import { onMount } from 'svelte';
	
	let showModal = false;
	let spotsRemaining = 10;
	let isClosing = false;

	onMount(() => {
		// Show modal after a brief delay for dramatic effect
		setTimeout(() => {
			showModal = true;
		}, 800);
	});

	function closeModal() {
		isClosing = true;
		setTimeout(() => {
			showModal = false;
		}, 300);
	}

	function claimLifetimeDeal() {
		// This would trigger the lifetime plan selection
		// You can integrate this with your existing plan selection logic
		window.location.href = '/plans?selected=lifetime';
	}
</script>

{#if showModal}
	<!-- Backdrop -->
	<div 
		class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 {isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}"
		on:click={closeModal}
		role="presentation"
	>
		<!-- Modal -->
		<div 
			class="relative max-w-2xl  w-full bg-zinc-950 rounded-3xl border border-amber-500/50 shadow-2xl shadow-amber-500/20 overflow-y-auto {isClosing ? 'animate-scaleOut' : 'animate-scaleIn'}"
			on:click|stopPropagation
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
		>
			<!-- Close Button -->
			<button 
				on:click={closeModal}
				class="absolute top-6 right-6 z-10 text-zinc-400 hover:text-white transition-colors"
				aria-label="Close modal"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
				</svg>
			</button>

			<!-- Animated Gradient Background -->
			<div class="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-red-600/10 animate-gradient"></div>
			
			<!-- Content -->
			<div class="relative p-6 md:p-8">
				<!-- Celebration Icon -->
				<div class="flex justify-center mb-4">
					<div class="relative">
						<div class="absolute inset-0 bg-gradient-to-r from-amber-400 to-red-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
						<div class="relative w-16 h-16 bg-gradient-to-r from-amber-400 to-red-600 rounded-full flex items-center justify-center">
							<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
							</svg>
						</div>
					</div>
				</div>

				<!-- Headline -->
				<h2 id="modal-title" class="text-2xl md:text-3xl font-bold text-white text-center mb-2">
					🎉 Congratulations!
				</h2>
				<p class="text-lg text-amber-400 text-center font-semibold mb-4">
					You're Eligible for Our Lifetime Deal
				</p>

				<!-- Spots Remaining Badge -->
				<div class="flex justify-center mb-5">
					<div class="bg-gradient-to-r from-red-600 to-orange-600 px-5 py-1.5 rounded-full border border-red-400/30 animate-pulse">
						<p class="text-white font-bold text-xs flex items-center gap-2">
							<svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
							</svg>
							Only {spotsRemaining} Spots Remaining
						</p>
					</div>
				</div>

				<!-- Features -->
				<div class="bg-zinc-900/50 rounded-2xl p-5 mb-5 border border-zinc-800">
					<div class="text-center mb-4">
						<div class="text-4xl font-bold text-white mb-1">
							$299
							<span class="text-base font-normal text-zinc-400 ml-2">one-time</span>
						</div>
						<p class="text-amber-400 font-medium text-sm">Pay once. Market forever.</p>
					</div>

					<div class="space-y-2.5">
						{#each [
							'5 projects included',
							'All AI agents with priority execution',
							'Advanced analytics & A/B testing',
							'Custom content templates',
							'Lifetime updates & support',
							'API access',
							'Early access to new features'
						] as feature}
							<div class="flex items-start text-zinc-300">
								<svg class="w-4 h-4 text-amber-400 mr-2.5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
								</svg>
								<span class="text-xs leading-tight">{feature}</span>
							</div>
						{/each}
					</div>
				</div>

				<!-- CTA Button -->
				<button 
					on:click={claimLifetimeDeal}
					class="w-full bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700 text-white px-6 py-4 rounded-xl font-bold text-base transition-all duration-200 transform hover:scale-105 shadow-lg shadow-amber-500/30 mb-3"
				>
					 Automate Marketing for Lifetime
				</button>

				<!-- Subtext -->
				<p class="text-center text-zinc-500 text-xs mb-4">
					Limited-time offer • Secure your spot before they're gone
				</p>

				<!-- Social Proof -->
				<div class="pt-4 border-t border-zinc-800">
					<div class="flex items-center justify-center gap-2 text-zinc-400 text-xs">
						<div class="flex -space-x-2">
							<div class="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 border-2 border-zinc-950"></div>
							<div class="w-7 h-7 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 border-2 border-zinc-950"></div>
							<div class="w-7 h-7 rounded-full bg-gradient-to-r from-orange-500 to-red-600 border-2 border-zinc-950"></div>
						</div>
						<span>43 builders already claimed their lifetime deal</span>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes fadeOut {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}

	@keyframes scaleIn {
		from {
			opacity: 0;
			transform: scale(0.9) translateY(20px);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}

	@keyframes scaleOut {
		from {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
		to {
			opacity: 0;
			transform: scale(0.9) translateY(20px);
		}
	}

	@keyframes gradient {
		0%, 100% {
			opacity: 0.3;
		}
		50% {
			opacity: 0.6;
		}
	}

	.animate-fadeIn {
		animation: fadeIn 0.3s ease-out forwards;
	}

	.animate-fadeOut {
		animation: fadeOut 0.3s ease-out forwards;
	}

	.animate-scaleIn {
		animation: scaleIn 0.4s ease-out forwards;
	}

	.animate-scaleOut {
		animation: scaleOut 0.3s ease-out forwards;
	}

	.animate-gradient {
		animation: gradient 3s ease-in-out infinite;
	}
</style>