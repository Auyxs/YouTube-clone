<script>
    import TagSection from '$lib/components/TagSection.svelte';
    import VideoCard from '$lib/components/VideoCard.svelte';
    import Sidebar from '$lib/components/Sidebar.svelte';
  
    let {data} = $props();
</script>
  
<div class="pt-5">
    <div>
        <div class="d-flex justify-content-start p-3 pb-2 w-100 bg-white position-fixed" style="z-index: 100;">
            <TagSection />
        </div>
    </div>

    <div class="content-area p-3 mt-5" >
        <div class="row">
            {#each data.videos as video}
            <div class="col-12 col-sm-12 col-md-6 col-xl-4 col-xxl-4 mb-4">
                <VideoCard video={video} currentRoute="/" />
            </div>
            {/each}
        </div>
    </div>

</div> 


