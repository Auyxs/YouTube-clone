<script>
    export let playlists;
    export let videoId;

    const isInPlaylist = (playlist) => {
        return playlist.videos.includes(String(videoId));
    };
</script>

<div class="card bg-white d-flex flex-column justify-content-center p-4 shadow">
    <div>
        <p class="text-center mb-4">Save video to...</p>
        
        <!-- Watch Later Checkbox -->
        <div class="form-check d-flex align-items-center gap-3 mb-3 pb-2">
            <input 
                class="form-check-input" 
                type="checkbox" 
                value="" 
                id="watch-later" 
                checked={isInPlaylist(playlists.find(p => p.name === "Watch later"))}
            />
            <label class="form-check-label mb-0" for="watch-later">Watch later</label>
        </div>

        <!-- Dynamic Playlist Checkboxes -->
        {#each playlists as playlist}
            {#if playlist.name !== "Watch later" && playlist.name !== "Liked videos"}
            <div class="form-check d-flex align-items-center gap-3 mb-3 pb-2">
                <input 
                    class="form-check-input" 
                    type="checkbox" 
                    value="" 
                    id="{playlist.name}" 
                    checked={isInPlaylist(playlist)}
                />
                <label class="form-check-label mb-0" for="{playlist.name}">{playlist.name}</label>
            </div>
            {/if}
        {/each}

        <!-- Add New Playlist Button -->
        <button type="button" class="btn btn-light btn-round d-flex justify-content-center align-items-center">
            <span class="material-symbols-outlined">add</span>
            <p class="mb-0 fw-normal px-2">New playlist</p>
        </button>
    </div>
</div>

<style>
    .card {
        border-radius: 12px; /* Rounded corners */
    }
    .form-check-input {
        width: 20px;
        height: 20px;
        border: 2px solid black; /* Custom border */
        border-radius: 2px; /* Slightly rounded for a clean look */
    }
</style>
