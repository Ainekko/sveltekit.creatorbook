<!-- Landing.svelte (Main component with duplicates removed) -->

<script lang="ts">
	import { onMount } from 'svelte';
	// import FloatingQuestions from './FloatingQuestions.svelte';
	import HeroContent from './HeroContent.svelte';
	import AgentsSection from './AgentsSection.svelte';
	import GetStartedBar from './GetStartedBar.svelte';
	import PerfectFor from './PerfectFor.svelte';
	import DashboardSection from './DashboardSection.svelte';
	import HowItWorks from './HowItWorks.svelte';

	let email = '';
	let isSubmitting = false;
	let activeAgent = 'Nai';
	export let posts = [];

	const agents = {
		Nai: {
			id: 'Nai',
			name: 'Nai',
			subtitle: 'SEO Assistant',
			description:
				'Research keywords, optimize content, and boost your search visibility with intelligent SEO recommendations.',
			gradient: 'from-blue-500 to-blue-600',
			icon: 'search',
			tags: ['Keyword Research', 'Content Optimization', 'SERP Analysis'],
			metrics: {
				main: '85%',
				mainLabel: 'Time Saved',
				stats: [
					{ value: '4x', label: 'Faster Research' },
					{ value: '12h', label: 'Weekly Savings' },
					{ value: '+45%', label: 'Productivity' }
				]
			},
			videoUrl: 'https://rechatcreatorbook.s3.us-west-2.amazonaws.com/s-teir/Nai+Demo.mp4'
		},
		/* Rio Hidden
		Rio: {
			id: 'Rio',
			name: 'Rio',
			subtitle: 'Twitter Growth',
			description:
				'Create engaging tweets, schedule posts, and grow your Twitter audience with data-driven insights.',
			gradient: 'from-sky-500 to-blue-500',
			icon: 'twitter',
			tags: ['Tweet Generation', 'Audience Growth', 'Engagement Analytics'],
			metrics: {
				main: '65%',
				mainLabel: 'Time Saved',
				stats: [
					{ value: '3x', label: 'More Engagement' },
					{ value: '8h', label: 'Weekly Savings' },
					{ value: '+52%', label: 'Reach Increase' }
				]
			},
			videoUrl: 'https://rechatcreatorbook.s3.us-west-2.amazonaws.com/s-teir/Rio+Demo.mp4'
		},
		*/
		Elio: {
			id: 'Elio',
			name: 'Elio',
			subtitle: 'Reddit Marketing',
			description:
				'Build communities, create valuable posts, and engage authentically on Reddit with strategic guidance.',
			gradient: 'from-orange-500 to-red-500',
			icon: 'reddit',
			tags: ['Community Building', 'Content Strategy', 'Authentic Engagement'],
			metrics: {
				main: '72%',
				mainLabel: 'Time Saved',
				stats: [
					{ value: '5x', label: 'Better Posts' },
					{ value: '10h', label: 'Weekly Savings' },
					{ value: '+38%', label: 'Community Growth' }
				]
			},
			videoUrl: 'https://rechatcreatorbook.s3.us-west-2.amazonaws.com/s-teir/Elio+Demo.mp4'
		}
	};

	async function handleSignUp() {
		if (isSubmitting || !email) return;

		if (!email.includes('@')) {
			alert('Please enter a valid email address');
			return;
		}

		isSubmitting = true;

		try {
			await new Promise((resolve) => setTimeout(resolve, 2000));
			alert(`🚀 Welcome to Flowjoy! Check ${email} for your dashboard access and setup guide.`);
			email = '';
		} catch (error) {
			alert('Something went wrong. Please try again or contact support.');
		} finally {
			isSubmitting = false;
		}
	}

	function handleKeyPress(event: any) {
		if (event.key === 'Enter') {
			handleSignUp();
		}
	}

	function setActiveAgent(agentId: any) {
		activeAgent = agentId;
	}

	onMount(() => {
		// Mount effects
	});
</script>

<section
	class="hero-section font-[Poppins] relative min-h-screen bg-white text-zinc-900 overflow-x-hidden"
>
	<!-- <FloatingQuestions /> -->

	<div class="relative z-10 pt-20 pb-12 bg-white">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<HeroContent
				bind:email
				{isSubmitting}
				on:signup={handleSignUp}
				on:keypress={handleKeyPress}
			/>
		</div>
	</div>

	<DashboardSection />

	<div class="relative z-10 bg-white pb-12">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<AgentsSection bind:activeAgent {agents} {posts} on:setagent={setActiveAgent} />
		</div>
	</div>

	<HowItWorks />

	<div class="relative z-10 bg-white py-12">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
			<PerfectFor />
			<GetStartedBar />
		</div>
	</div>
</section>

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
