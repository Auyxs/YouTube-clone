<script>
  import Navbar from '$lib/components/Navbar.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';

  let { data, children } = $props();
</script>

<div>
  <Navbar logged_user={data.logged_user}/>
  <div class="d-flex">
    <div class="pt-5"> 
      <Sidebar logged_user={data.logged_user}/> 
    </div>

    <div class="w-100" style="margin-left: 250px;">
      {@render children()}
    </div>

  </div>
</div>