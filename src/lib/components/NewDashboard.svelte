<!-- lib/components/NewDashboard.svelte -->

<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import ProjectHeader from '$lib/components/ProjectHeader.svelte';
	import GenerationProgress from '$lib/components/GenerationProgress.svelte';
	import AgentTabs from '$lib/components/AuthDashboard/AgentTabs.svelte';
	import AgentCard from '$lib/components/AuthDashboard/AgentCard.svelte';
	import { currentProjectAgents } from '$lib/projects/stores';
	import { workflowStore, contentStore } from '$lib/components/nai/stores';
	import { elioStore } from '$lib/components/elio/stores';

	export let data;

	let isGenerating = false;
	let generationProgress = '';
	let isGeneratingPost = false;
	let currentGeneratingPostIndex = -1;
	let selectedAgentId = 'seo';

	// Project Data
	$: projectData = {
		id: data?.project?.id || '',
		name: data?.project?.url || 'N/A',
		url: data?.project?.url || 'N/A',
		startDate: data?.project?.created_at?.split('T')[0] || 'N/A'
	};

	// Content Data (fallback to static data if stores are empty)
	$: contentPlan = data?.project?.latest_run?.result?.analysis_data?.content_plan || {};
	$: blogPostOutlines = contentPlan?.seo?.blog_post_outlines || [];
	$: selectedKeywords = contentPlan?.seo?.selected_keywords || [];
	$: redditPosts = contentPlan?.socials?.reddit_posts || [];
	$: twitterPosts = contentPlan?.socials?.twitter_posts || [];

	// let projectId = projectData.id

	// Format Time
	function formatRelativeTime(timestamp: string): string {
		if (!timestamp) return 'N/A';
		const now = new Date();
		const date = new Date(timestamp);
		const diffMs = now.getTime() - date.getTime();
		const diffMins = Math.round(diffMs / 60000);
		if (diffMins < 1) return 'Just now';
		if (diffMins < 60) return `${diffMins}m ago`;
		const diffHours = Math.round(diffMins / 60);
		if (diffHours < 24) return `${diffHours}h ago`;
		const diffDays = Math.round(diffHours / 24);
		return `${diffDays}d ago`;
	}

	// Agent Styles
	const agentStyles = {
		seo: { color: 'emerald', gradient: 'from-emerald-500 to-zinc-600' },
		twitter: { color: 'blue', gradient: 'from-blue-500 to-zinc-600' },
		reddit: { color: 'orange', gradient: 'from-orange-500 to-zinc-600' }
	};

	// Build agent activity from workflow data
	function buildNaiActivity(workflow: any, content: any) {
		const activities = [];

		if (workflow.status === 'running') {
			activities.push({
				type: 'workflow',
				action: 'Workflow running',
				detail: workflow.progressMessage || 'Processing...',
				time: 'Now'
			});
		}

		if (workflow.completedSteps.length > 0) {
			const lastStep = workflow.completedSteps[workflow.completedSteps.length - 1];
			activities.push({
				type: 'success',
				action: 'Step completed',
				detail: lastStep.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
				time: workflow.lastRun ? formatRelativeTime(workflow.lastRun) : 'Recently'
			});
		}

		if (content.keywords.length > 0 && !content.keywordsLoading) {
			activities.push({
				type: 'content',
				action: 'Keywords found',
				detail: `${content.keywords.length} opportunities`,
				time: 'Recent scan'
			});
		}

		if (content.outlines.length > 0 && !content.outlinesLoading) {
			activities.push({
				type: 'content',
				action: 'Outlines generated',
				detail: `${content.outlines.length} ready`,
				time: 'Recent'
			});
		}

		if (content.topCompetitors.length > 0) {
			activities.push({
				type: 'analysis',
				action: 'Competitor analysis',
				detail: `Tracking ${content.topCompetitors.length} domains`,
				time: 'Recent'
			});
		}

		// Fallback to agent activities if no workflow data
		if (activities.length === 0 && $currentProjectAgents[0]?.activities) {
			return $currentProjectAgents[0].activities
				.map((a) => ({
					type: a.activity_type,
					action: a.action,
					detail: a.detail,
					time: formatRelativeTime(a.created_at)
				}))
				.slice(0, 4);
		}

		return activities.slice(0, 4);
	}

	// Build insights from workflow and content data
	function buildNaiInsights(workflow: any, content: any) {
		const insights = [];

		if (workflow.nextRun) {
			const nextRunDate = new Date(workflow.nextRun);
			const now = new Date();
			const diffMs = nextRunDate.getTime() - now.getTime();
			const diffHours = Math.round(diffMs / 3600000);

			insights.push({
				title: 'Next Workflow',
				desc: diffHours > 24 ? `In ${Math.round(diffHours / 24)} days` : `In ${diffHours}h`,
				priority: 'medium'
			});
		}

		if (content.keywords.length > 0 && !content.keywordsLoading) {
			const avgSearches =
				content.keywords.reduce((sum: number, k: any) => sum + (k.monthly_searches || 0), 0) /
				content.keywords.length;

			if (avgSearches > 1000) {
				insights.push({
					title: 'High Volume Keywords',
					desc: `Avg ${Math.round(avgSearches).toLocaleString()} searches/mo`,
					priority: 'high'
				});
			}
		}

		if (workflow.config?.auto_publish?.enabled) {
			insights.push({
				title: 'Auto-Publish Active',
				desc: `${workflow.config.auto_publish.integrations.length} integrations`,
				priority: 'high'
			});
		}

		if (content.blogPosts.length > 0) {
			insights.push({
				title: 'Content Ready',
				desc: `${content.blogPosts.length} posts to publish`,
				priority: 'high'
			});
		}

		// Fallback to agent insights
		if (insights.length === 0 && $currentProjectAgents[0]?.insights) {
			return $currentProjectAgents[0].insights.slice(0, 3);
		}

		return insights.slice(0, 3);
	}

	// Agents Data - Reactive with store data
	$: agents = {
		seo: {
			name: 'Nai',
			short: 'SEO',
			desc: 'Keyword research & content outlines',
			status:
				$workflowStore.status === 'running'
					? 'active'
					: $workflowStore.status === 'pending'
						? 'monitoring'
						: $workflowStore.isActive
							? 'monitoring'
							: 'idle',
			lastScan: $workflowStore.lastRun
				? formatRelativeTime($workflowStore.lastRun)
				: formatRelativeTime($currentProjectAgents[0]?.last_scan || new Date().toISOString()),
			metrics: [
				{
					label: 'Keywords',
					value: $contentStore.keywordsLoading
						? '...'
						: $contentStore.keywords.length > 0
							? $contentStore.keywords.length
							: selectedKeywords.length,
					trend:
						$contentStore.keywords.length > selectedKeywords.length
							? `+${$contentStore.keywords.length - selectedKeywords.length}`
							: selectedKeywords.length > 0
								? '+12%'
								: '—'
				},
				{
					label: 'Outlines',
					value: $contentStore.outlinesLoading
						? '...'
						: $contentStore.outlines.length > 0
							? $contentStore.outlines.length
							: blogPostOutlines.length,
					trend:
						$contentStore.outlines.length > blogPostOutlines.length
							? `+${$contentStore.outlines.length - blogPostOutlines.length}`
							: blogPostOutlines.length > 0
								? '+3'
								: '—'
				},
				{
					label: 'Posts',
					value: $contentStore.postsLoading ? '...' : $contentStore.blogPosts.length,
					trend: $contentStore.blogPosts.length > 0 ? `+${$contentStore.blogPosts.length}` : '—'
				}
			],
			activity: buildNaiActivity($workflowStore, $contentStore),
			insights: buildNaiInsights($workflowStore, $contentStore),
			content: $contentStore.outlines.length > 0 ? $contentStore.outlines : blogPostOutlines
		},
		/* Rio (Twitter) Hidden
    twitter: {
      name: 'Rio',
      short: 'X',
      desc: 'Posts & engagement on X',
      status: 'active',
      lastScan: '3m ago',
      metrics: [
        { label: 'Posts', value: twitterPosts.length, trend: twitterPosts.length > 0 ? '+5' : '—' },
        { label: 'Engagement', value: '8.4%', trend: '+1.2%' }
      ],
      activity: [
        { type: 'trend', action: 'Trend detected', detail: '#AIRevolution', time: '5m ago' },
        { type: 'content', action: 'Thread generated', detail: 'AI trends', time: '45m ago' }
      ],
      insights: [{ title: 'Viral Potential', desc: 'AI hacks trending', priority: 'high' }],
      content: twitterPosts
    },
    */
		reddit: {
			name: 'Elio',
			short: 'Reddit',
			desc: 'Posts & community building',
			status: $elioStore.loading.project
				? 'loading'
				: $elioStore.config?.subreddits?.length > 0
					? 'active'
					: 'setup needed',
			lastScan: $elioStore.project?.last_scan
				? formatRelativeTime($elioStore.project.last_scan)
				: 'Never',
			metrics: [
				{
					label: 'Posts',
					value: $elioStore.loading.posts ? '...' : $elioStore.posts.length,
					trend: $elioStore.posts.length > 0 ? `+${$elioStore.posts.length}` : '—'
				},
				{
					label: 'Karma',
					value: $elioStore.profile?.total_karma || '0',
					trend: '—'
				}
			],
			activity:
				$elioStore.opportunities.length > 0
					? $elioStore.opportunities.slice(0, 4).map((opp) => ({
							type: 'opportunity',
							action: 'Opportunity found',
							detail: opp.title,
							time: formatRelativeTime(opp.created_utc)
						}))
					: [
							{
								type: 'info',
								action: 'No recent activity',
								detail: 'Start a scan to find opportunities',
								time: 'Now'
							}
						],
			insights:
				$elioStore.opportunities.length > 0
					? [
							{
								title: 'Opportunities Found',
								desc: `Found ${$elioStore.opportunities.length} potential discussions`,
								priority: 'high'
							}
						]
					: [
							{
								title: 'Get Started',
								desc: 'Connect Reddit and configure keywords',
								priority: 'medium'
							}
						],
			content: $elioStore.posts.length > 0 ? $elioStore.posts : []
		}
	};

	$: selectedAgent = agents[selectedAgentId];
	$: totalContent =
		($contentStore.outlines.length || blogPostOutlines.length) +
		twitterPosts.length +
		redditPosts.length;

	function handleSelectAgent(id) {
		selectedAgentId = id;
	}

	function generateAgentContent(id) {
		console.log(`Generate for ${id}`);
	}

	function handleGenerateAll() {
		console.log('Generate all content');
	}

	function handleSchedulePosts() {
		console.log('Schedule posts');
	}

	const projectId = $page.params.id;
	onMount(async () => {
		const projectId = $page.params.id;
		if (projectId) {
			workflowStore.reset();
			contentStore.reset();
			elioStore.reset();
			await Promise.all([
				workflowStore.loadWorkflow(projectId),
				contentStore.loadAll(projectId),
				workflowStore.loadIntegrations(projectId),
				elioStore.loadAll(projectId)
			]);
		}
	});

	onDestroy(() => {
		workflowStore.destroy();
		// elioStore doesn't have destroy currently, but good practice to reset if needed
	});
</script>

<div class="min-h-screen bg-zinc-50 text-zinc-900 font-sans antialiased">
	<main class="container mx-auto px-4 py-8">
		<!-- Main Dashboard Card -->
		<div
			class="bg-white rounded-[2rem] p-8 shadow-xl border border-zinc-200/20 relative overflow-hidden"
		>
			<!-- Premium Gradient Background -->
			<div
				class="absolute inset-0 bg-gradient-to-br from-zinc-50/50 to-transparent pointer-events-none"
			></div>

			<!-- Header -->
			<div class="relative z-10 mb-8">
				<h1 class="text-3xl font-semibold text-zinc-900 tracking-tight font-[Poppins]">
					Project Overview
				</h1>
				<p class="text-zinc-500 mt-1">Manage your AI agents and content generation.</p>
			</div>

			<!-- Agent Tabs & Content -->
			<div class="relative z-10">
				<AgentTabs {agents} {selectedAgentId} {agentStyles} onSelectAgent={handleSelectAgent} />

				<div class="mt-8">
					{#key selectedAgentId}
						<AgentCard
							agent={selectedAgent}
							agentId={selectedAgentId}
							{projectId}
							agentStyle={agentStyles[selectedAgentId]}
							onGenerate={generateAgentContent}
						/>
					{/key}
				</div>
			</div>
		</div>
	</main>
</div>

<style>
	:global(*) {
		transition: all 0.2s ease;
	}
</style>
