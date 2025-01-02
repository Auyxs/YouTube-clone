<script>

    export let playlists;
    export let videoId;

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
            body: formData
        });
    };
</script>

<div class="card bg-white d-flex flex-column justify-content-center p-4 shadow">
    <div>
        <p class="text-center mb-4">Save video to...</p>
        
        <div class="form-check d-flex align-items-center gap-3 mb-3 pb-2">
            <input 
                class="form-check-input" 
                type="checkbox" 
                value="" 
                id="watch-later" 
                checked={isInPlaylist(playlists.find(p => p.name === "Watch later"))}
                on:change={(event) => handleCheckboxChange(playlists.find(p => p.name === "Watch later"), event)}
            />
            <label class="form-check-label mb-0" for="watch-later">Watch later</label>
        </div>

        {#each playlists as playlist}
            {#if playlist.name !== "Watch later" && playlist.name !== "Liked videos"}
            <div class="form-check d-flex align-items-center gap-3 mb-3 pb-2">
                <input 
                    class="form-check-input" 
                    type="checkbox" 
                    value="" 
                    id="{playlist.name}" 
                    checked={isInPlaylist(playlist)}
                    on:change={(event) => handleCheckboxChange(playlist, event)}
                />
                <label class="form-check-label mb-0" for="{playlist.name}">{playlist.name}</label>
            </div>
            {/if}
        {/each}

        <button type="button" class="btn btn-light btn-round d-flex justify-content-center align-items-center">
            <span class="material-symbols-outlined">add</span>
            <p class="mb-0 fw-normal px-2">New playlist</p>
        </button>
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
</style>
