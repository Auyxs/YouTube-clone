<script>
    import Navbar from '$lib/components/Navbar.svelte';
    import 'bootstrap/dist/css/bootstrap.min.css';
    import '../../../app.css'
  
    let { data, children } = $props();
</script>
  
<div>
  <Navbar logged_user={data.logged_user}/>
  <div class="d-flex mt-5">
      {@render children()}
  </div>
</div>