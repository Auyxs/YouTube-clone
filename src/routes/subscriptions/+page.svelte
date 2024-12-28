<script>
    import TagSection from '$lib/components/TagSection.svelte';
    import VideoCard from '$lib/components/VideoCard.svelte';
    import Sidebar from '$lib/components/Sidebar.svelte';
  
    let {data} = $props();
</script>
  

<Sidebar /> 
{#if data.logged_user == null}
    <div class="container-fluid p-0 mt-5 responsive-container">
        <div class="d-flex justify-content-center align-items-center py-5 mt-5">
            <div class="container-fluid text-center">
                <span class="material-symbols-outlined" style="font-size: 10em;">subscriptions</span>
                <h4>Don’t miss new videos</h4>
                <p>Sign in to see updates from your favorite YouTube channels</p>
                
                <button class="btn btn-round btn-light border">
                    <a href="/login" class="text-decoration-none d-flex align-items-center me-2" style="color: rgb(66, 139, 255);">
                        <span class="material-symbols-outlined me-2">
                        account_circle
                        </span>
                        Sign in
                    </a>
                </button>
           
            </div>

        </div>
    </div>
{:else}
    <div class="container-fluid p-0 responsive-container">
        <div class="container">
            <div class="content-area p-3" >
                <h4 class="pb-2">Latest</h4>
                <div class="row">
                    {#each data.videos as video}
                    <div class="col-12 col-sm-12 col-md-6 col-xl-4 col-xxl-4 mb-4">
                        <VideoCard video={video} currentRoute="/" />
                    </div>
                    {/each}
                </div>
            </div>
        </div>
    </div> 
{/if}

<style>
    .responsive-container {
        margin-left: 240px; 
    }
    @media (max-width: 1000px) { 
        .responsive-container {
            margin: 0; 
        }
    }   
</style>
