<script>
  import HorizontalVideoCard from "../HorizontalVideoCard.svelte";
  import TagSection from "../TagSection.svelte";

  let { videos } = $props();
</script>

<div class="d-md-block">
  <div class="m-3 ms-0">
    <TagSection />
  </div>

  {#each videos as video}
    <HorizontalVideoCard {video} />
  {/each}
</div>
