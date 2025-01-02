<script>
    import HorizontalVideoCard from "../HorizontalVideoCard.svelte";
    import TagSection from "../TagSection.svelte";

    let {videos} = $props();
</script>
<div class="col-lg-4 d-md-block ps-4">
    <h5>Suggested Videos</h5>
    <div class="m-3 ms-0">
      <TagSection />
    </div>

    {#each videos as video}
      <HorizontalVideoCard video={video}/>
    {/each}
    
  </div>