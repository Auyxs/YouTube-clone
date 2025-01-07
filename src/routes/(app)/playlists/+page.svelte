<script>
  import PlaylistCard from "$lib/components/PlaylistCard.svelte";
  let { data } = $props();
</script>

<div class="container-fluid p-0 mt-5">
  <div class="container">
    <div class="content-area p-3">
      <h2 class="pb-4">Playlists</h2>
      <div class="row">
        {#each data.playlists as playlist}
          <div class="col-12 col-sm-12 col-md-6 col-xl-3 col-xxl-3 mb-4">
            <PlaylistCard {playlist} />
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
