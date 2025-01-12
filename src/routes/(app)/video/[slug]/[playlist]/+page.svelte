<script>
  import { goto } from "$app/navigation";
  import HorizontalVideoCard from "$lib/components/HorizontalVideoCard.svelte";
  import { redirect } from "@sveltejs/kit";

  let { data } = $props();
  let hovering = $state(-1);

  let draggedIndex = $state(null);
  let videos = $state(data.videos);

  const handlePlaylistUpdate = async () => {
    const formData = new FormData();
    formData.append("playlistName", data.playlistName);
    formData.append("videos", JSON.stringify(videos.map(v => v.id.toString())));

    await fetch("/api/playlist", {
      method: "PUT",
      body: formData
    })
  }

  const handleDrop = (event, index) => {
    event.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      const reorderedVideos = [...videos];
      const [movedVideo] = reorderedVideos.splice(draggedIndex, 1);
      reorderedVideos.splice(index, 0, movedVideo);
      videos = reorderedVideos;
    }
    draggedIndex = null;

    handlePlaylistUpdate();
  };

  const handleDragStart = (event, index) => {
    draggedIndex = index;
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (event) => {
    event.preventDefault(); 
    event.dataTransfer.dropEffect = "move";
  };
</script>

<div
  class="container p-0 border rounded mb-4 shadow-sm"
  style="max-height: 70vh; overflow-y: auto;"
>
  <div class="pt-3 ps-3">
    <h5>{data.playlistName}</h5>
    <p class="text-muted">
      <span class="btn-light p-1"> private </span>
      {data.logged_user.username} - {data.videos.length}/10
    </p>
  </div>

  {#each videos as video, index}
    <div
      role="button"
      tabindex="0"
      aria-label="Hoverable video card"
      class="d-flex align-items-center pt-2 playlist-card {video.id == data.video.id ? "active-video" : ""}"
      draggable="true"
      ondragstart={(event) => handleDragStart(event, index)}
      ondragover={handleDragOver}
      ondrop={(event) => handleDrop(event, index)}
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
    cursor: grab;
  }

  .playlist-card:active {
    cursor: grabbing;
  }

  .active-video {
    background-color: rgb(214, 220, 223);
  }
</style>
