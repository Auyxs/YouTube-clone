<script>
  import HorizontalVideoCard from "$lib/components/HorizontalVideoCard.svelte";
	import TagSection from "$lib/components/TagSection.svelte";


  let {data} = $props();
</script>

<div class="container-fluid m-3 ms-5 pt-2">
    <div class="d-flex flex-row">

      <div class="col-lg-8 mb-2 ps-3">

        <div class="ratio ratio-16x9">
          <iframe src="https://www.youtube.com/embed/{data.video.URL}" title="YouTube video" class="rounded" allowfullscreen></iframe>
        </div>

        <div>
          <h4 class="mt-3">{data.video.title}</h4>
          <div class="d-flex align-items-center justify-content-between py-3">
            
            <div class="d-flex align-items-center">
              <div class="me-3">
                <a href="/channel/@{data.video.user.username}">
                  <img src="{data.video.user.image || ''}" alt="User" class="rounded-circle profile" style="width: 60px; height: 60px;" />
                </a>
              </div>
          
              <div>
                <h5 class="mb-1">{data.video.user.username}</h5>
                <p class="text-muted mb-0" style="font-size: 14px;">100,000 subscribers</p>
              </div>

              <div class="mx-4">
                <button class="btn btn-round btn-dark px-3 py-2">Subscribe</button>
              </div>
            </div>
          
            <div class="mx-4">
              <div class="d-flex flex-row">
                {#if !data.liked}
                  <form method="POST" action="?/like">
                    <button type="submit" class="btn btn-light btn-round px-3 py-2 d-flex align-items-center me-2">
                      <span class="material-symbols-outlined me-2">thumb_up</span>
                      {data.video.like}
                    </button>
                  </form>
                {:else}
                  <form method="POST" action="?/removelike">
                    <button type="submit" class="btn btn-dark btn-round px-3 py-2 d-flex align-items-center me-2">
                      <span class="material-symbols-outlined me-2 liked" >thumb_up</span>
                      {data.video.like}
                    </button>
                  </form>
                {/if}

                <button class="btn btn-light btn-round px-3 py-2 d-flex align-items-center me-2">
                  <span class="material-symbols-outlined me-2">thumb_down</span>
                  Dislike
                </button>
                <button class="btn btn-light btn-round px-3 py-2 d-flex align-items-center me-2">
                  <span class="material-symbols-outlined me-2">share</span>
                  Share
                </button>
                <button class="btn btn-light btn-round px-3 py-2 d-flex align-items-center">
                  <span class="material-symbols-outlined me-2">file_download</span>
                  Download
                </button>
              </div>
            </div>
  
          </div>
          
            <div class="bg-light rounded p-3">
              <h6>{data.video.views.toLocaleString()} views</h6>
              <p>{data.video.description}</p>
            </div>
          
        </div>


        <div class="col-lg-12">
            <h1>Comments</h1>
            {#each data.comments as comment}

            <div class="d-flex align-items-center m-1 p-2">
              <div class="me-3">
                <img src="{comment.user.image || ''}" alt="User" class="rounded-circle profile" style="width: 50px; height: auto;" />
              </div>
     
              <div>
                <h6 class="mb-1">@{comment.user.username}</h6>
                <p class="text-muted mb-0" style="font-size: 14px;">{comment.body}</p>
              </div>

            </div>
            {/each}
        </div>


      </div>
      

      <div class="col-lg-4 d-md-block ps-4">
        <h5>Suggested Videos</h5>
        <div class="m-3 ms-0">
          <TagSection />
        </div>

        {#each data.suggestedVideos as video}
          <HorizontalVideoCard video={video}/>
        {/each}
        
      </div>


    </div>
  </div>

