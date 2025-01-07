<script>
  import { blur } from "svelte/transition";
  import CollapseMenu from "./CollapseMenu.svelte";

  let { playlist } = $props();
  let showCollapse = $state(false);

  const handlePlaylistDelete = async () => {
    const formData = new FormData();
    formData.append("title", playlist.name);

    const res = await fetch("/api/playlist", {
      method: "DELETE",
      body: formData,
    });

    if (res.ok) playlist = null;
  };
</script>

{#if playlist}
  <div class="card" transition:blur>
    <a
      href="/playlist/{playlist.name}"
      class="video-link text-decoration-none"
    >
      <!-- First Stacked Thumbnail -->
      <div
        class="position-absolute"
        style="width: 90%; padding-bottom: 50%; top: -8px; left: 10px;"
      >
        <img
          src="https://img.youtube.com/vi/{playlist.cover}/hqdefault.jpg"
          class="card-img-top rounded-3 position-absolute"
          alt=""
          style="top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;"
        />
      </div>

      <!-- Second Stacked Thumbnail -->
      <div
        class="position-absolute"
        style="width: 95%; padding-bottom: 50%; top: -5px; left: 5px; border: 1px solid white;"
      >
        <img
          src="https://img.youtube.com/vi/{playlist.cover}/hqdefault.jpg"
          class="card-img-top rounded-3 position-absolute"
          alt=""
          style="top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;"
        />
        <div
          class="position-absolute top-0 start-0 w-100 h-100 rounded-3"
          style="background: rgba(0, 0, 0, 0.5);"
        ></div>
      </div>

      <!-- Main Thumbnail -->
      <div
        class="position-relative"
        style="width: 100%; padding-bottom: 56.25%; border: 1px solid white;"
      >
        <img
          src="https://img.youtube.com/vi/{playlist.cover}/hqdefault.jpg"
          alt="{playlist.name} thumbnail"
          class="card-img-top rounded-3 position-absolute"
          style="top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;"
        />

        <!-- Overlay with Play Button -->
        <div
          class="video-overlay position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center text-white"
        >
          <span class="play-button fs-6">▶ Play all</span>
        </div>
      </div>
    </a>

    <!-- Playlist Information -->
    <div class="d-flex card-body justify-content-between container-fluid px-0">
      <div>
        <h6 class="card-title fs-6 mb-0 text-truncate">{playlist.name}</h6>
        <p class="text-muted small">Private Playlist</p>
      </div>

      <div>
        {#if playlist.name != "Liked videos" && playlist.name != "Watch later"}
          <button
            class="border-0 bg-transparent"
            onclick={() => (showCollapse = !showCollapse)}
          >
            <span class="material-symbols-outlined"> more_vert </span>
          </button>
        {/if}

        {#if showCollapse}
          <CollapseMenu handleDelete={handlePlaylistDelete}/>
        {/if}
      </div>
    </div>
  </div>
{/if}


