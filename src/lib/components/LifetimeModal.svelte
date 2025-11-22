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
		class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 {isClosing
			? 'animate-fadeOut'
			: 'animate-fadeIn'}"
		on:click={closeModal}
		role="presentation"
	>
		<!-- Modal -->
		<div
			class="relative max-w-2xl w-full bg-white rounded-[2.5rem] p-2 shadow-2xl overflow-hidden {isClosing
				? 'animate-scaleOut'
				: 'animate-scaleIn'}"
			on:click|stopPropagation
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
		>
			<!-- Close Button -->
			<button
				on:click={closeModal}
				class="absolute top-6 right-6 z-10 text-zinc-400 hover:text-zinc-900 transition-colors bg-white rounded-full p-1 shadow-sm"
				aria-label="Close modal"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					></path>
				</svg>
			</button>

			<!-- Inner Content with Amber Accent -->
			<div class="bg-amber-50/30 rounded-[2rem] p-8 md:p-12 relative overflow-hidden">
				<!-- Background Glow -->
				<div
					class="absolute top-0 right-0 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl pointer-events-none"
				></div>

				<div class="relative z-10">
					<!-- Star Icon -->
					<div class="flex justify-center mb-6">
						<div
							class="w-20 h-20 rounded-full bg-gradient-to-b from-white to-amber-50 border border-amber-200 shadow-lg flex items-center justify-center"
						>
							<svg class="w-10 h-10 text-amber-500 fill-amber-500" viewBox="0 0 24 24">
								<path
									d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
								/>
							</svg>
						</div>
					</div>

					<!-- Headline -->
					<div
						class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold mb-4 border border-amber-200 mx-auto block w-fit"
					>
						<svg class="w-3 h-3 fill-amber-700" viewBox="0 0 24 24">
							<path
								d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
							/>
						</svg>
						LIMITED TIME OFFER
					</div>

					<h2
						id="modal-title"
						class="text-3xl md:text-4xl font-bold text-zinc-900 text-center mb-3"
					>
						Become a Founding Member
					</h2>
					<p class="text-lg text-zinc-600 text-center mb-6">Pay once. Own it forever.</p>

					<!-- Spots Remaining Badge -->
					<div class="flex justify-center mb-8">
						<div class="bg-red-50 px-4 py-2 rounded-full border border-red-200">
							<p class="text-red-700 font-bold text-sm flex items-center gap-2">
								<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
									<path
										fill-rule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
										clip-rule="evenodd"
									></path>
								</svg>
								Only {spotsRemaining} Spots Remaining
							</p>
						</div>
					</div>

					<!-- Price & Features Grid -->
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
						<!-- Price -->
						<div class="bg-white/50 rounded-2xl p-6 border border-amber-100/50 text-center">
							<div class="text-5xl font-bold text-zinc-900 mb-2">$299</div>
							<p class="text-amber-600 font-medium text-sm">One-time payment</p>
						</div>

						<!-- Features -->
						<div class="bg-white/50 rounded-2xl p-6 border border-amber-100/50">
							<div class="space-y-3">
								{#each ['20 Active Projects', 'All Future Updates', 'Priority Support', 'Community Access', 'Early Feature Access'] as feature}
									<div class="flex items-start gap-3 text-sm text-zinc-700">
										<div
											class="mt-0.5 w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0"
										>
											<svg
												class="w-3 h-3 text-amber-600"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M5 13l4 4L19 7"
												></path>
											</svg>
										</div>
										{feature}
									</div>
								{/each}
							</div>
						</div>
					</div>

					<!-- CTA Button -->
					<button
						on:click={claimLifetimeDeal}
						class="w-full py-4 rounded-2xl font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2 bg-zinc-900 text-white hover:bg-zinc-800 mb-4"
					>
						Get Lifetime Access
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13 7l5 5m0 0l-5 5m5-5H6"
							></path>
						</svg>
					</button>

					<!-- Subtext -->
					<p class="text-center text-amber-600 text-xs font-medium animate-pulse mb-6">
						Limited-time offer • Secure your spot now
					</p>

					<!-- Social Proof -->
					<div class="pt-6 border-t border-amber-100">
						<div class="flex items-center justify-center gap-3 text-zinc-500 text-sm">
							<div class="flex -space-x-2">
								<div
									class="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 border-2 border-white"
								></div>
								<div
									class="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 border-2 border-white"
								></div>
								<div
									class="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-600 border-2 border-white"
								></div>
							</div>
							<span>43 builders already claimed their spot</span>
						</div>
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
</style>
