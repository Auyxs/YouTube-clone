<script>
  import Navbar from '$lib/components/Navbar.svelte';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import '../app.css';

  let { children } = $props();
</script>

<div>
  <Navbar />
  <div class="main-content d-flex">
    
    {@render children()}
  </div>
</div>