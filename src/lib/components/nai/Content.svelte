<!-- src/lib/components/nai/content.svelte -->

<script lang="ts">
	import {
		RefreshCw,
		FileText,
		Calendar,
		Clock,
		Save,
		X,
		ChevronRight,
		ChevronDown
	} from 'lucide-svelte';
	import { marked } from 'marked';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { contentStore } from '$lib/components/nai/stores';
	import type { BlogPost, PostStatus } from '$lib/components/nai/types';
	import type { UUID } from 'crypto';
	import { API_BASE_URL } from '$lib/config';

	export let projectId: UUID;

	let editorInstance: any = null;
	let editorContainer: HTMLElement;

	// Get project ID from page params if not provided
	$: effectiveProjectId = projectId || $page.params.id;

	$: posts = $contentStore.blogPosts as BlogPost[];
	$: isLoading = $contentStore.postsLoading;

	const authToken = localStorage.getItem('token');
	const apiBaseUrl = API_BASE_URL;

	let selectedStatus: PostStatus | 'all' = 'all';
	let selectedPost: BlogPost | null = null;
	let editContent: string = '';
	let isSaving: boolean = false;
	let isEditing: boolean = false;
	let showPublishMenu: boolean = false;

	interface StatusOption {
		value: PostStatus | 'all';
		label: string;
	}

	const statusOptions: StatusOption[] = [
		{ value: 'all', label: 'All' },
		{ value: 'draft', label: 'Drafts' },
		{ value: 'published', label: 'Published' },
		{ value: 'scheduled', label: 'Scheduled' }
	];

	$: filteredPosts =
		selectedStatus === 'all'
			? posts
			: posts.filter((p) => p.status === (selectedStatus as PostStatus));

	async function refreshPosts(): Promise<void> {
		await contentStore.loadBlogPosts(projectId);
	}

	async function publishPost(): Promise<void> {
		if (!selectedPost) return;
		try {
			const response = await fetch(
				`${apiBaseUrl}/orion/api/blog-posts/${selectedPost.id}/publish/`,
				{
					method: 'POST',
					headers: {
						Authorization: `Token ${authToken}`,
						'Content-Type': 'application/json'
					}
				}
			);
			if (response.ok) {
				await refreshPosts();
				showPublishMenu = false;
				closeDrawer();
			}
		} catch (error) {
			console.error('Error publishing post:', error);
		}
	}

	let isPublishing: boolean = false;

	async function publishToWordPress(): Promise<void> {
		if (!selectedPost) return;

		isPublishing = true;
		try {
			const response = await fetch(
				`${apiBaseUrl}/orion/api/blog-posts/${selectedPost.id}/publish_to_wordpress/`,
				{
					method: 'POST',
					headers: {
						Authorization: `Token ${authToken}`,
						'Content-Type': 'application/json'
					}
				}
			);

			if (response.ok) {
				const data = await response.json();
				alert(`✓ Published! View it here: ${data.wp_url}`);
				await refreshPosts();
				showPublishMenu = false;
				closeDrawer();
			} else {
				const error = await response.json();
				alert(`Error: ${error.detail || 'Failed to publish'}`);
			}
		} catch (error) {
			console.error('Error publishing to WordPress:', error);
			alert('Error publishing to WordPress');
		} finally {
			isPublishing = false;
		}
	}

	async function convertToTweets(): Promise<void> {
		if (!selectedPost) return;
		// Navigate to Rio (Twitter agent)
		await goto(`/projects/${effectiveProjectId}/rio`);
	}

	async function convertToReddit(): Promise<void> {
		if (!selectedPost) return;
		// Navigate to Elio (Reddit agent)
		await goto(`/projects/${effectiveProjectId}/elio`);
	}

	async function saveContent(): Promise<void> {
		// Get content from editor if it exists, otherwise use editContent
		const contentToSave = editorInstance ? editorInstance.value() : editContent;

		if (!contentToSave.trim()) {
			alert('Content cannot be empty');
			return;
		}
		if (!selectedPost) return;

		isSaving = true;
		try {
			const response = await fetch(`${apiBaseUrl}/orion/api/blog-posts/${selectedPost.id}/`, {
				method: 'PATCH',
				headers: {
					Authorization: `Token ${authToken}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ content: contentToSave })
			});

			if (response.ok) {
				const updatedPost = await response.json();
				// Update the selected post with new content
				selectedPost.content = updatedPost.content;
				await refreshPosts();

				// Clean up editor and exit edit mode
				if (editorInstance) {
					editorInstance.toTextArea();
					editorInstance = null;
				}
				isEditing = false;
			} else {
				const error = await response.json();
				alert(`Error: ${error.detail || 'Failed to save'}`);
			}
		} catch (error) {
			console.error('Error saving:', error);
			alert('Error saving post');
		} finally {
			isSaving = false;
		}
	}

	function openPost(post: BlogPost): void {
		selectedPost = post;
		editContent = post.content || '';
		isEditing = false;
		showPublishMenu = false;
	}

	function closeDrawer(): void {
		selectedPost = null;
		editContent = '';
		isEditing = false;
		showPublishMenu = false;
		if (editorInstance) {
			editorInstance.toTextArea();
			editorInstance = null;
		}
	}

	function cancelEdit(): void {
		if (editorInstance) {
			editorInstance.toTextArea();
			editorInstance = null;
		}
		isEditing = false;
		editContent = selectedPost?.content || '';
	}

	async function initEditor(): Promise<void> {
		if (!editorContainer || editorInstance) return;

		// Dynamically import EasyMDE
		const EasyMDE = (await import('easymde')).default;

		editorInstance = new EasyMDE({
			element: editorContainer,
			initialValue: editContent,
			spellChecker: false,
			autofocus: true,
			placeholder: 'Write your blog post in markdown...',
			toolbar: [
				'bold',
				'italic',
				'heading',
				'|',
				'quote',
				'unordered-list',
				'ordered-list',
				'|',
				'link',
				'image',
				'|',
				'preview',
				'side-by-side',
				'fullscreen',
				'|',
				'guide'
			],
			status: ['lines', 'words', 'cursor'],
			renderingConfig: {
				singleLineBreaks: false,
				codeSyntaxHighlighting: true
			}
		});

		editorInstance.codemirror.on('change', () => {
			editContent = editorInstance.value();
		});
	}

	$: if (isEditing && editorContainer && !editorInstance) {
		initEditor();
	}

	$: if (!isEditing && editorInstance) {
		editorInstance.toTextArea();
		editorInstance = null;
	}

	function getStatusColor(status: PostStatus): string {
		const colors: Record<PostStatus, string> = {
			draft: 'bg-zinc-200 text-zinc-800',
			published: 'bg-zinc-700 text-zinc-100',
			scheduled: 'bg-zinc-400 text-zinc-900'
		};
		return colors[status] || colors.draft;
	}

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}

	function getSnippet(text: string, length: number = 90): string {
		return text.substring(0, length) + (text.length > length ? '...' : '');
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/easymde/dist/easymde.min.css" />
</svelte:head>

<div class="space-y-6">
	<!-- Header -->
	<div class="flex justify-between items-center">
		<div>
			<h2 class="text-2xl font-bold text-zinc-900 tracking-tight">Blog Posts</h2>
			<p class="text-sm text-zinc-500 mt-1">
				{filteredPosts.length}
				{selectedStatus !== 'all' ? selectedStatus : ''}
				{filteredPosts.length === 1 ? 'post' : 'posts'}
			</p>
		</div>

		<div class="flex items-center gap-3">
			<select
				bind:value={selectedStatus}
				class="px-3 py-2 rounded-lg bg-white border border-zinc-200 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 transition-all"
			>
				{#each statusOptions as opt}
					<option value={opt.value}>{opt.label}</option>
				{/each}
			</select>

			<button
				on:click={refreshPosts}
				disabled={isLoading}
				class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-medium transition-all duration-300 shadow-lg shadow-zinc-900/20 hover:shadow-zinc-900/30 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide"
			>
				<RefreshCw class={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
				<span>{isLoading ? 'Loading' : 'Refresh'}</span>
			</button>
		</div>
	</div>

	<!-- Posts Grid -->
	{#if filteredPosts.length === 0}
		<div
			class="bg-white rounded-[2rem] border border-zinc-200/60 p-12 text-center shadow-xl shadow-zinc-200/40"
		>
			<div class="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-6">
				<FileText class="w-8 h-8 text-zinc-400" />
			</div>
			<h3 class="text-xl font-bold text-zinc-900 mb-2">No Posts Yet</h3>
			<p class="text-zinc-500 mb-6 max-w-md mx-auto">Generate blog posts to get started</p>
		</div>
	{:else}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each filteredPosts as post (post.id)}
				<button
					on:click={() => openPost(post)}
					class="text-left bg-white rounded-[2rem] border border-zinc-200/60 p-8 shadow-xl shadow-zinc-200/40 hover:shadow-2xl hover:shadow-zinc-200/60 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
				>
					<div
						class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-zinc-100/80 to-transparent rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"
					></div>
					<div class="flex items-start justify-between mb-4">
						<span
							class={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}
						>
							{post.status}
						</span>
						<ChevronRight
							class="w-4 h-4 text-zinc-400 group-hover:text-zinc-600 transition-colors"
						/>
					</div>

					<h3 class="text-lg font-semibold text-zinc-900 mb-2 line-clamp-2">
						{post.title}
					</h3>

					<p class="text-sm text-zinc-600 mb-4 line-clamp-2">
						{getSnippet(post.content)}
					</p>

					<div class="flex items-center gap-4 text-xs text-zinc-500">
						<div class="flex items-center gap-1">
							<Calendar class="w-3.5 h-3.5" />
							{formatDate(post.created_at)}
						</div>
						{#if post.scheduled_time}
							<div class="flex items-center gap-1">
								<Clock class="w-3.5 h-3.5" />
								{formatDate(post.scheduled_time)}
							</div>
						{/if}
					</div>
				</button>
			{/each}
		</div>
	{/if}
</div>

<!-- Drawer Modal -->
{#if selectedPost}
	<div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" on:click={closeDrawer}>
		<div
			class="fixed right-0 top-0 bottom-0 w-full max-w-5xl bg-white shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-right"
			on:click|stopPropagation
		>
			<!-- Header -->
			<div class="flex items-start justify-between p-6 border-b border-zinc-200 bg-zinc-50">
				<div class="flex-1">
					<span
						class={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium mb-3 ${getStatusColor(selectedPost.status)}`}
					>
						{selectedPost.status}
					</span>
					<h2 class="text-2xl font-semibold text-zinc-900">
						{selectedPost.title}
					</h2>
				</div>
				<button on:click={closeDrawer} class="p-2 hover:bg-zinc-200 rounded-lg transition-colors">
					<X class="w-5 h-5 text-zinc-600" />
				</button>
			</div>

			<!-- Content -->
			<div class="flex-1 overflow-y-auto p-8">
				{#if isEditing}
					<div class="markdown-editor-wrapper">
						<textarea bind:this={editorContainer}></textarea>
					</div>
				{:else}
					<div class="prose prose-zinc max-w-none">
						{@html marked(selectedPost.content || '')}
					</div>
				{/if}
			</div>

			<!-- Footer -->
			<div class="border-t border-zinc-200 p-6 bg-zinc-50 flex items-center gap-3">
				{#if isEditing}
					<button
						on:click={saveContent}
						disabled={isSaving}
						class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-medium transition-all duration-300 shadow-lg shadow-zinc-900/20 hover:shadow-zinc-900/30 disabled:opacity-50 active:scale-95 tracking-wide"
					>
						<Save class="w-4 h-4" />
						<span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
					</button>
					<button
						on:click={cancelEdit}
						class="px-4 py-2.5 rounded-lg bg-zinc-200 hover:bg-zinc-300 text-zinc-700 text-sm font-medium transition-all active:scale-95"
					>
						Cancel
					</button>
				{:else}
					<button
						on:click={() => {
							isEditing = true;
						}}
						class="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-medium transition-all duration-300 shadow-lg shadow-zinc-900/20 hover:shadow-zinc-900/30 active:scale-95 tracking-wide"
					>
						Edit
					</button>

					{#if selectedPost.status === 'draft'}
						<div class="relative">
							<button
								on:click={() => (showPublishMenu = !showPublishMenu)}
								class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium transition-all duration-300 shadow-lg shadow-zinc-900/20 hover:shadow-zinc-900/30 active:scale-95 tracking-wide"
							>
								Publish
								<ChevronDown class="w-4 h-4" />
							</button>

							{#if showPublishMenu}
								<div
									class="absolute bottom-full mb-2 left-0 w-56 bg-white rounded-lg shadow-xl border border-zinc-200 py-1 z-10"
								>
									<button
										on:click={publishPost}
										class="w-full text-left px-4 py-2.5 hover:bg-zinc-50 text-sm text-zinc-700 font-medium transition-colors"
									>
										Publish to API
									</button>
									<button
										on:click={publishToWordPress}
										disabled={isPublishing}
										class="w-full text-left px-4 py-2.5 hover:bg-zinc-50 text-sm text-zinc-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
									>
										{#if isPublishing}
											Publishing to WordPress...
										{:else}
											Publish to WordPress
										{/if}
									</button>
								</div>
							{/if}
						</div>
					{:else if selectedPost.published_to_wp}
						<a
							href={selectedPost.wp_url}
							target="_blank"
							rel="noopener noreferrer"
							class="px-5 py-2.5 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-white text-sm font-medium transition-all"
						>
							View on WordPress →
						</a>
					{/if}

					<!-- Rio Button Hidden
					<button
						on:click={convertToTweets}
						class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-all duration-300 shadow-lg shadow-blue-900/20 hover:shadow-blue-900/30 active:scale-95 tracking-wide"
					>
						→ X Tweets
					</button>
					-->

					<!-- Reddit Button Hidden
					<button
						on:click={convertToReddit}
						class="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium transition-all duration-300 shadow-lg shadow-orange-900/20 hover:shadow-orange-900/30 active:scale-95 tracking-wide"
					>
						→ Reddit Post
					</button>
					-->

					<button
						on:click={closeDrawer}
						class="ml-auto px-5 py-2.5 rounded-lg bg-zinc-200 hover:bg-zinc-300 text-zinc-700 text-sm font-medium transition-all active:scale-95"
					>
						Close
					</button>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	:global(.animate-in.slide-in-from-right) {
		animation: slideInRight 0.3s ease-out;
	}

	@keyframes slideInRight {
		from {
			transform: translateX(100%);
		}
		to {
			transform: translateX(0);
		}
	}

	.markdown-editor-wrapper {
		min-height: 600px;
	}

	:global(.markdown-editor-wrapper .EasyMDEContainer) {
		min-height: 600px;
	}

	:global(.markdown-editor-wrapper .CodeMirror) {
		min-height: 600px;
		border: 1px solid #d4d4d8;
		border-radius: 0.5rem;
		font-size: 14px;
	}

	:global(.markdown-editor-wrapper .editor-toolbar) {
		border: 1px solid #d4d4d8;
		border-bottom: none;
		border-radius: 0.5rem 0.5rem 0 0;
		background: #fafafa;
	}

	:global(.markdown-editor-wrapper .editor-toolbar button) {
		color: #3f3f46 !important;
	}

	:global(.markdown-editor-wrapper .editor-toolbar button:hover),
	:global(.markdown-editor-wrapper .editor-toolbar button.active) {
		background: #e4e4e7;
		border-color: #a1a1aa;
	}

	:global(.prose p) {
		margin: 0.75em 0;
		color: #52525b;
		font-weight: 400;
	}

	:global(.prose h1),
	:global(.prose h2),
	:global(.prose h3),
	:global(.prose h4),
	:global(.prose h5),
	:global(.prose h6) {
		font-weight: 600;
		margin: 1em 0 0.5em 0;
		line-height: 1.3;
		color: #18181b;
	}

	:global(.prose h1) {
		font-size: 1.5em;
	}
	:global(.prose h2) {
		font-size: 1.25em;
	}
	:global(.prose h3) {
		font-size: 1.1em;
	}

	:global(.prose code) {
		background: #f4f4f5;
		padding: 0.2em 0.4em;
		border-radius: 0.25em;
		font-size: 0.9em;
		color: #18181b;
	}

	:global(.prose pre) {
		background: #27272a;
		color: #fafafa;
		padding: 1em;
		border-radius: 0.5em;
		overflow-x: auto;
		margin: 1em 0;
	}

	:global(.prose ul),
	:global(.prose ol) {
		margin: 1em 0;
		padding-left: 2em;
	}

	:global(.prose li) {
		margin: 0.5em 0;
	}

	:global(.prose blockquote) {
		border-left: 4px solid #71717a;
		padding-left: 1em;
		margin: 1em 0;
		color: #71717a;
		font-style: italic;
	}

	:global(.prose a) {
		color: #3f3f46;
		text-decoration: underline;
	}

	:global(.prose a:hover) {
		color: #18181b;
	}
</style>
