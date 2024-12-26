<script>
  import TagSection from "$lib/components/TagSection.svelte";
  import VideoCard from "$lib/components/VideoCard.svelte";
  let {data} = $props();
</script>


<div class="container mt-5 px-2"> 
  <div class="mx-sm-2 mx-md-3 mx-lg-5 px-sm-0 px-md-2 px-lg-4">
      <div class="d-flex justify-content-start mb-4">
        <TagSection />
    </div>

    <div class="row g-2"> 
      {#each data.videos as video}
          <div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
              <VideoCard video={video} currentRoute="/channel" />
          </div>
      {/each}
    </div>
  </div>


</div>

