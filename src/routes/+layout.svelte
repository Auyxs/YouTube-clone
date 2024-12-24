<script>
  import Navbar from '$lib/components/Navbar.svelte';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import '../app.css';

  let { data, children } = $props();
</script>

<div>
  <Navbar logged_user={data.logged_user}/>
  <div class="main-content d-flex">
    {@render children()}
  </div>
</div>