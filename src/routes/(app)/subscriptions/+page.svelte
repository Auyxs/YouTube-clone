<script>
  import VideoCard from "$lib/components/VideoCard.svelte";
  import SignIn from "$lib/components/buttons/SignIn.svelte";

  let { data } = $props();
</script>

{#if data.logged_user == null}
  <div class="container-fluid p-5 mt-5">
    <div class="d-flex justify-content-center align-items-center py-5 mt-5">
      <div class="container-fluid text-center">
        <span class="material-symbols-outlined" style="font-size: 10em;"
          >subscriptions</span
        >
        <h4>Don’t miss new videos</h4>
        <p>Sign in to see updates from your favorite YouTube channels</p>
        <div class="d-flex justify-content-center">
          <SignIn />
        </div>
      </div>
    </div>
  </div>
{:else}
  <div class="container-fluid p-0 mt-5">
    <div class="container">
      <div class="content-area p-3">
        <h4 class="pb-2">Latest</h4>
        <div class="row">
          {#each data.videos as video}
            <div class="col-12 col-sm-12 col-md-6 col-xl-4 col-xxl-4 mb-4">
              <VideoCard {video} currentRoute="/" />
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
{/if}
