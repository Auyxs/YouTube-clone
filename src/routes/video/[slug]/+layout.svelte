<script>
    import Navbar from '$lib/components/Navbar.svelte';

    let { data, children } = $props();
</script>
  
<div>
  <Navbar logged_user={data.logged_user}/>
  <div class="d-flex mt-5">
      {@render children()}
  </div>
</div>