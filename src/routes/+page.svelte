<script>
    import TagSection from '$lib/components/TagSection.svelte';
    import VideoCard from '$lib/components/VideoCard.svelte';
    import Sidebar from '$lib/components/Sidebar.svelte';
  
    let {data} = $props();
</script>
  
<Sidebar />  
<div class="content-area p-4 m-5 mt-0">
    <div class="d-flex justify-content-start mb-4">
        <TagSection />
    </div>
<div class="row">
    {#each data.videos as video}
    <div class="col-12 col-sm-12 col-md-6 col-xl-4 col-xxl-4 mb-4">
        <VideoCard video={video} currentRoute="/" />
    </div>
    {/each}
</div>
</div>