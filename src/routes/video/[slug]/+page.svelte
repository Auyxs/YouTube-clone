<script>
  import Like from "$lib/components/buttons/Like.svelte";
  import Subscribe from "$lib/components/buttons/Subscribe.svelte";
  import HorizontalVideoCard from "$lib/components/HorizontalVideoCard.svelte";
	import TagSection from "$lib/components/TagSection.svelte";

  let {data} = $props();
  let writingComment = $state(false);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await fetch('?/addcomment', {
      method: 'POST',
      body: formData
    });
  };

</script>

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
              <p style="font-size: 14px;">{data.video.description}</p>
            </div>
          
        </div>


        <div class="col-lg-12 pt-4">
            <h5>{data.comments.length} Comments</h5>

            <div class="container d-flex p-2 mb-4 mt-3">
                <div class="me-2">
                  {#if data.logged_user != null}
                    <img src="{data.logged_user.image}" alt="" class="profile rounded-circle" style="width: 40px;">
                  {:else}
                    <img src='https://www.gravatar.com/avatar/?d=mp' alt="" class="profile rounded-circle" style="width: 40px;">
                  {/if}
                </div>

                <div class="container w-100">
                    <form onsubmit={handleSubmitComment}>
                      <textarea class="w-100" rows="1" name="comment" id="" placeholder="Add a comment..." onclick={() => writingComment = true}></textarea>

                      {#if writingComment}
                      <div class="d-flex justify-content-end mt-2">
                        <button class="btn btn-light btn-round me-2" onclick={() => writingComment = false}>Cancel</button>
                        <button type="submit" class="btn btn-primary btn-round">Comment</button>
                      </div>
                      {/if}
                    </form>
                </div>
                
            </div>

            {#each data.comments as comment}

            <div class="d-flex m-1 p-2">
              <div class="me-3">
                <img src="{comment.user.image || ''}" alt="User" class="rounded-circle profile" style="width: 40px; height: auto;" />
              </div>
     
              <div style="font-size: 14px">
                <p class="mb-1" >@{comment.user.username}</p>
                <p class="text-muted mb-0">{comment.body}</p>
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

<style>
  textarea {
    --padding: 10px;
    padding-left: 0;
    min-height: calc(1lh + 1 * var(--padding));
    max-height: calc(10lh + 1 * var(--padding));
    padding: var(--padding);
    line-height: 1;
    border: none;
    border-bottom: 1px solid grey;
    resize: none;
  }

  @supports (field-sizing: content) {
  textarea {
      min-height: calc(1lh + 1 * var(--padding));
      max-height: calc(10lh + 1 * var(--padding));
      field-sizing: content;
    }
  }

  textarea:focus {
      outline: none;
      border-color: 10px solid black;
  }

  .btn-right {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }
</style>