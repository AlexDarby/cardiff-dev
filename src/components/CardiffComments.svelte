<script lang="ts">
	import { BlueskyComments } from 'bsky-comments-svelte';

	let { uri }: { uri: string } = $props();

	const defaultAvatar =
		"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23999'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E";

	function handleImageError(e: Event) {
		const img = e.target as HTMLImageElement;
		img.src = defaultAvatar;
	}
</script>

{#snippet postStats({ post, url }: any)}
	<div class="stats">
		<span class="stat">[&gt;] {post.replyCount} {post.replyCount === 1 ? 'reply' : 'replies'}</span>
		<span class="stat">&lt;3 {post.likeCount} {post.likeCount === 1 ? 'like' : 'likes'}</span>
		<span class="stat">&lt;&gt; {post.repostCount} {post.repostCount === 1 ? 'repost' : 'reposts'}</span>
		<a href={url} target="_blank" rel="noreferrer" class="cta">[+ reply on bluesky]</a>
	</div>
{/snippet}

{#snippet postSnippet({ post, collapsed, setCollapsed }: any)}
	{@const text = post.record?.text ?? ''}
	<div
		class="post"
		class:collapsed
		role={collapsed ? 'button' : undefined}
		tabindex={collapsed ? 0 : undefined}
		onclick={() => collapsed && setCollapsed(false)}
		onkeydown={(e: KeyboardEvent) =>
			collapsed && (e.key === 'Enter' || e.key === ' ') && setCollapsed(false)}
	>
		<img
			class="avatar"
			src={post.author.avatar || defaultAvatar}
			alt={post.author.displayName}
			width="28"
			height="28"
			onerror={handleImageError}
		/>
		<div class="body">
			<a
				class="author"
				href="https://bsky.app/profile/{post.author.handle}"
				target="_blank"
				rel="noreferrer"
				onclick={(e: Event) => e.stopPropagation()}
			>
				{post.author.displayName}
				<span class="handle">@{post.author.handle}</span>
			</a>
			{#if collapsed}
				<span class="text-preview">{text}</span>
			{:else}
				<p class="text">{text}</p>
				<span class="mini-stats">
					[&gt;]&thinsp;{post.replyCount}&emsp;&lt;3&thinsp;{post.likeCount}&emsp;&lt;&gt;&thinsp;{post.repostCount}
				</span>
			{/if}
		</div>
	</div>
{/snippet}

<BlueskyComments {uri} PostStatsSnippet={postStats} PostSnippet={postSnippet} />

<style>
	/* ── Stats bar (top of thread) ───────────────────── */
	.stats {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1rem;
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--border);
		margin-bottom: 0.75rem;
		font-size: 0.8rem;
		color: var(--muted);
	}

	.cta {
		margin-left: auto;
		color: var(--accent);
		text-decoration: none;
		font-size: 0.8rem;
		transition: opacity 0.15s;
		white-space: nowrap;
	}
	.cta:hover {
		opacity: 0.65;
	}

	/* ── Individual post ─────────────────────────────── */
	.post {
		display: flex;
		gap: 0.625rem;
		padding: 0.625rem 0;
		border-bottom: 1px solid var(--border);
	}
	.post.collapsed {
		opacity: 0.45;
		cursor: pointer;
	}
	.post.collapsed:hover {
		opacity: 0.65;
	}

	.avatar {
		border-radius: 50%;
		object-fit: cover;
		flex-shrink: 0;
		margin-top: 2px;
	}

	.body {
		flex: 1;
		min-width: 0;
	}

	.author {
		display: block;
		font-size: 0.8rem;
		font-weight: 600;
		text-decoration: none;
		margin-bottom: 0.2rem;
		color: var(--fg);
	}
	.author:hover {
		text-decoration: underline;
	}

	.handle {
		font-weight: 400;
		color: var(--muted);
	}

	.text {
		font-size: 0.82rem;
		line-height: 1.55;
		margin: 0 0 0.35rem;
		color: var(--fg);
		word-break: break-word;
	}

	.text-preview {
		font-size: 0.82rem;
		color: var(--muted);
		font-style: italic;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		display: block;
		max-width: 100%;
	}

	.mini-stats {
		font-size: 0.73rem;
		color: var(--muted);
		letter-spacing: 0.01em;
	}
</style>
