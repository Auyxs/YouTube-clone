<script>
  import TagSection from "$lib/components/TagSection.svelte";
  import VideoCard from "$lib/components/VideoCard.svelte";
  let {data} = $props();
</script>


<div class="container mt-5 px-2"> 

  <div class="d-flex justify-content-start mb-4">
      <TagSection />
  </div>

  <div class="row g-2"> 
    {#each data.videos as video}
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <VideoCard video={video} currentRoute="/channel" />
        </div>
    {/each}
  </div>

</div>

