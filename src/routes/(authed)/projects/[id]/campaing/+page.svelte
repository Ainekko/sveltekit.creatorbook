<script>
	// In a real SvelteKit app, this data would be passed down from your `+page.server.ts` load function.
	// For this mockup, we'll define it directly here.
	const mockCampaign = {
		id: 'camp_12345',
		name: 'NexusAI v2.0 Product Hunt Launch',
		campaignType: 'PRODUCT_HUNT_LAUNCH',
		assets: [
			{
				id: 'asset_01',
				type: 'PH_TAGLINE',
				content: 'NexusAI: The AI-powered co-pilot for your entire marketing strategy.',
				channel: 'Product Hunt',
				phase: 'Launch Day'
			},
			{
				id: 'asset_02',
				type: 'PH_COMMENT',
				content:
					"Hey Hunters! 👋 So excited to finally share NexusAI v2.0 with you all. We've been working tirelessly to build an agent that doesn't just give you data, but provides a clear, actionable marketing strategy. Ask me anything!",
				channel: 'Product Hunt',
				phase: 'Launch Day'
			},
			{
				id: 'asset_03',
				type: 'TWEET',
				content:
					"🚀 BIG NEWS! We're officially launching NexusAI v2.0 on Product Hunt today! It's an AI marketing strategist that goes from analysis to content in minutes. We'd love your support! ❤️ #producthunt #ai #saas #marketing",
				channel: 'Twitter',
				phase: 'Launch Day'
			},
			{
				id: 'asset_04',
				type: 'TWEET',
				content:
					"The countdown begins! ⏰ NexusAI v2.0 is launching on Product Hunt in 24 hours. Get ready to supercharge your marketing workflow. #buildinpublic #saaslaunch",
				channel: 'Twitter',
				phase: 'Pre-Launch'
			},
			{
				id: 'asset_05',
				type: 'EMAIL_DRAFT',
				content:
					'Subject: It’s Here! NexusAI v2.0 is LIVE on Product Hunt\n\nHi [Name],\n\nThe day has finally come. NexusAI v2.0 is live on Product Hunt, and we need your help to make this launch a success...',
				channel: 'Email',
				phase: 'Launch Day'
			},
			{
				id: 'asset_06',
				type: 'LINKEDIN_POST',
				content:
					"I'm incredibly proud to announce that my team and I are launching NexusAI v2.0 on Product Hunt today. Our goal was to create a tool that genuinely saves marketers time and provides strategic insights, not just data points. Check it out and let us know what you think! #marketingautomation #ai #productlaunch",
				channel: 'LinkedIn',
				phase: 'Launch Day'
			},
			{
				id: 'asset_07',
				type: 'TWEET',
				content:
					'Wow! What a day. HUGE thank you to everyone who supported our NexusAI v2.0 launch. Your feedback and encouragement mean the world to us. 🙏 #producthunt #grateful',
				channel: 'Twitter',
				phase: 'Post-Launch'
			},
            {
				id: 'asset_08',
				type: 'TWEET',
				content:
					"Sneak peek 👀... something big is coming next week. #AI #Marketing",
				channel: 'Twitter',
				phase: 'Pre-Launch'
			}
		]
	};

	// State to manage the current view
	let currentView = 'kanban'; // 'kanban' or 'channels'

	// Svelte's reactive declaration (`$:`) automatically re-runs this code whenever its dependencies change.
	// Here, we group assets by their phase for the Kanban view.
	$: groupedByPhase = mockCampaign.assets.reduce((acc, asset) => {
		const phase = asset.phase || 'Uncategorized';
		if (!acc[phase]) {
			acc[phase] = [];
		}
		acc[phase].push(asset);
		return acc;
	}, {});
    
    // We define the order of the phases for consistent display
    const phaseOrder = ['Pre-Launch', 'Launch Day', 'Post-Launch', 'Uncategorized'];


	// And here, we group assets by their channel for the Channel view.
	$: groupedByChannel = mockCampaign.assets.reduce((acc, asset) => {
		const channel = asset.channel || 'General';
		if (!acc[channel]) {
			acc[channel] = [];
		}
		acc[channel].push(asset);
		return acc;
	}, {});

    // Helper to get an icon for each channel
    const getChannelIcon = (channel) => {
        const icons = {
            'Product Hunt': '🚀',
            'Twitter': '🐦',
            'Email': '✉️',
            'LinkedIn': '💼'
        };
        return icons[channel] || '📄';
    }
</script>

<div class="campaign-dashboard">
	<header>
		<h1>{mockCampaign.name}</h1>
		<div class="view-switcher">
			<button class:active={currentView === 'kanban'} on:click={() => (currentView = 'kanban')}>
				🗓️ Timeline View
			</button>
			<button class:active={currentView === 'channels'} on:click={() => (currentView = 'channels')}>
				📺 Channel View
			</button>
		</div>
	</header>

	<main class="content-grid">
		{#if currentView === 'kanban'}
            {#each phaseOrder as phase}
                {#if groupedByPhase[phase]}
                    <div class="grid-column">
                        <h2>{phase}</h2>
                        <div class="assets-container">
                            {#each groupedByPhase[phase] as asset (asset.id)}
                                <div class="asset-card">
                                    <div class="card-header">
                                        <span class="icon">{getChannelIcon(asset.channel)}</span>
                                        <strong>{asset.channel}</strong>
                                    </div>
                                    <p class="card-content">{asset.content}</p>
                                    <div class="card-actions">
                                        <button class="action-btn">Copy</button>
                                        <button class="action-btn">Variations</button>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>
                {/if}
			{/each}
		{/if}

		{#if currentView === 'channels'}
            {#each Object.entries(groupedByChannel) as [channel, assets] (channel)}
				<div class="grid-column">
					<h2>{getChannelIcon(channel)} {channel}</h2>
					<div class="assets-container">
						{#each assets as asset (asset.id)}
							<div class="asset-card">
								<div class="card-header">
                                    <span class="icon">Phase:</span>
									<strong>{asset.phase}</strong>
								</div>
								<p class="card-content">{asset.content}</p>
								<div class="card-actions">
									<button class="action-btn">Copy</button>
									<button class="action-btn">Variations</button>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		{/if}
	</main>
</div>

<style>
	:root {
		--bg-color: #f8f9fa;
		--card-bg: #ffffff;
		--text-color: #212529;
		--primary-color: #007bff;
		--border-color: #dee2e6;
        --shadow-color: rgba(0, 0, 0, 0.05);
	}

	.campaign-dashboard {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
		background-color: var(--bg-color);
		min-height: 100vh;
		padding: 2rem;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid var(--border-color);
	}

	h1 {
		color: var(--text-color);
        font-size: 1.75rem;
	}

	.view-switcher button {
		background: none;
		border: 1px solid var(--border-color);
		padding: 0.5rem 1rem;
		border-radius: 6px;
		margin-left: 0.5rem;
		cursor: pointer;
		transition: background-color 0.2s, color 0.2s;
	}

	.view-switcher button.active {
		background-color: var(--primary-color);
		color: white;
		border-color: var(--primary-color);
	}

	.content-grid {
		display: flex;
		gap: 1.5rem;
        overflow-x: auto;
        padding-bottom: 1rem;
	}

	.grid-column {
		background-color: #e9ecef;
        border-radius: 8px;
        min-width: 320px;
        max-width: 320px;
        height: fit-content;
	}
    
    .grid-column h2 {
        font-size: 1rem;
        padding: 1rem;
        margin: 0;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: #495057;
    }

	.assets-container {
		padding: 0 0.5rem 0.5rem 0.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
	}

	.asset-card {
		background-color: var(--card-bg);
		border-radius: 6px;
		padding: 1rem;
		border: 1px solid var(--border-color);
        box-shadow: 0 2px 4px var(--shadow-color);
	}

    .card-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.75rem;
        font-size: 0.9rem;
        color: #6c757d;
    }

    .card-header .icon {
        font-size: 1.2rem;
    }

	.card-content {
		color: var(--text-color);
        line-height: 1.5;
        white-space: pre-wrap; /* This preserves line breaks in the content */
	}

    .card-actions {
        margin-top: 1rem;
        display: flex;
        gap: 0.5rem;
    }

    .action-btn {
        background-color: #f1f3f5;
        border: 1px solid #ced4da;
        color: #495057;
        font-size: 0.8rem;
        padding: 0.25rem 0.75rem;
        border-radius: 4px;
        cursor: pointer;
    }

    .action-btn:hover {
        background-color: #e9ecef;
    }
</style>