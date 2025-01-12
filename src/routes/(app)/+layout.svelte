<script>
  import Navbar from "$lib/components/Navbar.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import { page } from "$app/stores";
  let { data, children } = $props();
  let currentPath = $derived($page.url.pathname);
  let show = $derived(!$page.url.pathname.match("/video"));
</script>

<div>
  <Navbar logged_user={data.logged_user} />
  <div class="d-flex">
    <div class="pt-5">
      <Sidebar
        logged_user={data.logged_user}
        subscriptions={data.subscriptions}
        {currentPath}
        {show}
      />
    </div>

    <div class=" w-100" class:responsive-container={show}>
      {@render children()}
    </div>
  </div>
</div>

<style>
  .responsive-container {
    margin-left: 250px;
  }
  @media screen and (max-width: 1000px) {
    .responsive-container {
      margin-left: 0;
    }
  }
</style>
