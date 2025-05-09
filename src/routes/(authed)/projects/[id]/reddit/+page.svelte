<script>
	import Redditposts from '$lib/components/redditposts.svelte';
	import SocialContent from '$lib/components/SocialContent.svelte';

   export let data;

   let redditPosts = data.project.latest_run.result.analysis_data.create_content_plan.content_plan.socials.reddit_posts;
   let socialData = data.project.latest_run.result.analysis_data.create_content_plan.content_plan.socials;
</script>



<!-- <div class="w-full border border-zinc-900 rounded-xl shadow-lg overflow-hidden">
    <Redditposts 
      redditPosts={redditPosts} 
    />
</div> -->

<div>
  <SocialContent {socialData} />
</div>