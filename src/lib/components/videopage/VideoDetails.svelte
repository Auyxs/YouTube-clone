<script>
  import Like from "../buttons/Like.svelte";
  import Subscribe from "../buttons/Subscribe.svelte";

  let { video, liked, subscribed, showmenu, logged_user } = $props();
  let subs = $state(video.user.subscribers);
</script>

<div class="ratio ratio-16x9">
  <iframe
    src="https://www.youtube.com/embed/{video.URL}"
    title="YouTube video"
    class="rounded"
    allowfullscreen
  ></iframe>
</div>

<div>
  <h5 class="mt-3">{video.title}</h5>

  <div class="d-flex align-items-center pb-3">
    <div class="d-flex align-items-center col-6">
      <div class="me-3">
        <a href="/channel/@{video.user.username}">
          <img
            src={video.user.image || ""}
            alt="User"
            class="rounded-circle profile"
            style="width: 40px;"
          />
        </a>
      </div>

      <div>
        <h6 class="mb-1">{video.user.username}</h6>
        <p class="text-muted mb-0" style="font-size: 12px;">
          {subs} subscribers
        </p>
      </div>
      <div class="mx-4">
        <Subscribe
          {subscribed}
          logged_user={logged_user}
          channelId={video.user.id}
          incresesub={() => subs++}
          decreasesub={() => subs--}
        />
      </div>
    </div>

    <div class="col-6">
      <div class="d-flex flex-row justify-content-end">
        <div class="d-flex me-2">
          <Like {video} {liked} logged_user={logged_user} />

          <button
            class="btn btn-light btn-round btn-right px-3 py-2 d-flex align-items-center"
          >
            <span class="material-symbols-outlined me-2">thumb_down</span>
          </button>
        </div>
        <button
          class="btn btn-light btn-round px-3 py-2 d-flex align-items-center me-2"
        >
          <span class="material-symbols-outlined me-2">file_download</span>
          Download
        </button>
        <button
          onclick={() => showmenu()}
          class="btn btn-light btn-round px-3 py-2 d-flex align-items-center"
        >
          <span class="material-symbols-outlined me-2">bookmark</span>
          Save
        </button>
      </div>
    </div>
  </div>
  <div class="bg-light rounded p-3">
    <h6>{video.views.toLocaleString()} views</h6>
    <p style="font-size: 14px;">{video.description}</p>
  </div>
</div>

<style>
  .btn-right {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }
</style>
