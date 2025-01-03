<script>
  let { playlists, videoId, closemenu } = $props();

  const isInPlaylist = (playlist) => {
    return playlist.videos.includes(String(videoId));
  };

  const handleCheckboxChange = async (playlist, event) => {
    const action = event.target.checked ? "add" : "remove";
    const formData = new FormData();
    formData.append("playlistName", playlist.name);
    formData.append("videoId", videoId);
    formData.append("action", action);

    await fetch("?/updatePlaylist", {
      method: "POST",
      body: formData,
    });
  };
</script>

<div class="position-fixed overlay">
  <div class="d-flex justify-content-center align-items-center h-100">
    <div class="save-menu">
      <div
        class="card bg-white d-flex flex-column justify-content-center p-4 shadow"
      >
        <div>
          <div class="d-flex justify-content-between align-items-center mb-4">
            <p class="mb-0">Save video to...</p>
            <button onclick={() => closemenu()} class="border-0 bg-transparent">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <div class="form-check d-flex align-items-center gap-3 mb-3 pb-2">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="watch-later"
              checked={isInPlaylist(
                playlists.find((p) => p.name === "Watch later")
              )}
              onchange={(event) =>
                handleCheckboxChange(
                  playlists.find((p) => p.name === "Watch later"),
                  event
                )}
            />
            <label class="form-check-label mb-0" for="watch-later"
              >Watch later</label
            >
          </div>

          {#each playlists as playlist}
            {#if playlist.name !== "Watch later" && playlist.name !== "Liked videos"}
              <div class="form-check d-flex align-items-center gap-3 mb-3 pb-2">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id={playlist.name}
                  checked={isInPlaylist(playlist)}
                  onchange={(event) => handleCheckboxChange(playlist, event)}
                />
                <label class="form-check-label mb-0" for={playlist.name}
                  >{playlist.name}</label
                >
              </div>
            {/if}
          {/each}

          <button
            type="button"
            class="btn btn-light btn-round d-flex justify-content-center align-items-center"
          >
            <span class="material-symbols-outlined">add</span>
            <p class="mb-0 fw-normal px-2">New playlist</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>


<style>
  .card {
    border-radius: 12px;
  }
  .form-check-input {
    width: 20px;
    height: 20px;
    border: 2px solid black;
    border-radius: 2px;
  }
  .overlay {
    background-color: rgba(0, 0, 0, 0.4);
    height: 100vh;
    width: 100vw;
    z-index: 100;
  }
</style>
