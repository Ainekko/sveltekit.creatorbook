<!-- src/lib/components/elio/ConfigView.svelte -->
<script>
	import { createEventDispatcher } from 'svelte';
	import { Save, CheckCircle, AlertCircle, Lightbulb } from 'lucide-svelte';

	export let config;
	export let saving = false;
	export let saveSuccess = false;
	export let saveError = null;

	const dispatch = createEventDispatcher();

	// Initialize empty arrays if not set
	$: if (config) {
		config.subreddits = config.subreddits || [];
		config.keywords = config.keywords || [];
		config.exclude_keywords = config.exclude_keywords || [];
		config.min_relevance = config.min_relevance || 65;
	}

	// Track if config has been modified
	let hasUnsavedChanges = false;
	$: if (config && !saving) {
		hasUnsavedChanges = true;
		saveSuccess = false;
	}
</script>

{#if config}
	<div class="max-w-4xl space-y-4 sm:space-y-6">
		<!-- Save Success Banner -->
		{#if saveSuccess}
			<div class="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
				<CheckCircle class="w-5 h-5 text-green-600" />
				<p class="text-sm text-green-800 font-medium">Configuration saved successfully!</p>
			</div>
		{/if}

		<!-- Save Error Banner -->
		{#if saveError}
			<div class="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
				<AlertCircle class="w-5 h-5 text-red-600" />
				<p class="text-sm text-red-800 font-medium">{saveError}</p>
			</div>
		{/if}

		<!-- Unsaved Changes Warning -->
		{#if hasUnsavedChanges && !saving && !saveSuccess}
			<div class="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
				<AlertCircle class="w-5 h-5 text-amber-600" />
				<p class="text-sm text-amber-800 font-medium">
					You have unsaved changes. Click "Save Configuration" to persist them.
				</p>
			</div>
		{/if}

		<!-- AI Optimization Notice -->
		<div
			class="bg-gradient-to-r from-zinc-50 to-white rounded-2xl p-6 border border-zinc-200 shadow-sm"
		>
			<div class="flex items-start gap-4">
				<div
					class="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center flex-shrink-0 shadow-lg shadow-zinc-900/20"
				>
					<Lightbulb class="w-5 h-5 text-white" />
				</div>
				<div class="flex-1">
					<h3 class="font-bold text-zinc-900 mb-1 text-lg">AI-Powered Optimization</h3>
					<p class="text-sm text-zinc-600 leading-relaxed">
						Leave fields empty and our AI will automatically find the best subreddits and keywords
						for your business. Or customize to target specific communities.
					</p>
					<p class="text-xs text-zinc-500 mt-3 font-medium flex items-center gap-1.5">
						<span class="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
						Remember to click "Save Configuration" to persist your changes
					</p>
				</div>
			</div>
		</div>

		<!-- Subreddits -->
		<div class="bg-white rounded-[2rem] p-8 border border-zinc-200/60 shadow-xl shadow-zinc-200/40">
			<h2 class="text-xl font-bold text-zinc-900 mb-2 tracking-tight">Target Subreddits</h2>
			<p class="text-sm text-zinc-500 mb-6">
				{#if config.subreddits.length === 0}
					<span class="text-zinc-400 font-medium">AI will find relevant subreddits for you</span>
				{:else}
					Monitoring <span class="text-zinc-900 font-semibold">{config.subreddits.length}</span>
					subreddit{config.subreddits.length !== 1 ? 's' : ''}
				{/if}
			</p>

			<div class="space-y-4">
				{#if config.subreddits.length > 0}
					<div class="flex flex-wrap gap-2">
						{#each config.subreddits as sub, idx}
							<span
								class="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-100 text-zinc-700 rounded-lg text-sm font-medium border border-zinc-200"
							>
								r/{sub}
								<button
									on:click={() => {
										config.subreddits = config.subreddits.filter((_, i) => i !== idx);
									}}
									class="text-zinc-400 hover:text-zinc-900 transition-colors"
								>
									×
								</button>
							</span>
						{/each}
					</div>
				{/if}

				<div class="flex gap-2">
					<input
						type="text"
						placeholder="Add subreddit (e.g., entrepreneur) - Optional"
						class="flex-1 px-4 py-3 bg-zinc-50 border-2 border-zinc-100 rounded-xl focus:outline-none focus:border-zinc-300 focus:bg-white transition-all text-sm text-zinc-900 placeholder:text-zinc-400"
						on:keypress={(e) => {
							if (e.key === 'Enter' && e.target.value.trim()) {
								const sub = e.target.value.trim().replace(/^r\//, '');
								if (!config.subreddits.includes(sub)) {
									config.subreddits = [...config.subreddits, sub];
								}
								e.target.value = '';
							}
						}}
					/>
				</div>
			</div>
		</div>

		<!-- Keywords -->
		<div class="bg-white rounded-[2rem] p-8 border border-zinc-200/60 shadow-xl shadow-zinc-200/40">
			<h2 class="text-xl font-bold text-zinc-900 mb-2 tracking-tight">Target Keywords</h2>
			<p class="text-sm text-zinc-500 mb-6">
				{#if config.keywords.length === 0}
					<span class="text-zinc-400 font-medium"
						>AI will identify relevant keywords automatically</span
					>
				{:else}
					Tracking <span class="text-zinc-900 font-semibold">{config.keywords.length}</span>
					keyword{config.keywords.length !== 1 ? 's' : ''}
				{/if}
			</p>

			<div class="space-y-4">
				{#if config.keywords.length > 0}
					<div class="flex flex-wrap gap-2">
						{#each config.keywords as kw, idx}
							<span
								class="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-100 text-zinc-700 rounded-lg text-sm font-medium border border-zinc-200"
							>
								{kw}
								<button
									on:click={() => {
										config.keywords = config.keywords.filter((_, i) => i !== idx);
									}}
									class="text-zinc-400 hover:text-zinc-900 transition-colors"
								>
									×
								</button>
							</span>
						{/each}
					</div>
				{/if}

				<div class="flex gap-2">
					<input
						type="text"
						placeholder="Add keyword - Optional"
						class="flex-1 px-4 py-3 bg-zinc-50 border-2 border-zinc-100 rounded-xl focus:outline-none focus:border-zinc-300 focus:bg-white transition-all text-sm text-zinc-900 placeholder:text-zinc-400"
						on:keypress={(e) => {
							if (e.key === 'Enter' && e.target.value.trim()) {
								const kw = e.target.value.trim();
								if (!config.keywords.includes(kw)) {
									config.keywords = [...config.keywords, kw];
								}
								e.target.value = '';
							}
						}}
					/>
				</div>
			</div>
		</div>

		<!-- Exclude Keywords -->
		<div class="bg-white rounded-[2rem] p-8 border border-zinc-200/60 shadow-xl shadow-zinc-200/40">
			<h2 class="text-xl font-bold text-zinc-900 mb-2 tracking-tight">Exclude Keywords</h2>
			<p class="text-sm text-zinc-500 mb-6">
				{#if config.exclude_keywords.length === 0}
					No exclusions set - AI will filter spam automatically
				{:else}
					Excluding <span class="text-zinc-900 font-semibold">{config.exclude_keywords.length}</span
					>
					keyword{config.exclude_keywords.length !== 1 ? 's' : ''}
				{/if}
			</p>

			<div class="space-y-4">
				{#if config.exclude_keywords.length > 0}
					<div class="flex flex-wrap gap-2">
						{#each config.exclude_keywords as kw, idx}
							<span
								class="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-900 text-white rounded-lg text-sm font-medium shadow-md shadow-zinc-900/10"
							>
								{kw}
								<button
									on:click={() => {
										config.exclude_keywords = config.exclude_keywords.filter((_, i) => i !== idx);
									}}
									class="text-zinc-400 hover:text-white transition-colors"
								>
									×
								</button>
							</span>
						{/each}
					</div>
				{/if}

				<div class="flex gap-2">
					<input
						type="text"
						placeholder="Add keyword to exclude - Optional"
						class="flex-1 px-4 py-3 bg-zinc-50 border-2 border-zinc-100 rounded-xl focus:outline-none focus:border-zinc-300 focus:bg-white transition-all text-sm text-zinc-900 placeholder:text-zinc-400"
						on:keypress={(e) => {
							if (e.key === 'Enter' && e.target.value.trim()) {
								const kw = e.target.value.trim();
								if (!config.exclude_keywords.includes(kw)) {
									config.exclude_keywords = [...config.exclude_keywords, kw];
								}
								e.target.value = '';
							}
						}}
					/>
				</div>
			</div>
		</div>

		<!-- Relevance Threshold -->
		<div class="bg-white rounded-[2rem] p-8 border border-zinc-200/60 shadow-xl shadow-zinc-200/40">
			<h2 class="text-xl font-bold text-zinc-900 mb-2 tracking-tight">Minimum Relevance Score</h2>
			<p class="text-sm text-zinc-500 mb-6">
				Only show opportunities with at least this relevance score
			</p>

			<div class="space-y-6">
				<div class="flex items-center gap-6">
					<input
						type="range"
						bind:value={config.min_relevance}
						min="50"
						max="95"
						step="5"
						class="flex-1 accent-zinc-900"
					/>
					<span class="text-2xl font-bold text-zinc-900 min-w-[60px] text-right">
						{config.min_relevance}%
					</span>
				</div>

				<div
					class="text-sm text-zinc-600 font-medium bg-zinc-50 p-4 rounded-xl border border-zinc-100"
				>
					{#if config.min_relevance >= 85}
						Very high - Only the most relevant opportunities
					{:else if config.min_relevance >= 70}
						Recommended - Good balance of quality and quantity
					{:else}
						Lower threshold - More opportunities, may need filtering
					{/if}
				</div>
			</div>
		</div>

		<!-- Save Button -->
		<div class="sticky bottom-4 flex justify-end">
			<button
				on:click={() => {
					hasUnsavedChanges = false;
					dispatch('saveConfig');
				}}
				disabled={saving}
				class="w-full sm:w-auto px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl transition-all duration-300 font-medium shadow-lg shadow-zinc-900/20 hover:shadow-zinc-900/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 tracking-wide"
			>
				{#if saving}
					<div
						class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"
					></div>
					Saving...
				{:else if saveSuccess}
					<CheckCircle class="w-4 h-4" />
					Saved!
				{:else}
					<Save class="w-4 h-4" />
					Save Configuration
				{/if}
			</button>
		</div>
	</div>
{/if}

<style>
	/* Custom range slider styling */
	input[type='range'] {
		-webkit-appearance: none;
		appearance: none;
		height: 8px;
		border-radius: 4px;
		background: linear-gradient(to right, #18181b 0%, #52525b 100%);
		outline: none;
	}

	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background: white;
		border: 4px solid #18181b;
		cursor: pointer;
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -1px rgba(0, 0, 0, 0.06);
		transition: all 0.2s ease;
	}

	input[type='range']::-webkit-slider-thumb:hover {
		transform: scale(1.1);
		box-shadow:
			0 10px 15px -3px rgba(0, 0, 0, 0.1),
			0 4px 6px -2px rgba(0, 0, 0, 0.05);
	}

	input[type='range']::-moz-range-thumb {
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background: white;
		border: 4px solid #18181b;
		cursor: pointer;
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -1px rgba(0, 0, 0, 0.06);
		transition: all 0.2s ease;
	}

	input[type='range']::-moz-range-thumb:hover {
		transform: scale(1.1);
		box-shadow:
			0 10px 15px -3px rgba(0, 0, 0, 0.1),
			0 4px 6px -2px rgba(0, 0, 0, 0.05);
	}
</style>
