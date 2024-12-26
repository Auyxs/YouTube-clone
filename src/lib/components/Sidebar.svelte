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
    background-color: #fff;
    box-shadow: 2px 0 5px rgba(194, 194, 194, 0.1);
    width: 240px;
    background-color: white;
    position: relative;
  }

  .sidebar ul {
    list-style: none;
    padding: 0;
  }

  .sidebar ul li {
    cursor: pointer;
  }

  .nav-link{
    display: flex;
    align-items: center;
  }

</style>

<div class="flex-shrink-0 p-3 sidebar d-sm-none d-md-none d-lg-block">

  <ul class="nav d-flex flex-column">

    <li class="nav-item">
      <a href="/" class="nav-link active">
        <span class="material-symbols-outlined me-4">home</span>
        Home
      </a>
    </li>

    <li class="nav-item">
      <a href="/" class="nav-link">
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
        <span class="material-symbols-outlined me-2">settings</span>
        Settings
      </a>
    </li>

  </ul>
</div>
