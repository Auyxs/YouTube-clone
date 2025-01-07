<script>
  import SaveMenu from "$lib/components/videopage/SaveMenuOverlay.svelte";
  import CommentSection from "$lib/components/videopage/CommentSection.svelte";
  import SuggestedVideos from "$lib/components/videopage/SuggestedVideos.svelte";
  import VideoDetails from "$lib/components/videopage/VideoDetails.svelte";
  import Navbar from "$lib/components/Navbar.svelte";

  let { data, children } = $props();
  let showSaveMenu = $state(false);
</script>

<div>
  <Navbar logged_user={data.logged_user} />
  <div class="d-flex mt-5">
    {#if showSaveMenu}
      <SaveMenu
        playlists={data.playlists}
        videoId={data.video.id}
        closemenu={() => (showSaveMenu = false)}
      />
    {/if}
    <div class="container-fluid m-3 ms-md-0 ms-xxl-4 pt-2">
      <div class="d-flex flex-row">
        <div class="col-lg-8 mb-2 ps-3">
          <VideoDetails
            video={data.video}
            liked={data.liked}
            subscribed={data.subscribed}
            logged_user={data.logged_user}
            showmenu={() => (showSaveMenu = true)}
          />
          <CommentSection
            comments={data.comments}
            logged_user={data.logged_user}
            videoId={data.video.id}
          />
        </div>
        <div class="col-lg-4 container ps-4">
          {@render children()}
          <SuggestedVideos videos={data.suggestedVideos} />
        </div>
       
      </div>
    </div>
  </div>
</div>
