<script>
    export let video = {};
</script>

<div class="d-flex flex-row mb-2 p-0 m-0">
    <a href="/video/{video.id}" class="video-link">
        <div class="position-relative" style="width: 100%;">
            <img src="https://img.youtube.com/vi/{video.URL}/hqdefault.jpg" alt="{video.title} thumbnail" class="rounded-3" style="width: 160px; height: 90px; object-fit: cover;" />
            <div class="video-overlay position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center text-white">
                <span class="play-button fs-3">▶</span>
            </div>
        </div>
    </a>
  
    <div class="ms-3">
      <h6 class="mb-1">{video.title}</h6>
      <p class="mb-0 text-muted" style="font-size: 14px;">{video.user.username} <br> {video.views.toLocaleString()} views</p>
    </div>
</div>