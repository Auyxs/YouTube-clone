<script>
  import SignIn from "./buttons/SignIn.svelte";

  let { logged_user, subscriptions, currentPath, show } = $props();
  let limit = $state(5);
  let expanded = $state(false);
  const isActive = (path) => currentPath == path;
</script>

{#if show}
  <div
    class="flex-shrink-0 p-3 pb-5 sidebar d-none d-lg-block bg-white position-fixed overflow-y-auto"
    style="z-index: 100;"
  >
    <ul class="nav d-flex flex-column">
      <li class="nav-item">
        <a href="/" class="nav-link" class:active={isActive("/")}>
          <span class="material-symbols-outlined me-4">home</span>
          Home
        </a>
      </li>

      <li class="nav-item">
        <a
          href="/subscriptions"
          class="nav-link"
          class:active={isActive("/subscriptions")}
        >
          <span class="material-symbols-outlined me-4">subscriptions</span>
          Subscriptions
        </a>
      </li>

      <hr />
      {#if logged_user != null}
        <li class="nav-item">
          <a
            href="/channel/@{logged_user.username}"
            class="nav-link fs-6 fw-lg"
            class:active={isActive("/channel/@" + logged_user.username)}
          >
            You
            <span class="material-symbols-outlined"> chevron_right </span>
          </a>
        </li>

        <li class="nav-item">
          <a
            href="/playlists"
            class="nav-link"
            class:active={isActive("/playlists")}
          >
            <span class="material-symbols-outlined me-4">playlist_play</span>
            Playlists
          </a>
        </li>

        <li class="nav-item">
          <a
            href="/playlist/Watch%20later"
            class="nav-link"
            class:active={isActive("/playlist/Watch%20later")}
          >
            <span class="material-symbols-outlined me-4">schedule</span>
            Watch later
          </a>
        </li>

        <li class="nav-item">
          <a
            href="/playlist/Liked%20videos"
            class="nav-link"
            class:active={isActive("/playlist/Liked%20videos")}
          >
            <span class="material-symbols-outlined me-4">thumb_up</span>
            Liked videos
          </a>
        </li>
      {:else}
        <li class="nav-item px-3">
          <p class="mb-2">Sign in to like videos, comment, and subscribe.</p>
          <SignIn />
        </li>
      {/if}

      <hr />
      {#if logged_user != null}
        <li class="nav-item mx-3">
          <h6>Subscriptions</h6>
        </li>
        {#each subscriptions as channel, index}
          {#if index < limit}
            <li class="nav-item">
              <a
                class="nav-link"
                href="/channel/@{channel.username}"
                class:active={isActive("/channel/@" + channel.username)}
              >
                <img
                  src={channel.image}
                  alt=""
                  class="rounded-circle profile me-3"
                  style="width: 25px; height: 25px;"
                />
                <p class="mb-0">{channel.username}</p>
              </a>
            </li>
          {/if}
        {/each}
        <li class="nav-item">
          <button
            onclick={() => {
              limit = expanded ? 5 : subscriptions.length;
              expanded = !expanded;
            }}
            class="nav-link w-100 text-dark"
          >
            <span class="material-symbols-outlined">
              {expanded ? "keyboard_arrow_up " : "keyboard_arrow_down"}
            </span>
            {expanded ? "Show less " : "Show more"}
          </button>
        </li>
        <hr />
      {/if}

      <li class="nav-item">
        <a href="/" class="nav-link">
          <span class="material-symbols-outlined me-4">settings</span>
          Settings
        </a>
      </li>
    </ul>
  </div>
{/if}

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

  .nav-link {
    display: flex;
    align-items: center;
    font-size: 14px;
  }
</style>
