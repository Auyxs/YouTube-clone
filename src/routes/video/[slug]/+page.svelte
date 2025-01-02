<script>
  import Like from "$lib/components/buttons/Like.svelte";
  import Subscribe from "$lib/components/buttons/Subscribe.svelte";
  import SaveMenu from "$lib/components/videopage/SaveMenuOverlay.svelte";
  import CommentSection from "$lib/components/videopage/CommentSection.svelte";
  import SuggestedVideos from "$lib/components/videopage/SuggestedVideos.svelte";

  let {data} = $props();
  let showSaveMenu = $state(false);
</script>

{#if showSaveMenu}
  <div class="position-fixed overlay" >
    <div class="d-flex justify-content-center align-items-center h-100">
      <div class="save-menu">
        <button onclick={() => showSaveMenu = false} class="border-0 bg-transparent text-white"> 
          <span class="material-symbols-outlined"> close </span>
        </button>
        <SaveMenu playlists={data.playlists} videoId={data.video.id}/>
      </div>
    </div>
  </div>
{/if}

<div class="container-fluid m-3 ms-md-0 ms-xxl-4 pt-2">
    <div class="d-flex flex-row ">

      <div class="col-lg-8 mb-2 ps-3">

        <div class="ratio ratio-16x9">
          <iframe src="https://www.youtube.com/embed/{data.video.URL}" title="YouTube video" class="rounded" allowfullscreen></iframe>
        </div>

        <div>
          <h5 class="mt-3">{data.video.title}</h5>

          <div class="d-flex align-items-center pb-3">  
            <div class="d-flex align-items-center col-6">
              <div class="me-3">
                <a href="/channel/@{data.video.user.username}">
                  <img src="{data.video.user.image || ''}" alt="User" class="rounded-circle profile" style="width: 40px;" />
                </a>
              </div>
          
              <div>
                <h6 class="mb-1">{data.video.user.username}</h6>
                <p class="text-muted mb-0" style="font-size: 12px;">{data.video.user.subscribers} subscribers</p>
              </div>
              <div class="mx-4">
                <Subscribe subscribed={data.subscribed} channelId={data.video.user.id}/>
              </div>

            </div>
          
            <div class="col-6">
              <div class="d-flex flex-row justify-content-end ">

                <div class="d-flex me-2">
                  <Like video={data.video} liked={data.liked}/>

                  <button class="btn btn-light btn-round btn-right px-3 py-2 d-flex align-items-center">
                    <span class="material-symbols-outlined me-2">thumb_down</span>
                  </button>
                </div>
                <button class="btn btn-light btn-round px-3 py-2 d-flex align-items-center me-2">
                  <span class="material-symbols-outlined me-2">file_download</span>
                  Download
                </button>
                <button onclick={() => showSaveMenu = true} class="btn btn-light btn-round px-3 py-2 d-flex align-items-center">
                  <span class="material-symbols-outlined me-2">bookmark</span>
                  Save
                </button>
             
              </div>
            </div>
  
          </div>
          
            <div class="bg-light rounded p-3">
              <h6>{data.video.views.toLocaleString()} views</h6>
              <p style="font-size: 14px;">{data.video.description}</p>
            </div>
        </div>
        <CommentSection comments={data.comments} logged_user={data.logged_user} />
      </div>
    
      <SuggestedVideos videos={data.suggestedVideos} />
    </div>
  </div>

<style>
  .overlay {
      background-color: rgba(0, 0, 0, 0.4); 
      height: 100vh; 
      width: 100vw;
      z-index: 100;
  }
    
  .btn-right {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }
</style>