<script>
  import HorizontalVideoCard from "$lib/components/HorizontalVideoCard.svelte";

  let { data } = $props();
  let hovering = $state(-1);
</script>

<div
  class="container p-0 border rounded mb-4 shadow-sm"
  style="max-height: 70vh; overflow-y: auto;"
>
  <div class="pt-3 ps-3">
    <h5>{data.playlistName}</h5>
    <p class="text-muted">
      <span class="btn-light p-1"> private </span>
      {data.logged_user.username} - 1/10
    </p>
  </div>

  {#each data.videos as video, index}
    <div
      role="button"
      tabindex="0"
      aria-label="Hoverable video card"
      class="d-flex align-items-center pt-2 playlist-card {video.id == data.video.id ? "active-video":""} "
      onmouseenter={() => (hovering = index)}
      onmouseleave={() => (hovering = -1)}
    >
      <div class="d-flex justify-content-center" style="width: 30px; font-size: 12px;">
        {#if hovering === index}
          <span class="material-symbols-outlined">drag_handle</span>
        {:else}
          <p>{index + 1}</p>
        {/if}
      </div>
      <HorizontalVideoCard {video} playlistName={data.playlistName} />
    </div>
  {/each}
</div>

<style>
  .playlist-card:hover {
    background-color: rgb(245, 245, 245);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  }
  .active-video {
    background-color: rgb(214, 220, 223);
  }
</style>
