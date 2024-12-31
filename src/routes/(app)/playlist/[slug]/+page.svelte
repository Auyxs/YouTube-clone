<script>
    import HorizontalVideoCard from '$lib/components/HorizontalVideoCard.svelte';
    import Sidebar from '$lib/components/Sidebar.svelte';
    import TagSection from '$lib/components/TagSection.svelte';
    let {data} = $props();
</script>


<div class="container d-flex py-5">
    <div class="container">
        <div class="bg-dark mt-3 position-fixed text-light" style="width: 350px; height: 85vh; top: 10vh;border-radius: 20px;">
            {#if data.videos.length != 0}
            <div class="p-4">
                    <a href="/video/{data.videos[0].id}" class="video-link">
                        <div class="position-relative" style="width: 100%; padding-bottom: 50%;">
                            <img src="https://img.youtube.com/vi/{data.videos[0].URL}/hqdefault.jpg" 
                                class="card-img-top rounded-3 position-absolute" alt=""
                                style="top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;" />
                            
                            <div class="video-overlay position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center text-white">
                                <span class="play-button fs-1">▶</span>
                            </div>
                        </div>
                    </a>
               
        
            <div class="mt-3">
                <h3>{data.playlistName}</h3>
                <div class="mt-4" >
                    <h6 style="font-size: 14px;">by {data.logged_user.username}</h6>
                    <p style="font-size: 12px;">playlist with {data.videos.length} videos</p>
                </div>
                <button class="btn btn-light btn-round px-5">▶ Play all</button>
            </div>
        </div>
        {/if}
        </div>

        <div style="margin-left: 360px;">
            {#if data.videos.length != 0}
                    <div class="d-flex justify-content-start py-5 ps-4 pb-2 w-100 bg-white position-fixed" style="z-index: 100;">
                        <TagSection tags={['Videos', 'Shorts']}/>
                    </div>
         
                    <div style="padding-top: 100px;">
                        {#each data.videos as video, index }
                            <div class="container d-flex align-items-center">
                                <h6 class="text-muted me-3">{index + 1}</h6>
                                <HorizontalVideoCard video={video}/>
                            </div>
                        {/each}
                    </div>
                {:else}
                <div class="p-5 mt-5">
                    <h6 class="text-center"> no videos found inside this playlist  </h6>
                </div>
            {/if}
        </div>
    </div>


</div>
