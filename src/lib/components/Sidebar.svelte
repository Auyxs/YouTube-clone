<style>
  .nav-link:hover {
    background-color: #f7f7f7;
    border-radius: 10px;
    color: rgb(53, 53, 53);
  }

  .nav-link.active {
    background-color: #f7f7f7;
    border-radius: 10px;
    font-weight: bold;
  }

  .sidebar {
    height: 100vh;
    width: 240px;
  }

  .nav-link{
    display: flex;
    align-items: center;
    font-size: 14px;
  }


</style>
  <div class="flex-shrink-0 p-3 sidebar d-none d-lg-block bg-white position-fixed" style="z-index: 100;">
    <ul class="nav d-flex flex-column ">
      <li class="nav-item">
        <a href="/" class="nav-link active">
          <span class="material-symbols-outlined me-4">home</span>
          Home
        </a>
      </li>
  
      <li class="nav-item">
        <a href="/subscriptions" class="nav-link">
          <span class="material-symbols-outlined me-4">subscriptions</span>
          Subscriptions
        </a>
      </li>
  
      <hr>
  
      <li class="nav-item">
        <a href="/" class="nav-link">
          <span class="material-symbols-outlined me-4">playlist_play</span>
          Playlist
        </a>
      </li>
  
      <li class="nav-item">
        <a href="/liked" class="nav-link">
          <span class="material-symbols-outlined me-4">thumb_up</span>
          Liked videos
        </a>
      </li>
  
      <hr>
  
      <li class="nav-item">
        <a href="/" class="nav-link">
          <span class="material-symbols-outlined me-4">settings</span>
          Settings
        </a>
      </li>
  
    </ul>
</div>
  
