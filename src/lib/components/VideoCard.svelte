<script>
    export let video = {}; 
    export let currentRoute = ""; 
</script>

<div class="card">
        <a href="/video/{video.Id}" class="video-link">
            <div class="position-relative">
           
                <img src="https://img.youtube.com/vi/{video.URL}/hqdefault.jpg" alt="{video.title} thumbnail" class="card-img-top rounded-3 " style="height: 180px; object-fit: cover;" />
                    <div class="video-overlay position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center text-white">
                    <span class="play-button fs-1">▶</span>
                </div>
            </div>
        </a>

        <div class="d-flex card-body container-fluid">
            {#if currentRoute !== "/channel"}
                <div class="col-2">
                    <a href="/channel/@{video.user.username}">
                        <img src={video.user.image || ''} alt="User" class="rounded-circle w-75 profile" />
                    </a>
                </div>
            {/if}

            <div>
                <h5 class="card-title">{video.title}</h5>
                <p class="text-muted">
                    {#if currentRoute !== "/channel"}
                        {video.user.username} <br>
                    {/if}
                    {#if video.views !== undefined}
                        {video.views.toLocaleString()} views
                    {:else}
                        No views
                    {/if}
                </p>
            </div>

        </div>
</div>

