<!-- HeroContent.svelte -->

<script lang="ts">
	import { onMount } from 'svelte';
	import { blur } from 'svelte/transition';

	// Observer setup function
	function setupObserver(ref: HTMLElement | null, callback: () => void) {
		if (!ref) return { disconnect: () => {} };
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					callback();
					observer.unobserve(ref);
				}
			},
			{ threshold: 0.1 }
		);
		observer.observe(ref);
		return observer;
	}

	// Visibility states
	let isVisibleHeadline = false;
	let headlineRef: HTMLDivElement | null = null;

	let isVisibleCTA = false;
	let ctaRef: HTMLDivElement | null = null;

	let isVisibleVideo = false;
	let videoRef: HTMLDivElement | null = null;

	let isVisibleStats = false;
	let statsRef: HTMLDivElement | null = null;

	// Video player state
	let isPlaying = false;
	let videoElement: HTMLVideoElement | null = null;

	function playVideo() {
		if (videoElement) {
			videoElement.play();
			isPlaying = true;
		}
	}

	onMount(() => {
		const obsHeadline = setupObserver(headlineRef, () => (isVisibleHeadline = true));
		const obsCTA = setupObserver(ctaRef, () => (isVisibleCTA = true));
		const obsVideo = setupObserver(videoRef, () => (isVisibleVideo = true));
		const obsStats = setupObserver(statsRef, () => (isVisibleStats = true));

		return () => {
			obsHeadline.disconnect();
			obsCTA.disconnect();
			obsVideo.disconnect();
			obsStats.disconnect();
		};
	});

	// Listen for video events
	$: if (videoElement) {
		const handlePlay = () => (isPlaying = true);
		const handlePause = () => (isPlaying = false);
		const handleEnded = () => (isPlaying = false);

		videoElement.addEventListener('play', handlePlay);
		videoElement.addEventListener('pause', handlePause);
		videoElement.addEventListener('ended', handleEnded);
	}
</script>

<!-- Main Hero Content -->
<div class="text-center mb-16 min-h-screen">
	<div bind:this={headlineRef} class="space-y-6 mb-12 relative">
		{#if isVisibleHeadline}
			<h1
				in:blur={{ delay: 0, duration: 600, amount: 5 }}
				class="text-4xl md:text-5xl lg:text-6xl font-semibold text-zinc-700 leading-tight tracking-tight"
			>
				AI for <span class="font-['Pacifico']">joyful</span> marketing.
			</h1>

			<p
				in:blur={{ delay: 200, duration: 600, amount: 5 }}
				class="text-xl md:text-2xl text-zinc-500 max-w-3xl mx-auto leading-relaxed font-light"
			>
				Automate
				<svg
					class="inline w-5 h-5 text-zinc-950 align-middle mx-1"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					aria-label="SEO"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					></path>
				</svg>
				SEO,
				<!-- X Hidden
        <svg class="inline w-5 h-5 text-zinc-950 align-middle mx-1" fill="currentColor" viewBox="0 0 24 24" aria-label="X (Twitter)">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg> 
        X, and 
        -->
				and
				<svg
					class="inline w-5 h-5 text-zinc-950 align-middle mx-1"
					fill="currentColor"
					viewBox="0 0 24 24"
					aria-label="Reddit"
				>
					<path
						d="M12 0A12 12 0 00 0 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 01-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 01.042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 014.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 01.14-.197.35.35 0 01.238-.042l2.906.617a1.214 1.214 0 011.108-.701zM9.25 12c-.689 0-1.25.561-1.25 1.25 0 .688.561 1.249 1.25 1.249.688 0 1.249-.561 1.249-1.249 0-.688-.561-1.25-1.249-1.25zm5.5 0c-.689 0-1.25.561-1.25 1.25 0 .688.561 1.249 1.25 1.249.688 0 1.249-.561 1.249-1.249 0-.688-.561-1.25-1.25-1.25zm-5.466 3.99a.327.327 0 00-.231.094.33.33 0 00.029.463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 00.029-.463.33.33 0 00-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 00-.232-.095z"
					/>
				</svg>
				Reddit growth —
				<span class="twisted-underline"
					>no complex workflows
					<svg
						viewBox="0 0 100 10"
						fill="none"
						stroke="#f97316"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<path d="M0 5 C 20 0, 40 10, 60 5 C 80 0, 90 10, 100 5" />
					</svg>
				</span>.
			</p>
		{/if}
	</div>

	<!-- CTA Section -->
	<div bind:this={ctaRef} class="max-w-md mx-auto space-y-4 mb-16 relative">
		{#if isVisibleCTA}
			<div
				in:blur={{ delay: 0, duration: 600, amount: 5 }}
				class="flex flex-col sm:flex-row gap-3 justify-center"
			>
				<button
					class="bg-zinc-900 hover:bg-zinc-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 relative"
				>
					Get started for free
					<div
						class="absolute top-0 right-0 w-4 h-4 -z-10 bg-orange-400 rounded-full gentle-float"
						style="animation-delay: -3s;"
					></div>
				</button>
				<a
					href="/contact-us"
					class="bg-white border border-zinc-200 text-zinc-900 px-6 py-3 rounded-lg font-medium hover:bg-zinc-100 transition-all duration-200"
				>
					Contact us
				</a>
			</div>
			<p
				in:blur={{ delay: 200, duration: 600, amount: 5 }}
				class="text-sm text-zinc-400 flex items-center justify-center gap-1"
			>
				<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
					<path
						fill-rule="evenodd"
						d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
						clip-rule="evenodd"
					></path>
				</svg>
				14-day free trial · No credit card required
			</p>
		{/if}
	</div>

	<!-- Video Center Stage -->
	<div bind:this={videoRef} class="mb-16 relative">
		{#if isVisibleVideo}
			<div
				in:blur={{ delay: 0, duration: 600, amount: 5 }}
				class="video-container max-w-4xl mx-auto relative"
			>
				<video
					bind:this={videoElement}
					src="https://rechatcreatorbook.s3.us-west-2.amazonaws.com/flowjoy/Flowjoy+comp.mp4"
					controls
					loop
					class="w-full h-full"
					style="aspect-ratio: 16/9;"
					poster="/naiSection.jpg"
					preload="metadata"
					aria-label="Flowjoy product demonstration video"
				>
					Your browser does not support the video tag.
				</video>

				{#if !isPlaying}
					<button
						on:click={playVideo}
						class="play-button-overlay"
						aria-label="Play video demonstration"
					>
						<div class="play-button-circle">
							<svg class="play-icon" viewBox="0 0 24 24" fill="currentColor">
								<path d="M8 5v14l11-7z" />
							</svg>
						</div>
					</button>
				{/if}
			</div>
			<p
				in:blur={{ delay: 200, duration: 600, amount: 5 }}
				class="text-sm text-zinc-400 mt-4 text-center"
			>
				See Flowjoy eliminate marketing complexity
			</p>
		{/if}
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

	@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

	:global(body) {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', system-ui, sans-serif;
	}

	.gradient-text {
		background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.notion-card {
		background: white;
		border: 1px solid #e5e7eb;
		transition: all 0.2s ease;
	}

	.notion-card:hover {
		border-color: #d1d5db;
		box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.05);
	}

	.gentle-float {
		animation: gentle-float 8s ease-in-out infinite;
	}

	@keyframes gentle-float {
		0%,
		100% {
			transform: translateY(0px) rotate(0deg);
		}
		25% {
			transform: translateY(-5px) rotate(1deg);
		}
		50% {
			transform: translateY(-8px) rotate(0deg);
		}
		75% {
			transform: translateY(-3px) rotate(-1deg);
		}
	}

	.tab-button {
		transition: all 0.15s ease;
	}

	.tab-button:hover {
		transform: translateY(-1px);
	}

	.fade-in {
		animation: fadeIn 0.4s ease-out forwards;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.speech-bubble {
		position: absolute;
		background: black;
		border: 1px solid #f3f4f6;
		border-radius: 12px;
		padding: 12px 16px;
		max-width: 200px;
		font-size: 14px;
		color: black;
		animation: gentle-float 10s ease-in-out infinite;
		box-shadow: 0 2px 8px -2px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(8px);
	}

	.speech-bubble:after {
		content: '';
		position: absolute;
		bottom: -6px;
		left: 50%;
		transform: translateX(-50%);
		width: 0;
		height: 0;
		border-left: 6px solid transparent;
		border-right: 6px solid transparent;
		border-top: 6px solid white;
	}

	.video-container {
		position: relative;
		border-radius: 16px;
		overflow: hidden;
		box-shadow: 0 8px 32px -8px rgba(0, 0, 0, 0.12);
		border: 2px solid transparent;
		background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%) padding-box;
	}

	.play-button-overlay {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 10;
		cursor: pointer;
		background: none;
		border: none;
		transition: transform 0.3s ease;
	}

	.play-button-overlay:hover {
		transform: translate(-50%, -50%) scale(1.1);
	}

	.play-button-circle {
		width: 80px;
		height: 80px;
		background: rgba(255, 255, 255, 0.95);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
		backdrop-filter: blur(10px);
		transition: all 0.3s ease;
	}

	.play-button-overlay:hover .play-button-circle {
		background: rgba(255, 255, 255, 1);
		box-shadow: 0 12px 48px rgba(0, 0, 0, 0.3);
	}

	.play-icon {
		width: 32px;
		height: 32px;
		color: #18181b;
		margin-left: 4px;
	}

	.hero-section {
		background: radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
			radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.03) 0%, transparent 50%);
	}

	.agent-card {
		transition: all 0.3s ease;
		border-radius: 12px;
	}

	.stat-card {
		background: #fafbfc;
		border: 1px solid #f1f3f4;
		transition: all 0.15s ease;
		position: relative;
	}

	.stat-card:hover {
		background: white;
		border-color: #e5e7eb;
	}

	.twisted-underline {
		display: inline-block;
		position: relative;
	}

	.twisted-underline svg {
		position: absolute;
		bottom: -8px;
		left: 0;
		width: 100%;
		height: 12px;
	}
</style>
