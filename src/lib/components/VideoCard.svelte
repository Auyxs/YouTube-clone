<script>
    export let video = {}; 
    export let currentRoute = ""; 
</script>

<div class="card">
    <a href="/video/{video.id}" class="video-link">
        <div class="position-relative" style="width: 100%;  padding-bottom: 56.25%;">
            <img src="https://img.youtube.com/vi/{video.URL}/hqdefault.jpg" 
                alt="{video.title} thumbnail" 
                class="card-img-top rounded-3 position-absolute" 
                style="top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;" />
            
            <div class="video-overlay position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center text-white">
                <span class="play-button fs-1">▶</span>
            </div>
        </div>
    </a>
    

        <div class="d-flex card-body container-fluid px-0">
            {#if currentRoute !== "/channel"}
                <div class="me-3">
                    <a href="/channel/@{video.user.username}">
                        <img src={video.user.image || ''} alt="User" class="rounded-circle profile" style="width: 40px;"/>
                    </a>
                </div>
            {/if}

            <div>
                <h6 class="card-title fs-6 mb-0">{video.title}</h6>
                <p class="text-muted">
                    {#if currentRoute !== "/channel"}
                        {video.user.username} <br>
                    {/if}
                    {video.views.toLocaleString()} views
                </p>
            </div>

        </div>
</div>

